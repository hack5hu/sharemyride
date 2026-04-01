export type Locale = 'en' | 'hi';

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
}

export interface OtpVerificationTranslations {
  titlePrefix: string;
  titleHighlight: string;
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
  curatedPicks: string;
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
  editProfile: string;
  editProfileDescr: string;
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

export interface Translations {
  login: LoginTranslations;
  otpVerification: OtpVerificationTranslations;
  profileSetup: ProfileSetupTranslations;
  profileHub: ProfileHubTranslations;
}

