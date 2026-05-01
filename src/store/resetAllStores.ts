import { useAuthStore } from './useAuthStore';
import { useBookRideStore } from './useBookRideStore';
import { useLocationStore } from './useLocationStore';
import { useMyRidesStore } from './useMyRidesStore';
import { useRidePublishStore } from './useRidePublishStore';
import { useTravelPrefStore } from './useTravelPrefStore';
import { useVehicleStore } from './useVehicleStore';

export const resetAllStores = () => {
  // We explicitly keep useSettingsStore intact as it contains user preferences like language/theme
  
  // 1. Auth Store
  useAuthStore.setState({
    user: null,
    token: null,
    isAuthenticated: false,
    isProfileCompleted: false,
  });

  // 2. Book Ride Store (Clear search filters and history)
  useBookRideStore.setState({
    startLocation: null,
    destinationLocation: null,
    travelDate: null,
    seatCount: 1,
    searchResults: null,
    currentPage: 0,
    hasMore: true,
    recentSearches: [],
  });

  // 3. Location Store (Clear search history)
  useLocationStore.setState({
    history: {},
  });

  // 4. My Rides Store (Clear rides and drafts)
  useMyRidesStore.setState({
    drafts: [],
    rides: {
      UPCOMING: { data: [], page: 0, hasMore: true },
      COMPLETED: { data: [], page: 0, hasMore: true },
      ONGOING: { data: [], page: 0, hasMore: true },
    },
  });

  // 5. Ride Publish Store (Clear current publishing flow)
  useRidePublishStore.setState({ 
    startLocation: null, 
    destinationLocation: null,
    middleStops: [],
    routeDetails: null,
    selectedRoute: null,
    departureDate: null,
    departureTime: null,
    seatCount: 1,
    selectedSeatIds: [],
    vehicleId: null,
    publishVehicleType: '5',
    vehicleDetails: null,
    preferences: {
      nonSmoking: true,
      womenOnly: false,
      music: 'Pop',
      luggage: false,
      pets: false,
    },
    price: 0,
    fullJourneyPrice: 0,
    frontSeatPrice: 0,
    premiumEnabled: true,
    premiumPercentage: 10,
    segmentPrices: {},
    requestType: 'instant',
    editingDraftId: null,
  });

  // 6. Travel Pref Store (Reset to defaults)
  useTravelPrefStore.setState({
    preferences: {
      nonSmoking: true,
      womenOnly: false,
      manualApproval: true,
      musicPreference: 'Pop',
      luggageAllowed: true,
      petFriendly: false,
      maxBackSeats: 2,
      waitingTime: 10,
    },
    isLoading: false,
  });

  // 7. Vehicle Store (Clear vehicles)
  useVehicleStore.setState({
    vehicles: [],
    selectedVehicleId: null,
    isLoading: false,
  });
};
