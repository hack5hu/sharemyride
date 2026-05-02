import { RideCategory } from '@/store/useMyRidesStore';

export const mapBackendRideToUI = (ride: any, type: 'upcoming' | 'completed', t: any) => {
  const startName = ride.sourceStopName || 'Unknown';
  const endName = ride.destinationStopName || 'Unknown';
  const startTime = ride.startTime ? new Date(ride.startTime) : new Date();
  
  // Calculate total price if not provided
  const now = new Date();
  const diffMs = startTime.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const isDriver = ride.role === 'DRIVER';
  const isPassenger = ride.role === 'PASSENGER';
  
  const weekday = startTime.toLocaleDateString('en-US', { weekday: 'short' });
  const dayMonth = startTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const timeStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let timerLabel = '';
  let statusTag = '';

  if (type === 'upcoming') {
    if (isPassenger) {
      statusTag = ride.status === 'PENDING' ? t('myRides.requestPending') : (ride.status === 'SCHEDULED' ? t('myRides.rideConfirmed') : '');
    }

    if (diffMins < 0) {
      timerLabel = t('myRides.started');
    } else if (diffMins < 60) {
      timerLabel = `${t('myRides.startsIn')} ${diffMins}${t('myRides.mins')}`;
    } else if (diffHours < 24) {
      timerLabel = `${t('myRides.startsIn')} ${diffHours}${t('myRides.hours')} ${diffMins % 60}${t('myRides.mins')}`;
    } else {
      timerLabel = `${weekday}, ${dayMonth}`;
    }
  } else {
    timerLabel = t('myRides.completedStatus');
  }

  return {
    id: ride.id || ride._id || Math.random().toString(),
    title: `${startName.split(',')[0]} to ${endName.split(',')[0]}`,
    subtitle: `${weekday}, ${dayMonth} • ${timeStr}`,
    price: isDriver ? undefined : `₹${ride.price}`,
    icon: type === 'completed' ? 'check-circle' : (isDriver ? 'navigation' : 'directions-car'),
    type,
    driverName: isDriver ? undefined : (ride.driverName || 'Driver'),
    carModel: ride.vehicleRegistration 
      ? `${ride.vehicleType?.replace('_', ' ') || 'CAR'} (${ride.vehicleRegistration})` 
      : undefined,
    rating: isDriver ? undefined : (ride.driverRating || 5),
    avatarUri: isDriver ? undefined : (ride.driverPhotoUrl || 'https://i.pravatar.cc/150'),
    pickupTime: timeStr,
    dropoffTime: ride.endTime 
      ? new Date(ride.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : new Date(startTime.getTime() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    pickupLocation: startName.split(',')[0],
    dropoffLocation: endName.split(',')[0],
    timerLabel,
    statusTag,
    rawDate: startTime,
    role: ride.role,
    status: ride.status,
  };
};
