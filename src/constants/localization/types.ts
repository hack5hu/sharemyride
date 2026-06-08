export type Locale = 'en' | 'hi';

export interface CommonTranslations {
  save: string;
  edit: string;
  cancel: string;
  done: string;
  loading: string;
  next: string;
  back: string;
  delete: string;
  clear: string;
  confirm: string;
  copied: string;
  pickup: string;
  dropoff: string;
  stop: string;
  vehicle: string;
  pricing: string;
  preferences: string;
  date: string;
  time: string;
  seat: string;
  seats: string;
  shareLiveLocation: string;
  today: string;
  openingMap: string;
  navigatingTo: string;
  addressCopied: string;
  success: string;
  error: string;
  cancelled: string;
}

export interface LoginTranslations {
  brandName: string;
  brandTagline: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneError: string;
  getOtp: string;
  otpInfoBox: string;
  noAccount: string;
  signUp: string;
  orContinueWith: string;
  truecallerPrefix: string;
  truecallerSuffix: string;
  truecallerErrorTitle: string;
  truecallerInitFailed: string;
  truecallerLoginFailed: string;
  truecallerUnavailableTitle: string;
  truecallerUnavailableMessage: string;
  truecallerStartError: string;
  truecallerInvalidCredentials: string;
  continueButton: string;
  orDivider: string;
  termsOfService: string;
  privacyPolicy: string;
  termsPrefix: string;
  termsAnd: string;
  termsSuffix: string;
  needHelp: string;
  english: string;
  hindi: string;
  trustVerified: string;
  trustSecure: string;
  trustCommunity: string;
}

export interface OtpVerificationTranslations {
  titlePrefix: string;
  titleHighlight: string;
  screenName: string;
  subtitle: string;
  verifyButton: string;
  verifyingButton: string;
  didNotReceive: string;
  resendNow: string;
  resendIn: string;
  secureAuth: string;
  needHelp: string;
  privacyPolicy: string;
  supportCenter: string;
}

export interface ProfileSetupTranslations {
  headerTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  dobRequiredError: string;
  requiredFieldsError: string;
  identityProfile: string;
  publicPresence: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  dobLabel: string;
  genderLabel: string;
  genderFemale: string;
  genderMale: string;
  genderOther: string;
  locationPreference: string;
  locationPlaceholder: string;
  nearbyOnly: string;
  globalReach: string;
  newsletter: string;
  personalizedSuggestions: string;
  contentPreferences: string;
  interestDigitalArt: string;
  interestSustainableLiving: string;
  interestMinimalism: string;
  interestTypography: string;
  interestTechEthics: string;
  interestArchitecture: string;
  almostThere: string;
  identityVerified: string;
  completeSetup: string;
  footerVersion: string;
  addPhoto: string;
  under18Error: string;
}

export interface ProfileHubTranslations {
  headerTitle: string;
  identityVerified: string;
  proPooler: string;
  rating: string;
  rides: string;
  memberSince: string;
  trustScore: string;
  trustScoreDescr: string;
  accountManagement: string;
  supportLegal: string;
  chooseFromGallery: string;
  removePhoto: string;
  editProfile: string;
  editProfileDescr: string;
  editProfilePic: string;
  identityVerification: string;
  identityVerificationDescr: string;
  travelPreferences: string;
  travelPreferencesDescr: string;
  paymentMethods: string;
  paymentMethodsDescr: string;
  ratingsReviews: string;
  ratingsReviewsDescr: string;
  changePassword: string;
  changePasswordDescr: string;
  helpSupport: string;
  aboutUs: string;
  termsPrivacy: string;
  logout: string;
  deleteAccount: string;
  navBook: string;
  navPublish: string;
  navMyRides: string;
  navChats: string;
  navProfile: string;
}

export interface EditProfileTranslations {
  headerTitle: string;
  successMessage: string;
  updatePhoto: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  dobLabel: string;
  genderLabel: string;
  bioLabel: string;
  bioPlaceholder: string;
  cancel: string;
  saveChanges: string;
  fullNameRequired: string;
  fullNameMin: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  dobRequired: string;
  genderRequired: string;
  bioMax: string;
}

export interface DummyContentTranslations {
  aboutTitle: string;
  aboutBody: string;
  helpTitle: string;
  helpBody: string;
  termsTitle: string;
  termsBody: string;
  emailUs: string;
}

