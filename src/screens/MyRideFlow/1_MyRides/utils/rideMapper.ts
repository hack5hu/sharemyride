import { RideCategory } from '@/store/useMyRidesStore';

export const mapBackendRideToUI = (ride: any, type: 'upcoming' | 'completed', t: any) => {
  const stops = ride.stops || ride.routeStops || [];
  const startName = stops[0]?.name || 'Unknown';
  const endName = stops[stops.length - 1]?.name || 'Unknown';
  const startTime = ride.startTime ? new Date(ride.startTime) : new Date();
  
  // Calculate total price if not provided
  const totalPrice = ride.totalPrice || stops.reduce((acc: number, s: any) => acc + (s.priceFromPreviousStop || 0), 0);

  const now = new Date();
  const diffMs = startTime.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  let timerLabel = '';
  if (type === 'upcoming') {
    if (diffMins < 0) {
      timerLabel = t('myRides.started');
    } else if (diffMins < 60) {
      timerLabel = `${t('myRides.startsIn')} ${diffMins}${t('myRides.mins')}`;
    } else if (diffHours < 24) {
      timerLabel = `${t('myRides.startsIn')} ${diffHours}${t('myRides.hours')} ${diffMins % 60}${t('myRides.mins')}`;
    } else {
      timerLabel = startTime.toLocaleDateString();
    }
  } else {
    timerLabel = t('myRides.completedStatus');
  }

  return {
    id: ride.id || ride._id || Math.random().toString(),
    title: `${startName.split(',')[0]} to ${endName.split(',')[0]}`,
    subtitle: `${startTime.toLocaleDateString()} • ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    price: `₹${totalPrice}`,
    icon: type === 'completed' ? 'check-circle' : 'directions-car',
    type,
    driverName: ride.driverName || ride.driver?.name || 'Sahil bansal',
    carModel: ride.vehicleRegistration 
      ? `${ride.vehicleType?.replace('_', ' ') || 'CAR'} (${ride.vehicleRegistration})` 
      : (ride.vehicle?.model || 'Shared Ride'),
    rating: ride.rating || ride.driver?.rating || 5,
    avatarUri: ride.driverPhotoUrl || ride.driver?.photoUrl || 'https://i.pravatar.cc/150',
    pickupTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    dropoffTime: ride.endTime 
      ? new Date(ride.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : new Date(startTime.getTime() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    pickupLocation: startName.split(',')[0],
    dropoffLocation: endName.split(',')[0],
    timerLabel,
    rawDate: startTime,
  };
};
