import { RideCategory } from '@/store/useMyRidesStore';

export const mapBackendRideToUI = (ride: any, type: 'upcoming' | 'completed' | 'requests' | 'archive', t: any) => {
  const startName = ride.sourceStopName || 'Unknown';
  const endName = ride.destinationStopName || 'Unknown';
  const startTime = ride.startTime ? new Date(ride.startTime) : (ride.requestedAt ? new Date(ride.requestedAt) : new Date());
  
  const now = new Date();
  const diffMs = startTime.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const isDriver = ride.role === 'DRIVER';
  const isPassenger = ride.role === 'PASSENGER';
  const isRequest = type === 'requests';
  
  const weekday = startTime.toLocaleDateString('en-US', { weekday: 'short' });
  const dayMonth = startTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const timeStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let timerLabel = '';
  let statusTag = '';

  if (type === 'upcoming') {
    if (isDriver) {
      statusTag = (ride.status === 'SCHEDULED' || ride.status === 'CONFIRMED') ? t('myRides.confirmedStatus') : '';
    } else {
      statusTag = ride.status === 'PENDING' ? t('myRides.pendingStatus') : ((ride.status === 'SCHEDULED' || ride.status === 'CONFIRMED') ? t('myRides.confirmedStatus') : '');
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
  } else if (type === 'requests') {
    timerLabel = `Requested ${timeStr}`;
    statusTag = `${ride.seatCount || 1} Seat${(ride.seatCount || 1) > 1 ? 's' : ''}`;
  } else if (type === 'archive') {
    statusTag = ride.status === 'CANCELLED' ? t('common.cancelled') : t('myRides.completedStatus');
    timerLabel = statusTag;
  } else {
    timerLabel = t('myRides.completedStatus');
  }

  return {
    id: ride.bookingId || ride.id || ride._id || Math.random().toString(),
    rideId: ride.rideId || ride.id,
    bookingId: ride.bookingId,
    title: `${startName.split(',')[0]} to ${endName.split(',')[0]}`,
    subtitle: isRequest ? `${weekday}, ${dayMonth} • ${timeStr}` : `${weekday}, ${dayMonth} • ${timeStr}`,
    price: `₹${ride.price || ride.totalPrice || 0}`,
    icon: type === 'completed' ? 'check-circle' : (type === 'requests' ? 'person-add' : (isDriver ? 'navigation' : 'directions-car')),
    type,
    driverName: isRequest 
      ? (ride.passengerName || 'Passenger') 
      : (isDriver ? undefined : (ride.driverName || 'Driver')),
    carModel: isRequest 
      ? `Requested by ${ride.passengerName}` 
      : (ride.vehicleRegistration 
        ? `${ride.vehicleType?.replace('_', ' ') || 'CAR'} (${ride.vehicleRegistration})` 
        : (isDriver ? t('myRides.yourVehicle') : t('myRides.vehicleDetails'))),
    rating: isRequest 
      ? (ride.passengerRating || 5) 
      : (isDriver ? undefined : (ride.driverRating || 5)),
    avatarUri: isRequest 
      ? (ride.passengerPhotoUrl || 'https://i.pravatar.cc/150') 
      : (isDriver ? undefined : (ride.driverPhotoUrl || 'https://i.pravatar.cc/150')),
    pickupTime: timeStr,
    dropoffTime: ride.endTime 
      ? new Date(ride.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : new Date(startTime.getTime() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    pickupLocation: isRequest ? startName : startName.split(',')[0],
    dropoffLocation: isRequest ? endName : endName.split(',')[0],
    timerLabel,
    statusTag,
    rawDate: startTime,
    role: ride.role,
    status: ride.status,
  };
};
