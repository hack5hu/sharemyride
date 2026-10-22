#import "LiveLocationModule.h"
#import <CoreLocation/CoreLocation.h>
#import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import "shareMyRide-Swift.h"

@implementation LiveLocationModule {
  LiveLocationManager *_manager;
  BOOL _invalidated;
}

RCT_EXPORT_MODULE(NativeLiveLocation)
+ (BOOL)requiresMainQueueSetup { return YES; }
- (dispatch_queue_t)methodQueue { return dispatch_get_main_queue(); }

- (LiveLocationManager *)manager {
  if (!_manager) {
    _manager = [LiveLocationManager new];
    __weak LiveLocationModule *weakSelf = self;
    _manager.onState = ^(NSDictionary *state) {
      [weakSelf notifyState:state];
    };
    if (_invalidated) [_manager invalidate];
  }
  return _manager;
}

- (void)notifyState:(NSDictionary *)state {
  if (!_invalidated && _eventEmitterCallback) [self emitOnTrackingStateChanged:state];
}

- (void)startTracking:(JS::NativeLiveLocation::TrackingOptions &)options
              resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  NSDictionary *config = @{ @"rideId": options.rideId(), @"sessionId": options.sessionId(),
    @"authToken": options.authToken(), @"uploadUrl": options.uploadUrl(), @"statusUrl": options.statusUrl() };
  dispatch_async(dispatch_get_main_queue(), ^{
    [[self manager] start:config completion:^(NSDictionary *state) { resolve(state); }];
  });
}

- (void)stopTracking:(NSString *)reason sessionId:(NSString *)sessionId
             resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  dispatch_async(dispatch_get_main_queue(), ^{ resolve([[self manager] stopTracking:reason sessionID:sessionId]); });
}

- (void)getTrackingState:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  dispatch_async(dispatch_get_main_queue(), ^{ resolve([[self manager] snapshot]); });
}

- (void)updateAuthToken:(NSString *)token {
  dispatch_async(dispatch_get_main_queue(), ^{ [[self manager] updateToken:token]; });
}

- (void)invalidate {
  dispatch_async(dispatch_get_main_queue(), ^{ self->_invalidated = YES; [self->_manager invalidate]; });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLiveLocationSpecJSI>(params);
}
@end