export interface TravelPreferencesTranslations {
  headerTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  nonSmoking: string;
  nonSmokingDescr: string;
  womenOnly: string;
  womenOnlyDescr: string;
  musicPreference: string;
  bollywood: string;
  pop: string;
  jazz: string;
  podcast: string;
  silence: string;
  luggageAllowed: string;
  petFriendly: string;
  manualApproval: string;
  manualApprovalDescr: string;
  waitingTime: string;
  waitingTimeDescr: string;
  savePreferences: string;
  enabled: string;
  disabled: string;
}

export interface VehicleDetailsTranslations {
  headerTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  basicIdentity: string;
  vehicleCompany: string;
  companyPlaceholder: string;
  carModel: string;
  modelPlaceholder: string;
  technicalSpecs: string;
  numberPlate: string;
  platePlaceholder: string;
  vehicleType: string;
  appearance: string;
  manufacturingYear: string;
  color: string;
  colorPlaceholder: string;
  saveVehicle: string;
  successMessage: string;
  sedan: string;
  suv: string;
  hatchback: string;
  bike: string;
  capacity: string;
  seaterCount: string;
  seater5: string;
  seater7: string;
}

export interface ChatTranslations {
  headerTitle: string;
  searchPlaceholder: string;
  recentMessages: string;
  noMessages: string;
  newMessage: string;
  rideLabel: string;
  yesterday: string;
  activeDrivers: string;
  locationShared: string;
  safetmsg: string;
  emptyTitle: string;
  emptyDescription: string;
}

export interface RideDetailsTranslations {
  headerTitle: string;
  cancellationReasonTitle: string;
  liveTracking: string;
  pickupLabel: string;
  stopLabel: string;
  destinationLabel: string;
  estimatedArrival: string;
  minsAway: string;
  totalFare: string;
  verified: string;
  otherRiders: string;
  spotsLeft: string;
  coRider: string;
  joiningAt: string;
  trustTitle: string;
  trustDescription: string;
  cancelRide: string;
  chat: string;
  myRide: string;
  groupChat: string;
  timelineTitle: string;
  fetchingDetails: string;
  cancelBooking: string;
  selectSeat: string;
  ridesLabel: string;
  bookingTotal: string;
  seatsLabel: string;
  seatLabel: string;
  paymentLabel: string;
  cashLabel: string;
  passengers: string;
  driver: string;
  seatsLeft: string;
  journeyComfort: string;
  journeyItinerary: string;
  yourFare: string;
  perSeatNote: string;
  smokeFree: string;
  petsWelcome: string;
  luggageOk: string;
  ladiesOnly: string;
  approvalRequired: string;
  instantBooking: string;
  vibes: string;
  date: string;
  time: string;
  duration: string;
  seatsLeftLabel: string;
  assignedVehicle: string;
  compactSedan: string;
  premiumSuv: string;
  swiftBike: string;
  standardVehicle: string;
  passengerDetailsTitle: string;
  fellowTravelersTitle: string;
  noPassengersBooked: string;
  noCoRidersYet: string;
  seatLabelSingular: string;
  seatsLabelPlural: string;
  reportSuccessTitle: string;
  reportSuccessMessage: string;
}

export interface CancelRideTranslations {
  title: string;
  subtitle: string;
  reasonDriverFar: string;
  reasonChangedMind: string;
  reasonCheaperRide: string;
  reasonWaitLong: string;
  reasonOther: string;
  confirmCancel: string;
  keepRide: string;
  otherReasonPlaceholder: string;
  reasonPlansChanged: string;
  reasonAlternative: string;
  reasonUncomfortable: string;
  reasonNotAvailable: string;
  successMessage: string;
  errorMessage: string;
}

export interface LocationSelectionTranslations {
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  startLabel: string;
  startPlaceholder: string;
  destinationLabel: string;
  destinationPlaceholder: string;
  continueJourney: string;
  contextualInfo: string;
  recentRidesTitle: string;
}

export interface MapPickerTranslations {
  title: string;
  searchPlaceholder: string;
  setPickup: string;
  setDestination: string;
  setStop: string;
  selectedArea: string;
  selectLocation: string;
  recentSearches: string;
}

export interface RouteSelectionTranslations {
  headerTitle: string;
  stepIndicator: string;
  title: string;
  subtitle: string;
  recommended: string;
  trustBadge: string;
  continue: string;
}

export interface MiddleStopsTranslations {
  headerTitle: string;
  stepIndicator: string;
  title: string;
  subtitle: string;
  startPointLabel: string;
  stopLabel: string;
  addMiddleStop: string;
  addMiddleStopSub: string;
  destinationLabel: string;
  optimizedRoute: string;
  continue: string;
  duplicateStopTitle: string;
  duplicateStopMsg: string;
}

