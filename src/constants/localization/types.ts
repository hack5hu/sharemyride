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

export interface Translations {
  login: LoginTranslations;
  otpVerification: OtpVerificationTranslations;
  profileSetup: ProfileSetupTranslations;
}
