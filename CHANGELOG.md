# Changelog

# [1.5.0](https://github.com/hack5hu/sharemyride/compare/v1.5.0-uat.0...v1.5.0) (2026-09-02)

### Features

* add phone number support to chat profiles and improve conversation list mapping efficiency ([dd0cff5](https://github.com/hack5hu/sharemyride/commit/dd0cff5b6ebd9283abe495ebd58a218378d1f27e))
* implement native theme synchronization via TurboModule for cross-platform persistency ([2a3d5bb](https://github.com/hack5hu/sharemyride/commit/2a3d5bb6094fc910f85c2d5af7f27254be59f9d6))

# [1.5.0-uat.0](https://github.com/hack5hu/sharemyride/compare/v1.4.0...v1.5.0-uat.0) (2026-09-01)

### Features

* add phone call capability to UserProfileDetail and integrate token refresh manager ([6f9edb7](https://github.com/hack5hu/sharemyride/commit/6f9edb7f42819953471b54e080402b4b9e3ad896))
* implement admin debugger toggle and persist status across authentication sessions ([7936096](https://github.com/hack5hu/sharemyride/commit/793609631b393d1366a0ea7e14da9ea5e05dcdf4))
* implement location and ride service managers and add session wrap-up skill configuration ([5decddf](https://github.com/hack5hu/sharemyride/commit/5decddf101ff2750c0683dd1f0da0147ee422d21))
* implement LocationService for map utilities and RideService for ride lifecycle management ([c17e833](https://github.com/hack5hu/sharemyride/commit/c17e833e2b89e6ce7393debdaecdf4d0dedf4e27))

# [1.4.0](https://github.com/hack5hu/sharemyride/compare/v1.3.0...v1.4.0) (2026-08-25)

### Bug Fixes

* adjust Android bottom safe area padding and increment version code to 11 ([5ac6126](https://github.com/hack5hu/sharemyride/commit/5ac61264c96cae042a3cf4316a721a43ac0e2b38))

### Features

* add account deletion functionality and restrict app to iPhone target device family ([8601f66](https://github.com/hack5hu/sharemyride/commit/8601f6693b72b8362dc1a7cce08cf02028d8cbb7))
* add configurable search radius selector component and integrate into booking flow ([2530498](https://github.com/hack5hu/sharemyride/commit/25304988217bd60d8d79120bf8b6e0e7b790f5bd))
* add interactive build number incrementing to release script and enhance in-app update logic for iOS support ([4caf438](https://github.com/hack5hu/sharemyride/commit/4caf4389ba20a2029fc8fc2c8292e076b3bdc7bc))
* add new promotional screenshots for iOS and Android app stores ([791b35f](https://github.com/hack5hu/sharemyride/commit/791b35f098f1b74e2ae8396a89b70187a77fb31a))
* implement debounced reverse geocoding with cache optimizations and enforce map zoom constraints across components ([c7283be](https://github.com/hack5hu/sharemyride/commit/c7283be24e782318416ee65e434e7a24869be937))
* implement feedback submission service and add iOS permission requirements for camera and photo library access ([ee763de](https://github.com/hack5hu/sharemyride/commit/ee763de79dc3597be1613d56c262218e5039d4eb))
* implement native splash screen using react-native-bootsplash ([4824332](https://github.com/hack5hu/sharemyride/commit/482433207e1246e9732289a35834571089419b36))
* implement new ride details components and expand template UI styling and Storybook coverage ([f375103](https://github.com/hack5hu/sharemyride/commit/f37510364f690171980c893970fce992b15549b3))
* implement unified production and dev release scripts, add GitHub Actions CI pipeline, and enforce security scanning with Gitleaks. ([82cb3af](https://github.com/hack5hu/sharemyride/commit/82cb3af76defb629f9332d3b418fffe3bba3f220))
* integrate backend API for feedback submission and ticket history retrieval in Suggestions screen ([c679e6e](https://github.com/hack5hu/sharemyride/commit/c679e6e40b7f6403cc6231f5123524ec09874b76))
* introduce address formatting utility and add custom route marker callouts to map templates ([b8b0746](https://github.com/hack5hu/sharemyride/commit/b8b074649bbe4134c567e41ff584b89663bbff34))
* update Badge component styling for dark mode and configure Android notification color and boot splash logo ([aa643d9](https://github.com/hack5hu/sharemyride/commit/aa643d90134850a7ba5936be8d77f2415a8a789b))

# [1.3.0](https://github.com/hack5hu/sharemyride/compare/v1.1.1...v1.3.0) (2026-08-03)

### Features

* add Stallion OTA update modal, implement UserRatings screen, and refactor ride data mapping to include comprehensive user ride statistics. ([df235e3](https://github.com/hack5hu/sharemyride/commit/df235e376137f1a799910d2e5b9ef62755af4a59))
* sync user profile fields in store, update passenger rating UI with status, and adjust search radius to 25km ([f83435c](https://github.com/hack5hu/sharemyride/commit/f83435cf718b8ba5faa3202c406d9a48567e51cd))

# [1.2.0](https://github.com/hack5hu/sharemyride/compare/v1.1.1...v1.2.0) (2026-08-03)

### Features

* add Stallion OTA update modal, implement UserRatings screen, and refactor ride data mapping to include comprehensive user ride statistics. ([df235e3](https://github.com/hack5hu/sharemyride/commit/df235e376137f1a799910d2e5b9ef62755af4a59))
* sync user profile fields in store, update passenger rating UI with status, and adjust search radius to 25km ([f83435c](https://github.com/hack5hu/sharemyride/commit/f83435cf718b8ba5faa3202c406d9a48567e51cd))

## [1.1.1](https://github.com/hack5hu/sharemyride/compare/v1.1.0...v1.1.1) (2026-08-01)

# 1.1.0 (2026-08-01)

### Features

* add environment variable support with react-native-dotenv to toggle NetworkLoggerModal visibility ([16affa1](https://github.com/hack5hu/sharemyride/commit/16affa1c24e8b2204c4306210a28fcf318bbbff2))
* add in-app network request logger with persistent tracking and debugging interface ([495dbd9](https://github.com/hack5hu/sharemyride/commit/495dbd9546edb59288f0141f7540b327009441eb))
* add Loader component and update ride booking status management and UI components ([71a44cc](https://github.com/hack5hu/sharemyride/commit/71a44cc08db109dea69e487dbf5c9010ab61be2e))
* add passenger profile navigation, improve ride data mapping, and refactor MyRides layout ([c3ba64f](https://github.com/hack5hu/sharemyride/commit/c3ba64faa62c707d5c5c727c62cdb3a584f3f239))
* add recent ride retrieval in publish flow, enable driver pending requests, and introduce reusable ActionSheetModal and DobInput components ([11bc745](https://github.com/hack5hu/sharemyride/commit/11bc745f4e30d782aa726b190681b608670ab567))
* add requests tab to my rides flow with backend integration for managing booking requests ([53616cc](https://github.com/hack5hu/sharemyride/commit/53616cc476a681dad7c471839a51f50f26cad12b))
* add RideTypeToggle component and LocalRideResults screen to booking flow with state management updates ([8d0455a](https://github.com/hack5hu/sharemyride/commit/8d0455a98e205f9fd881d387741f39864ddba5ed))
* enhance ride information flow with location swapping, passenger management, and reporting functionality ([9adfbc4](https://github.com/hack5hu/sharemyride/commit/9adfbc4a11018f2a4fd8f607ccb54b9dd4a406b6))
* implement agent-driven development framework with standardized skills, instructions, and documentation ([71d604b](https://github.com/hack5hu/sharemyride/commit/71d604be22170e7b4930626fd3246889671b093f))
* implement authentication flow with API service integration and UI updates ([c14de29](https://github.com/hack5hu/sharemyride/commit/c14de2967f712f07ecaaeab7f8cb5ed1179f0c9b))
* implement BookingConfirmed screen and integrate into navigation flow ([4bea48d](https://github.com/hack5hu/sharemyride/commit/4bea48dd0ff7040ae4ebd7b4b001b7e52d8e594a))
* implement Box atom, add ride status and metadata support to detail views, and integrate global logger ([f6cf03e](https://github.com/hack5hu/sharemyride/commit/f6cf03e615f13338c9bce5dd67ebca1689c59e8b))
* implement CancelRideModal, MyRideDetailsTemplate, and update DriverProfileSummary to support driver-specific role display. ([b5c92e3](https://github.com/hack5hu/sharemyride/commit/b5c92e302140fcc7b07a6533015d4f10fb1f089d))
* implement chat and location selection screens with supporting UI components and navigation integration ([79ff15b](https://github.com/hack5hu/sharemyride/commit/79ff15b341ca1c3396eabd6d6242acd987ec5729))
* implement chat date grouping, automated message retries, and improved connection management logic in useChatDetails ([87b3474](https://github.com/hack5hu/sharemyride/commit/87b34740055453bd616806562d1b690123877d08))
* implement core UI components, OTP verification, and profile setup screens ([3ea63b3](https://github.com/hack5hu/sharemyride/commit/3ea63b379b26f49a3db36564b8ad33294f15daa3))
* implement core UI components, templates, and screens for route, date, time selection, and map-based middle stop management ([3e1cf67](https://github.com/hack5hu/sharemyride/commit/3e1cf67d39a609c704ede99b8b6508ebfef4a7c5))
* implement FixedFooter component and integrate circuit breaker for chat service reconnection attempts ([b9703d2](https://github.com/hack5hu/sharemyride/commit/b9703d2181ac207287819c5e47bb24ccfdb4a1ec))
* implement global store reset utility and confirmation modal for user logout ([dc0cd3d](https://github.com/hack5hu/sharemyride/commit/dc0cd3d02cc552a2f4ba46d7c792a35d2dc69ad2))
* implement instant UI updates for cancelled rides and refactor apiClient request logging and authentication handling ([6458b62](https://github.com/hack5hu/sharemyride/commit/6458b62a88a64102e6cc3010cb55de6eabdf29de))
* implement loading state in seat selection and migrate booking confirmation logic to BookFlow directory ([2e121a1](https://github.com/hack5hu/sharemyride/commit/2e121a1488f8a346f61d8b06062f26d256e8f5cb))
* implement map-based location selection screens and components with enhanced location services integration ([7e41eeb](https://github.com/hack5hu/sharemyride/commit/7e41eebbb3e62edbb4c18d620c2a2fc2982df979))
* implement map-based location selection screens and components with enhanced location services integration ([8356622](https://github.com/hack5hu/sharemyride/commit/835662214cc4088550b6e3435114b5b7f6abd1d8))
* implement My Rides and Ride Details screens with supporting UI components and navigation updates ([99daebf](https://github.com/hack5hu/sharemyride/commit/99daebfc264241968c34cbb18b71196562f15e56))
* implement navigation throttling in useAppNavigation and replace direct navigation usage with the hook across screen controllers ([c4c6709](https://github.com/hack5hu/sharemyride/commit/c4c6709f92a0518fa72038f39e7a5d2561a0cf90))
* implement notification deep-linking and refine available ride sorting by time ([86ebc68](https://github.com/hack5hu/sharemyride/commit/86ebc681dea2d97ddb27c22dc736f73334b964b6))
* implement notification system using Notifee and Firebase Messaging to handle background and foreground push notifications. ([698bb5a](https://github.com/hack5hu/sharemyride/commit/698bb5af98147eeeeb0ad4317113128d9a69004a))
* implement Ola Maps integration with polyline utilities, route selection screen, and enhanced map picker controls ([a711d55](https://github.com/hack5hu/sharemyride/commit/a711d55c2e669542377dd93f79b90be96e822ffd))
* implement OlaMap component, add polyline utilities, and migrate MiddleStops screens to PublishFlow directory ([d74bed8](https://github.com/hack5hu/sharemyride/commit/d74bed8eb2b48839b4a76bc550dcaf39603b8539))
* implement persistent device ID resolution and Firebase integration for Android and iOS ([fa689bf](https://github.com/hack5hu/sharemyride/commit/fa689bf9144a3b19491236e0f441ee0cf4d709cd))
* implement persistent ride publishing state and introduce SummaryPublishTemplate for enhanced flow management ([b5e1dea](https://github.com/hack5hu/sharemyride/commit/b5e1dea97979b2c6924d2209a7d38bfa28efb755))
* implement profile management screens and components with atomic design and localization support ([fd68491](https://github.com/hack5hu/sharemyride/commit/fd6849168c2b3a290ffee33bf729c8d989708184))
* implement profile user details, enforce minimum route distance, enhance OTP focus handling, and refine summary template navigation. ([5b24d78](https://github.com/hack5hu/sharemyride/commit/5b24d787550dfd7897cf42b13d883dbe63f9a189))
* implement ProfileHub screen with supporting components and navigation structure ([00978c3](https://github.com/hack5hu/sharemyride/commit/00978c32eb4cc031d88a4b1b186d759c77bc40a3))
* implement rating screen and rating template with navigation integration ([14eb5a2](https://github.com/hack5hu/sharemyride/commit/14eb5a28ffdb5f6f3b3c6ba31db1633f9ed687eb))
* implement RequestType, SummaryPublish, and PublishSuccess screens with navigation and localization support ([a80e5a9](https://github.com/hack5hu/sharemyride/commit/a80e5a9a345e8405a43ceba52c41779405a2d050))
* implement ride booking service and update pricing logic to use cumulative segment calculations ([7a7ac11](https://github.com/hack5hu/sharemyride/commit/7a7ac119173c9eabee30ffb8161b54744201f4da))
* implement ride cancellation flow and location selection components with associated navigation updates ([4247845](https://github.com/hack5hu/sharemyride/commit/424784531a4c98c2162edc9af2397994fd23df76))
* implement ride discovery and booking flow with new screens and components ([17f5856](https://github.com/hack5hu/sharemyride/commit/17f5856510179f3fecaaa94dbbe1f97765424b42))
* implement ride route map screen and replace time sliders with grid selection in filters ([a9f3893](https://github.com/hack5hu/sharemyride/commit/a9f389390d6d7a3f2afcc652752b488a9ff8c0fa))
* implement ride search service, expand RideCard features, and initialize booking state management ([5852d3e](https://github.com/hack5hu/sharemyride/commit/5852d3e8ec07356747a1d3fea27f79edae46fd53))
* implement seat selection and pricing screens with supporting components and navigation logic ([f8a4efa](https://github.com/hack5hu/sharemyride/commit/f8a4efa4bcf775db91cc3b0532cfaeedb4fefd7c))
* implement selective route highlighting by segment and optimize map navigation transitions ([f624462](https://github.com/hack5hu/sharemyride/commit/f624462e1294700f12167ddc0077e5ef6a87c817))
* implement settings module with notification, appearance, and preference management ([4a272c8](https://github.com/hack5hu/sharemyride/commit/4a272c89d82324324b5db18fc29dba81acc91b9c))
* implement splash screen flow with initialization state and optimize auth store profile updates ([553ed05](https://github.com/hack5hu/sharemyride/commit/553ed05e83190ce7d205dc06324875e8249052b8))
* implement summary publish flow components and add empty state to available rides template ([9be6d75](https://github.com/hack5hu/sharemyride/commit/9be6d75e0bfa2639ab38652650e706ffe735607f))
* implement support screens and improve vehicle input validation, FCM token retrieval, and seat selection logic ([c5571b1](https://github.com/hack5hu/sharemyride/commit/c5571b1f0cdbf3dcbd8b8e9f333005d97f8bda9a))
* implement user profile detail screen with associated service, localization, and navigation support ([acbc880](https://github.com/hack5hu/sharemyride/commit/acbc880c11533058eb622df9e9fe1916dca89e24))
* implement user suggestions and feedback system with status tracking support ([bd93696](https://github.com/hack5hu/sharemyride/commit/bd93696ba2dad9d1598da07a49129a2072c7a742))
* implement vehicle management system with CRUD operations, persistent storage, and backend synchronization ([f2147f6](https://github.com/hack5hu/sharemyride/commit/f2147f62d15ef825e45f153e596d5f0013e7b2bd))
* integrate Firebase Analytics and track user activity, ride flows, and API performance metrics ([252d6a4](https://github.com/hack5hu/sharemyride/commit/252d6a4bcceeb732f2a5db6aeac68d0a78f1205e))
* integrate Firebase Crashlytics and refactor Firebase Messaging initialization ([a6fd16f](https://github.com/hack5hu/sharemyride/commit/a6fd16f4a781e1801d4cff81956896ae0bb7fb0c))
* integrate Stallion for OTA updates and add agent-based documentation and automation scripts ([703c9f4](https://github.com/hack5hu/sharemyride/commit/703c9f4482f77750bdb11a0532a1179252d3d567))
* integrate Truecaller SDK verification flow with backend authorization support ([bd6c9f6](https://github.com/hack5hu/sharemyride/commit/bd6c9f66ee4a9b0d08ae1fd03d37c4615962dfd4))
* redesign login screen with new assets, localized footer, and updated form layout ([58055ea](https://github.com/hack5hu/sharemyride/commit/58055ea51890e65e05ab63f7149b6bf83f1904c9))
* redesign ride information template and implement seat selection flow ([51c1aaf](https://github.com/hack5hu/sharemyride/commit/51c1aaf7992eba963dd772e9ef6bb24de0076768))
* refactor MyRides screen architecture with new components, hooks, and localized seat selection flow. ([a83ed33](https://github.com/hack5hu/sharemyride/commit/a83ed33961bd28d9ac772fbe5a99913cf69c2700))
* refactor ride details to support server-side fetching, modular components, and enhanced booking/cancellation management ([25ef69e](https://github.com/hack5hu/sharemyride/commit/25ef69e1e29b0b793bbdf33c0634c722c164b81e))
* replace completed rides tab with consolidated archive tab and optimize state management ([496e40e](https://github.com/hack5hu/sharemyride/commit/496e40e1389e43c68f05aae6e82b1b10981c60bd))

### Reverts

* Revert "refactor: remove unused components, screens, and storybook mocks to clean up project structure" ([ded9787](https://github.com/hack5hu/sharemyride/commit/ded978738cf437ee62aa22ff2b710f9cb8cf7f64))