export interface MiddleStopMapTranslations {
  headerTitle: string;
  stepIndicator: string;
  searchPlaceholder: string;
  whereWillYouStop: string;
  addingStopsIncreasesInfo: string;
  suggestedStoppages: string;
  popular: string;
  quickExit: string;
  recentHistory: string;
  currentRoute: string;
  selectedStop: string;
  addedStops: string;
  continue: string;
  distanceFromRoute: string;
  tooFarFromRoute: string;
  tooFarFromRouteMsg: string;
  selectOnMap: string;
  confirmStop: string;
}

export interface DateSelectionTranslations {
  headerTitle: string;
  stepIndicator: string;
  title: string;
  subtitle: string;
  currentLabel: string;
  daysOfWeek: string[];
  selectedDate: string;
  noneSelected: string;
  next: string;
}

export interface TimeSelectionTranslations {
  headerTitle: string;
  stepIndicator: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  selectedTimeLabel: string;
  formatLabel: string;
  arrivalNote: string;
  continue: string;
}

export interface RequestTypeTranslations {
  headerTitle: string;
  title: string;
  subtitle: string;
  instantBookingTitle: string;
  instantBookingSubtitle: string;
  requestReviewTitle: string;
  requestReviewSubtitle: string;
  proTipTitle: string;
  proTipText: string;
  continueButton: string;
}

export interface SummaryPublishTranslations {
  headerTitle: string;
  title: string;
  subtitle: string;
  departureLabel: string;
  arrivalLabel: string;
  vehicleLabel: string;
  availabilityLabel: string;
  ridePreferencesLabel: string;
  noSmoking: string;
  petsAllowed: string;
  chillMusic: string;
  publishRideButton: string;
  termsText1: string;
  termsLink: string;
  termsText2: string;
  routeSummaryLabel: string;
  departureScheduleLabel: string;
  addVehicleLabel: string;
  addPreferencesLabel: string;
  approvalRequired: string;
  instantBooking: string;
}

export interface SplashTranslations {
  appName: string;
  subtitle: string;
  loadingText: string;
}

export interface Translations {
  common: CommonTranslations;
  login: LoginTranslations;
  otpVerification: OtpVerificationTranslations;
  profileSetup: ProfileSetupTranslations;
  profileHub: ProfileHubTranslations;
  editProfile: EditProfileTranslations;
  dummyContent: DummyContentTranslations;
  travelPreferences: TravelPreferencesTranslations;
  vehicleDetails: VehicleDetailsTranslations;
  chat: ChatTranslations;
  rideDetails: RideDetailsTranslations;
  cancelRide: CancelRideTranslations;
  locationSelection: LocationSelectionTranslations;
  mapPicker: MapPickerTranslations;
  routeSelection: RouteSelectionTranslations;
  middleStops: MiddleStopsTranslations;
  middleStopMap: MiddleStopMapTranslations;
  dateSelection: DateSelectionTranslations;
  timeSelection: TimeSelectionTranslations;
  seatSelection: SeatSelectionTranslations;
  priceSelection: PriceSelectionTranslations;
  requestType: RequestTypeTranslations;
  summaryPublish: SummaryPublishTranslations;
  publishSuccess: PublishSuccessTranslations;
  bookRideInfo: BookRideInfoTranslations;
  availableRides: AvailableRidesTranslations;
  rideFilters: RideFiltersTranslations;
  rideInformation: RideInformationTranslations;
  selectSeat: SelectSeatTranslations;
  bookingConfirmed: BookingConfirmedTranslations;
  settings: SettingsTranslations;
  myRides: MyRidesTranslations;
  userProfileDetail: UserProfileDetailTranslations;
  chatLocation: ChatLocationTranslations;
  developer: DeveloperTranslations;
  rideRoute: RideRouteTranslations;
  notification: NotificationTranslations;
  reportIssue: ReportIssueTranslations;
  splash: SplashTranslations;
}


export interface NotificationTranslations {
  defaultSuccessTitle: string;
  defaultSuccessMessage: string;
  defaultErrorTitle: string;
  defaultErrorMessage: string;
  defaultInfoTitle: string;
  defaultWarningTitle: string;
  welcomeSuccessTitle: string;
  welcomeBack: string;
  profilePhotoUpdated: string;
}

