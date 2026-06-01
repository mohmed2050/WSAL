/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationDict {
  appName: string;
  settings: string;
  home: string;
  send: string;
  receive: string;
  history: string;
  settingsTitle: string;
  appLanguage: string;
  sudaneseDialect: string;
  sudaneseDialectDesc: string;
  formalArabic: string;
  formalArabicDesc: string;
  english: string;
  englishDesc: string;
  shareTitle: string;
  shareViaBluetooth: string;
  shareDesc: string;
  startSharing: string;
  helpTitle: string;
  helpDesc: string;
  contactUs: string;
  aboutTitle: string;
  aboutDesc: string;
  versionBadge: string;
  madeInSudanBadge: string;
  welcomeBack: string;
  subtitlePhrase: string;
  mainActions: string;
  sendActionTitle: string;
  sendActionDesc: string;
  receiveActionTitle: string;
  receiveActionDesc: string;
  shareAppLong: string;
  recentFiles: string;
  viewAll: string;
  tenMinutesAgo: string;
  yesterday: string;
  twoDaysAgo: string;
  sizeMb: string;
  scanToConnect: string;
  scanSpeedDesc: string;
  readyStatus: string;
  readyStatusDesc: string;
  appsCategory: string;
  photosCategory: string;
  videosCategory: string;
  filesCategory: string;
  stayClose: string;
  askSender: string;
  waslId: string;
  searchingNearby: string;
  waitingConnection: string;
  connecting: string;
  receiving: string;
  sending: string;
  connectionSuccess: string;
  selectItems: string;
  itemsSelected: string;
  cancel: string;
  confirmSendText: string;
  transferSpeed: string;
  remainingTime: string;
  transferComplete: string;
  searchPlaceholder: string;
  deleteBtn: string;
  shareSuccess: string;
  avatarLabel: string;
  editNickname: string;
  save: string;
  emptyHistory: string;
}

