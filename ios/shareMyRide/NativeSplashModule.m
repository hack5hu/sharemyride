#import "NativeSplashModule.h"

@interface SplashOverlayViewObjC : NSObject
+ (id)shared;
- (void)hideWithFade:(BOOL)fade completion:(void (^)(void))completion;
@end

@implementation NativeSplashModule

RCT_EXPORT_MODULE(NativeSplash)

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_METHOD(hide:(BOOL)fade
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    Class splashClass = NSClassFromString(@"SplashOverlayView");
    if (splashClass) {
      id sharedOverlay = [splashClass performSelector:@selector(shared)];
      if (sharedOverlay) {
        typedef void (^HideBlock)(void);
        HideBlock completion = ^{
          resolve(@(YES));
        };
        
        NSMethodSignature *sig = [sharedOverlay methodSignatureForSelector:@selector(hideWithFade:completion:)];
        if (sig) {
          NSInvocation *inv = [NSInvocation invocationWithMethodSignature:sig];
          [inv setTarget:sharedOverlay];
          [inv setSelector:@selector(hideWithFade:completion:)];
          [inv setArgument:&fade atIndex:2];
          [inv setArgument:&completion atIndex:3];
          [inv invoke];
          return;
        }
      }
    }
    resolve(@(YES));
  });
}

@end