export interface RideRouteTranslations {
  title: string;
  locationDetails: string;
  openInGoogleMaps: string;
  openInAppleMaps: string;
}

export interface UserProfileDetailTranslations {
  headerTitle: string;
  verifiedMember: string;
  preferences: string;
  vehicleInfo: string;
  viewRatings: string;
  recentReviews: string;
  reportUser: string;
  bioTitle: string;
  defaultBio: string;
}

export interface MyRidesTranslations {
  headerTitle: string;
  upcomingTab: string;
  draftsTab: string;
  completedTab: string;
  newRequestsTitle: string;
  pendingBadge: string;
  publishedRidesTitle: string;
  draftsTitle: string;
  clearAll: string;
  completedTitle: string;
  requestsTab: string;
  noUpcomingTitle: string;
  noUpcomingDesc: string;
  noRequestsTitle: string;
  noRequestsDesc: string;
  noDraftsTitle: string;
  noDraftsDesc: string;
  noCompletedTitle: string;
  noCompletedDesc: string;
  cancelRideAlertTitle: string;
  cancelRideAlertMsg: string;
  cancelRideConfirm: string;
  cancelRideKeep: string;
  deleteDraftAlertTitle: string;
  deleteDraftAlertMsg: string;
  deleteDraftConfirm: string;
  deleteDraftCancel: string;
  clearDraftsAlertTitle: string;
  clearDraftsAlertMsg: string;
  clearDraftsConfirm: string;
  clearDraftsCancel: string;
  startsIn: string;
  started: string;
  mins: string;
  hours: string;
  completedStatus: string;
  requestPending: string;
  rideConfirmed: string;
  archiveTab: string;
  noArchiveTitle: string;
  cancelRideError: string;
  noArchiveDesc: string;
  confirmedStatus: string;
  pendingStatus: string;
  youAreDriver: string;
  yourVehicle: string;
  vehicleDetails: string;
}

export interface SettingsTranslations {
  headerTitle: string;
  appName: string;
  notifications: string;
  pushNotifications: string;
  pushNotificationsDesc: string;
  appearance: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  darkModeToggle: string;
  preferences: string;
  language: string;
  languageEn: string;
  languageHi: string;
  region: string;
  emailSettings: string;
  promotions: string;
  rideReceipts: string;
  accountSecurity: string;
  logout: string;
  logoutConfirmTitle: string;
  logoutConfirmMessage: string;
  logoutConfirmButton: string;
  logoutConfirmCancel: string;
  version: string;
}

export interface BookingConfirmedTranslations {
  successTitle: string;
  successSubtitle: string;
  driverLabel: string;
  verifiedLabel: string;
  pickupTimeLabel: string;
  arrivingIn: string;
  seatNumberLabel: string;
  windowPreference: string;
  safetyGuardTitle: string;
  safetyGuardSubtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  plateLabel: string;
  carbonNeutralTransit: string;
  brandTitle: string;
  seatPositions: {
    driver: string;
    frontPassenger: string;
    middleLeft: string;
    middleCenter: string;
    middleRight: string;
    backLeft: string;
    backCenter: string;
    backRight: string;
    defaultSeat: string;
  };
}

export interface BookRideInfoTranslations {
  heroTitle: string;
  heroSubtitle: string;
  pickupLabel: string;
  pickupPlaceholder: string;
  destinationLabel: string;
  destinationPlaceholder: string;
  travelDateLabel: string;
  datePlaceholder: string;
  peopleCountLabel: string;
  peopleCountSub: string;
  searchButton: string;
  recentSearchesTitle: string;
  clearAll: string;
  trustTitle: string;
  trustDescription: string;
  brandName: string;
  local: string;
  intercity: string;
  localServiceArea: string;
  requestLocalPartner: string;
}

export interface AvailableRidesTranslations {
  heroTitle: string;
  heroSubtitle: string;
  timeFilterLabel: string;
  noSmokingFilterLabel: string;
  ladiesOnlyFilterLabel: string;
  topRatedFilterLabel: string;
  frequentCoRiderBadge: string;
  perSeatLabel: string;
  seatsLeftLabel: string;
  bookButton: string;
  detailsButton: string;
  stopLabel: string;
  searchSummaryDate: string;
  searchSummarySeats: string;
  driverRides: string;
  kmFromPickup: string;
  durationValue: string;
  fetchingRides: string;
  noRidesFoundTitle: string;
  noRidesFoundDesc: string;
}