export const TRANSLATIONS: Record<'ar-sd' | 'ar-fn' | 'en', TranslationDict> = {
  'ar-sd': {
    appName: 'وصل',
    settings: 'الإعدادات',
    home: 'الرئيسية',
    send: 'إرسال',
    receive: 'استلام',
    history: 'السجل',
    settingsTitle: 'الإعدادات',
    appLanguage: 'لغة التطبيق',
    sudaneseDialect: 'العربية (السودانية)',
    sudaneseDialectDesc: 'اللهجة المحلية المحببة للقلب',
    formalArabic: 'العربية (الفصحى)',
    formalArabicDesc: 'اللغة الرسمية المعيارية للجميع',
    english: 'English',
    englishDesc: 'Universal business language',
    shareTitle: 'شارك التطبيق بالبلوتوث',
    shareViaBluetooth: 'شارك التطبيق بالبلوتوث',
    shareDesc: 'رسل وصل لأصحابك في أي مكان حتى لو مافي إنترنت',
    startSharing: 'ابدأ المشاركة',
    helpTitle: 'المساعدة واستفساراتك',
    helpDesc: 'عندك أي سؤال؟ نحنا بصدق هنا عشان نساعدك في أي وقت',
    contactUs: 'تواصل معنا',
    aboutTitle: 'عن وصل',
    aboutDesc: 'وصل هو تطبيق سوداني أصيل، هدفنا نسهل عليك نقل ملفاتك وصورك بكل سرعة وأمان. بنهتم بهويتنا السودانية وبنطمح نكون الجسر اللي بيوصل الناس ببعض بأحدث تكنولوجيا.',
    versionBadge: 'الإصدار 2.4.0',
    madeInSudanBadge: 'صُنِع في السودان 🇸🇩',
    welcomeBack: 'مرحباً بك في وصل',
    subtitlePhrase: 'أسرع وسيلة لنقل ملفاتك وصورك في السودان',
    mainActions: 'العمليات الأساسية',
    sendActionTitle: 'رسل',
    sendActionDesc: 'إرسال ملفات بسرعة البرق لأي زول',
    receiveActionTitle: 'استلم',
    receiveActionDesc: 'استقبال الملفات والظهور عبر الباركود',
    shareAppLong: 'مشاركة التطبيق',
    recentFiles: 'الملفات الأخيرة المستلمة',
    viewAll: 'عرض الكل',
    tenMinutesAgo: 'قبل ١٠ دقائق',
    yesterday: 'أمس',
    twoDaysAgo: 'قبل يومين',
    sizeMb: 'م.ب',
    scanToConnect: 'امسح الرمز عشان توصل سريع',
    scanSpeedDesc: 'سرعة خرافية في نقل الملفات والصور',
    readyStatus: 'الحالة',
    readyStatusDesc: 'الشبكة والبلتوث جاهزين للإرسال السريع وربط الأجهزة',
    appsCategory: 'تطبيقات',
    photosCategory: 'صور',
    videosCategory: 'فيديو',
    filesCategory: 'ملفات',
    stayClose: 'خليك قريب عشان نوصل',
    askSender: 'اطلب من المرسل مسح الرمز الباركود أدناه',
    waslId: 'رقم التعريف وصل',
    searchingNearby: 'جاري البحث عن أجهزة قريبة من حولك...',
    waitingConnection: 'في انتظار الاتصال بالمرسل...',
    connecting: 'جاري الاتصال وتجهيز النقل...',
    receiving: 'جاري استلام الملفات الآن...',
    sending: 'جاري إرسال الملفات الآن...',
    connectionSuccess: 'تم تسليم واستقبال ملفاتك بنجاح تام!',
    selectItems: 'تحديد الملفات للإرسال',
    itemsSelected: 'ملفات محددة',
    cancel: 'إلغاء',
    confirmSendText: 'أرسل الآن',
    transferSpeed: 'سرعة النقل الحالية',
    remainingTime: 'الوقت المتبقي',
    transferComplete: 'اكتمل النقل بنجاح!',
    searchPlaceholder: 'ابحث عن ملفات...',
    deleteBtn: 'حذف',
    shareSuccess: 'طريقة مشاركة البلوتوث اتفعلت! جاري فحص الأجهزة...',
    avatarLabel: 'صورة الحساب الشخصي',
    editNickname: 'تعديل الإسم الخاص بك',
    save: 'حفظ الإسم',
    emptyHistory: 'سجل النقل فارغ حالياً. جرب ترسل أو تستلم ملف!',
  },
  'ar-fn': {
    appName: 'وصل',
    settings: 'الإعدادات',
    home: 'الرئيسية',
    send: 'إرسال',
    receive: 'استلام',
    history: 'السجل',
    settingsTitle: 'الإعدادات',
    appLanguage: 'لغة التطبيق',
    sudaneseDialect: 'العربية (السودانية)',
    sudaneseDialectDesc: 'اللهجة المحلية المحببة للقلب',
    formalArabic: 'العربية (الفصحى)',
    formalArabicDesc: 'اللغة العربية الفصحى المعيارية',
    english: 'English',
    englishDesc: 'Universal business language',
    shareTitle: 'مشاركة التطبيق عبر البلوتوث',
    shareViaBluetooth: 'شارك التطبيق بالبلوتوث',
    shareDesc: 'أرسل تطبيق وصل لأصدقائك في أي مكان حتى بدون إنترنت',
    startSharing: 'ابدأ المشاركة',
    helpTitle: 'المساعدة واستفساراتك',
    helpDesc: 'لديك أي سؤال؟ نحن هنا لمساعدتك في أي وقت تشاء',
    contactUs: 'تواصل معنا',
    aboutTitle: 'عن وصل',
    aboutDesc: 'وصل هو تطبيق سوداني أصيل، هدفنا تسهيل نقل ملفاتك وصورك بكل سرعة وأمان. نهتم بهويتنا السودانية ونسعى لنكون الجسر الذي يربط بين الجميع بأحدث وسائل التكنولوجيا.',
    versionBadge: 'الإصدار 2.4.0',
    madeInSudanBadge: 'صُنِع في السودان 🇸🇩',
    welcomeBack: 'مرحباً بك في وصل',
    subtitlePhrase: 'الوسيلة الأسرع لنقل الملفات والصور في السودان',
    mainActions: 'العمليات الأساسية',
    sendActionTitle: 'رسل',
    sendActionDesc: 'إرسال ملفات بسرعة البرق لجميع الأجهزة',
    receiveActionTitle: 'استلم',
    receiveActionDesc: 'استقبال الملفات والظهور عبر رمز الاستجابة السريعة',
    shareAppLong: 'مشاركة التطبيق',
    recentFiles: 'الملفات الأخيرة المستلمة',
    viewAll: 'عرض الكل',
    tenMinutesAgo: 'قبل ١٠ دقائق',
    yesterday: 'أمس',
    twoDaysAgo: 'قبل يومين',
    sizeMb: 'م.ب',
    scanToConnect: 'امسح الرمز لتتصل وتنقل سريعاً',
    scanSpeedDesc: 'سرعة فائقة في نقل الملفات والصور المعالجة',
    readyStatus: 'الحالة',
    readyStatusDesc: 'الشبكة والبلوتوث جاهزان للإرسال السريع وربط الأجهزة',
    appsCategory: 'تطبيقات',
    photosCategory: 'صور',
    videosCategory: 'فيديو',
    filesCategory: 'ملفات',
    stayClose: 'ابقَ قريباً لكي نتصل',
    askSender: 'اطلب من المرسل مسح رمز الاستجابة السريعة QR أدناه',
    waslId: 'رقم التعريف وصل',
    searchingNearby: 'جاري البحث عن أجهزة قريبة ومتاحة...',
    waitingConnection: 'في انتظار الاتصال بالمرسل حالياً...',
    connecting: 'جاري الاتصال والتحقق من النقل...',
    receiving: 'جاري استلام ملفاتك الآن...',
    sending: 'جاري إرسال ملفاتك الآن...',
    connectionSuccess: 'تم استلام وإرسال ملفاتك بنجاح تام!',
    selectItems: 'تحديد الملفات للإرسال',
    itemsSelected: 'ملفات مختارة',
    cancel: 'إلغاء',
    confirmSendText: 'أرسل الآن',
    transferSpeed: 'سرعة النقل الحالية',
    remainingTime: 'الوقت المتبقي لانتهاء العملية',
    transferComplete: 'اكتملت عملية النقل بنجاح!',
    searchPlaceholder: 'ابحث عن ملف...',
    deleteBtn: 'حذف',
    shareSuccess: 'تم تشغيل ميزة مشاركة البلوتوث! جاري مسح الأجهزة المجاورة...',
    avatarLabel: 'الملف الشخصي',
    editNickname: 'تعديل الإسم الشخصي الخاص بك',
    save: 'حفظ الإسم',
    emptyHistory: 'سجل التحويلات فارغ. قم بإجراء أول عملية نقل!',
  },
  'en': {
    appName: 'Wasl',
    settings: 'Settings',
    home: 'Home',
    send: 'Send',
    receive: 'Receive',
    history: 'History',
    settingsTitle: 'Settings',
    appLanguage: 'App Language',
    sudaneseDialect: 'Arabic (Sudanese)',
    sudaneseDialectDesc: 'Friendly, warm local dialect',
    formalArabic: 'Arabic (Formal)',
    formalArabicDesc: 'Standard official Arabic language',
    english: 'English',
    englishDesc: 'Universal business language',
    shareTitle: 'Share App via Bluetooth',
    shareViaBluetooth: 'Share App via Bluetooth',
    shareDesc: 'Send Wasl app to your friends anywhere, even offline',
    startSharing: 'Start Sharing',
    helpTitle: 'Help & Support',
    helpDesc: 'Have any questions? We are sincerely here to help you anytime',
    contactUs: 'Contact Us',
    aboutTitle: 'About Wasl',
    aboutDesc: 'Wasl is an authentic Sudanese application aiming to simplify file and photo sharing with speed and security. We celebrate our Sudanese identity and strive to connect people using advanced high-speed tech.',
    versionBadge: 'Version 2.4.0',
    madeInSudanBadge: 'Made in Sudan 🇸🇩',
    welcomeBack: 'Welcome to Wasl',
    subtitlePhrase: 'The fastest way to transfer files and photos in Sudan',
    mainActions: 'Core Operations',
    sendActionTitle: 'Send',
    sendActionDesc: 'Send files with lightning fast speeds to anyone',
    receiveActionTitle: 'Receive',
    receiveActionDesc: 'Receive files and display your personal QR code',
    shareAppLong: 'Share Application',
    recentFiles: 'Recent Files Received',
    viewAll: 'View All',
    tenMinutesAgo: '10 minutes ago',
    yesterday: 'Yesterday',
    twoDaysAgo: '2 days ago',
    sizeMb: 'MB',
    scanToConnect: 'Scan code to connect instantly',
    scanSpeedDesc: 'Incredibly fast speeds for documents & media',
    readyStatus: 'Status',
    readyStatusDesc: 'Network and Bluetooth are active and ready for fast connection',
    appsCategory: 'Apps',
    photosCategory: 'Photos',
    videosCategory: 'Videos',
    filesCategory: 'Files',
    stayClose: 'Keep close to establish link',
    askSender: 'Ask the sender to scan your QR code below',
    waslId: 'Wasl ID',
    searchingNearby: 'Searching for nearby available devices...',
    waitingConnection: 'Waiting for sender to connect...',
    connecting: 'Connecting and preparing transfer pipeline...',
    receiving: 'Receiving files onto your device...',
    sending: 'Sending files to verified receiver...',
    connectionSuccess: 'Files transferred successfully and safely!',
    selectItems: 'Select Files to Upload',
    itemsSelected: 'files selected',
    cancel: 'Cancel',
    confirmSendText: 'Send Now',
    transferSpeed: 'Current Transfer Speed',
    remainingTime: 'Estimated Time Remaining',
    transferComplete: 'Transfer completed successfully!',
    searchPlaceholder: 'Search files...',
    deleteBtn: 'Delete',
    shareSuccess: 'Bluetooth share sharing mode activated! Scanning devices...',
    avatarLabel: 'Account Profile Picture',
    editNickname: 'Edit Personal Nickname/Alias',
    save: 'Save Nickname',
    emptyHistory: 'Transfer log is currently empty. Try sending or receiving a file!',
  }
};