export interface RideFiltersTranslations {
  title: string;
  proximityTitle: string;
  nearPickup: string;
  nearDropoff: string;
  departureTimeTitle: string;
  preferencesTitle: string;
  seatAvailabilityTitle: string;
  seatsRequiredLabel: string;
  applyFilters: string;
  clearAll: string;
  noSmoking: string;
  ladiesOnly: string;
  verifiedDrivers: string;
  petFriendly: string;
  luggageAllowed: string;
  timeSlot04: string;
  timeSlot48: string;
  timeSlot812: string;
  timeSlot1216: string;
  timeSlot1620: string;
  timeSlot2024: string;
}

export interface RideInformationTranslations {
  title: string;
  distanceRemaining: string;
  driverInfoTitle: string;
  carInfoTitle: string;
  timelineTitle: string;
  rulesTitle: string;
  amenitiesTitle: string;
  fareDetailsTitle: string;
  seatFareLabel: string;
  serviceFeeLabel: string;
  sustainabilityFeeLabel: string;
  bookSeatButton: string;
  guidelinesNote: string;
  noSmoking: string;
  petsAllowed: string;
  freeWifi: string;
  usbCharging: string;
  fellowTravelers: string;
  journeyComfort: string;
  seatsOpen: string;
  departure: string;
  journey: string;
  seatsLeft: string;
}

export interface SelectSeatTranslations {
  title: string;
  subtitle: string;
  headerTitle: string;
  driverLabel: string;
  verifiedVehicle: string;
  arrivingIn: string;
  estimatedFare: string;
  legendAvailable: string;
  legendSelected: string;
  legendBooked: string;
  legendOccupied: string;
  selectVehicleFirst: string;
  yourVehicles: string;
  summaryTitle: string;
  seatSelected: string;
  seatsSelected: string;
  totalPayable: string;
  continue: string;
  holdTimerNote: string;
  pickSeatToContinue: string;
  bookMySeat: string;
}

export interface PublishSuccessTranslations {
  headerTitle: string;
  title: string;
  subtitle: string;
  infoTitle: string;
  infoText: string;
  primaryCTA: string;
  secondaryCTA: string;
}

export interface PriceSelectionTranslations {
  headerTitle: string;
  title: string;
  subtitle: string;
  basePriceLabel: string;
  recommendedBadge: string;
  frontSeatPremiumTitle: string;
  frontSeatPremiumDesc: string;
  premiumAmountLabel: string;
  maxLimitNote: string;
  multiStopTitle: string;
  multiStopSubtitle: string;
  customizePricing: string;
  continueButton: string;
  segmentSheetTitle: string;
  segmentSheetSubtitle: string;
  segmentLabel: string;
  minPriceLabel: string;
  maxPriceLabel: string;
  cancelButton: string;
  saveButton: string;
  frontSeatProjectedLabel: string;
  perSeatPrice: string;
  basePlusPremium: string;
}

export interface SeatSelectionTranslations {
  headerTitle: string;
  title: string;
  subtitle: string;
  seatSelected: string;
  seatsSelected: string;
  selectVehicleFirst: string;
  yourVehicles: string;
  fiveSeater: string;
  sevenSeater: string;
  driverLabel: string;
  legendSelected: string;
  legendAvailable: string;
  legendOccupied: string;
  seatsOffering: string;
  estEarnings: string;
  continue: string;
}

export interface DeveloperTranslations {
  networkLogsTitle: string;
  noLogsTitle: string;
  noLogsDesc: string;
  clear: string;
  close: string;
  requestDetails: string;
  overview: string;
  requestHeaders: string;
  requestBody: string;
  responseHeaders: string;
  responseBody: string;
  pending: string;
  noBody: string;
  noHeaders: string;
  copyCurl: string;
}

export interface ReportIssueTranslations {
  title: string;
  whatHappenedTitle: string;
  whatHappenedSubtitle: string;
  categorySafety: string;
  categoryBehavior: string;
  categoryVehicle: string;
  categoryPayment: string;
  categoryOther: string;
  tellUsMoreTitle: string;
  tellUsMoreSubtitle: string;
  placeholder: string;
  safetyExcellentTeam: string;
  submitReport: string;
  cancel: string;
}


export interface ChatLocationTranslations {
  headerTitle: string;
  shareLiveLocation: string;
  shareLiveLocationDesc: string;
  sendCurrentLocation: string;
  sendCurrentLocationDesc: string;
  nearbyPlaces: string;
  searchPlaceholder: string;
}

