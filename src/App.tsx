/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  History as HistoryIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  HelpCircle,
  Share2,
  Trash2,
  User,
  Plus,
  Send,
  Sparkles,
  RefreshCw,
  Eye,
  Check,
  X,
  Languages,
  AlertCircle
} from 'lucide-react';
import { TRANSLATIONS, TranslationDict } from './translations';
import { AppLanguage, RecentFile, ActiveTab, MockTransferItem, SendersMock } from './types';

// Hardcoded hotlinks from original mockups
const PORTRAIT_HOTLINK = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEIVU3jsqlKH3uH3UDF6jGCGp1LyKbtMdDmkALH--fYqadGz3BI7Job76ShzglrAcHDsABgs0NYA0lUR1hKEMJ819cYnq0YwfU87PSho_r1mUGoUN76n0Ec4VnZEPOX-Eu3LzEZk7wYBwLDFZ1U-rXXv4CJ_gHOaHW2mAMFP9c9LVXkuYfV6X6NeBe_gqaRSOkpPTr1r0jIAJe8DuM9SQFVS-OTIU5SzBaH3RAgnb_I6BTg0XADCU0ZMzwJ9PYa6gioTYqFIAB7sM';

const INCOMING_PORTRAIT_HOTLINK = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRBIZtn7DaFJfiFvWYHA3aQxGy54SPtVuZpK764-YjTRHMkji0bs8VALipdMAspSvX5bABAZ3c_YralQu97Zhq79EIyQ1-RWsVjDfzSwHfdNgCWESiArm59HMyk3dM4hwzxFxtgSQ3Lb_wsGD6qjGJsaaZmdFvkY8JZw8aBDHmK4hTnab7GfbsXtM4kzv6U0Bz4N20ci7iAu25FmHSkHp4eLQKtm03A4uCY1C3O2v2GeJCXPbJqz2dYnmBAdS1CNgRfQPwJPuHXCI';

const QR_Futuristic_Scan = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnpspaUpm6pKeXpUAJ40yorB2HPf45oFSw8MrOoqv4S4aEGLgB9X7S0rg7gBiv5Y6muqsd2Zq4P579gBu9Vlyae5ehoKbbVPvkGInoL9BeOM-qXpQYEpbTbtV6JAFakz11cZ7f9qTrqfNYxrmHvycOxYY_zr7XS9y9xZIDcKU8ynR1t1HWXVmA2Tvv3B1uVO0_bdXoXE6V8KHw2F31ySKNiX_sFxpYkJweO7GKq71QwC4qfayhhC1Per5_yS7GZF2BIHKZWlvcJBs';

const QR_White_Frame = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqc4h-CIQhX8yfOAkz4Psr-oBurbtKkPURfpgmvmf1S1ZIKnorp04GxBEbyhAWnxEWisW56lm8mvrHKSIY2M7GXrqf7jATtbh2c7Ijvg_SRwMPNld7VTlXfZ_cNRNyJWcItuctVY6rZsVLRltNywHOjy6Yw_GxML5BYd-dUNqr50pmUqqI2iY_6vRMwKLKrK5V7Z0dBJmqeCR8gtZLnXEMajtU8_e0X2voAWOzuwdR-27s1N7ANcBseV2i-bmrZ6OY_LlxJFkKmik';

// Seed mock transfer items that can be selected when calling send
const INITIAL_MOCK_ITEMS: MockTransferItem[] = [
  // Apps
  { id: 'app1', name: 'بنكك - Bankak.apk', size: '42.5 MB', selected: false, type: 'app' },
  { id: 'app2', name: 'القرآن الكريم كامل.apk', size: '18.4 MB', selected: false, type: 'app' },
  { id: 'app3', name: 'واتساب الذهبي.apk', size: '64.1 MB', selected: false, type: 'app' },
  { id: 'app4', name: 'تطبيق سوداني شات.apk', size: '12.0 MB', selected: false, type: 'app' },
  // Photos
  { id: 'photo1', name: 'صورة النيل الأزرق القديم.jpg', size: '4.2 MB', selected: false, type: 'photo' },
  { id: 'photo2', name: 'جبال التاكا كسلا.png', size: '7.8 MB', selected: false, type: 'photo' },
  { id: 'photo3', name: 'سد مروي عند الغروب.jpg', size: '5.1 MB', selected: false, type: 'photo' },
  { id: 'photo4', name: 'العائلة في حديقة المقرن.jpg', size: '3.6 MB', selected: false, type: 'photo' },
  // Videos
  { id: 'video1', name: 'فيديو_التخرج_كامل_2026.mp4', size: '143.5 MB', selected: false, type: 'video' },
  { id: 'video2', name: 'رحلة حلفا الجديدة والآثار.mp4', size: '280.2 MB', selected: false, type: 'video' },
  { id: 'video3', name: 'عرض الدفعة التخصصي مدهش.mp4', size: '64.5 MB', selected: false, type: 'video' },
  // Files
  { id: 'file1', name: 'أبحاث_الهوية_السودانية_المعاصرة.pdf', size: '12.4 MB', selected: false, type: 'file' },
  { id: 'file2', name: 'كتيب تعليم البرمجة للمبتدئين.pdf', size: '4.8 MB', selected: false, type: 'file' },
  { id: 'file3', name: 'صورة شهادة التخرج والمعدل.jpg', size: '1.9 MB', selected: false, type: 'file' },
];

// Initial Recent Files (matching mockups perfectly)
const INITIAL_RECENT_FILES: RecentFile[] = [
  {
    id: 'f_rec1',
    name: 'صور العيد.zip',
    size: '24 MB',
    timeStringSd: 'قبل ١٠ دقائق',
    timeStringAr: 'قبل ١٠ دقائق',
    timeStringEn: '10 minutes ago',
    type: 'file',
    dateAdded: Date.now() - 10 * 60 * 1000
  },
  {
    id: 'f_rec2',
    name: 'مستندات التقديم.pdf',
    size: '1.2 MB',
    timeStringSd: 'أمس',
    timeStringAr: 'أمس',
    timeStringEn: 'Yesterday',
    type: 'file',
    dateAdded: Date.now() - 24 * 60 * 60 * 1000
  },
  {
    id: 'f_rec3',
    name: 'فيديو_التخرج.mp4',
    size: '85 MB',
    timeStringSd: 'قبل يومين',
    timeStringAr: 'قبل يومين',
    timeStringEn: '2 days ago',
    type: 'video',
    dateAdded: Date.now() - 48 * 60 * 60 * 1000
  }
];

export default function App() {
  // --- STATE DECLARATIONS ---
  const [lag, setLag] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('wasl_lang');
    return (saved as AppLanguage) || 'ar-sd';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('wasl_nickname') || 'أحمد محمد';
  });
  const [waslId, setWaslId] = useState(() => {
    return localStorage.getItem('wasl_id') || '772';
  });

  const [recentFiles, setRecentFiles] = useState<RecentFile[]>(() => {
    const saved = localStorage.getItem('wasl_recent_files');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_RECENT_FILES;
      }
    }
    return INITIAL_RECENT_FILES;
  });

  // Transfer selections state
  const [transferItems, setTransferItems] = useState<MockTransferItem[]>(() => {
    return INITIAL_MOCK_ITEMS;
  });

  // Selected Category filter for manual file picking / sending
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'app' | 'photo' | 'video' | 'file'>('app');
  
  // Custom interactive state for file upload
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(nickname);

  // Active Transfer Simulators State
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState('24.2 MB/s');
  const [transferTimeLeft, setTransferTimeLeft] = useState('2s');
  const [transferCompletedSuccessfully, setTransferCompletedSuccessfully] = useState(false);
  const [transferType, setTransferType] = useState<'send' | 'receive'>('send');
  const [transferringFilesList, setTransferringFilesList] = useState<MockTransferItem[]>([]);

  // Receive Nearby simulator list
  const [simulatedNearbyDevices, setSimulatedNearbyDevices] = useState<SendersMock[]>([
    { id: 'dev1', name: 'سارة الطاهر', avatarId: 1, strength: 3 },
    { id: 'dev2', name: 'عثمان الطيب', avatarId: 2, strength: 2 },
    { id: 'dev3', name: 'د. مأمون الخرطوم', avatarId: 3, strength: 1 },
  ]);

  // Bluetooth alert / Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom visual view toggle for "Recent Files Drawer" on mobile/desktop
  const [showAllRecentDrawer, setShowAllRecentDrawer] = useState(false);

  // --- HTML Video scanner simulate (Optional real-webcam) ---
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync RTL attributes & language on change
  useEffect(() => {
    localStorage.setItem('wasl_lang', lag);
    document.documentElement.dir = lag === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lag === 'en' ? 'en' : 'ar';
  }, [lag]);

  // Sync files list to local storage
  useEffect(() => {
    localStorage.setItem('wasl_recent_files', JSON.stringify(recentFiles));
  }, [recentFiles]);

  const dictionary: TranslationDict = TRANSLATIONS[lag];

  // --- ACTIONS ---

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleSelectFile = (id: string) => {
    setTransferItems(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectedFilesCount = transferItems.filter(i => i.selected).length;
  const selectedFilesTotalSize = transferItems
    .filter(i => i.selected)
    .reduce((acc, curr) => {
      const parsed = parseFloat(curr.size);
      return acc + (isNaN(parsed) ? 0 : parsed);
    }, 0);

  // Simulating the actual transfer pipeline
  const handleStartSending = () => {
    const selected = transferItems.filter(i => i.selected);
    if (selected.length === 0) {
      triggerToast(lag === 'en' ? 'Please select at least one item first!' : 'الرجاء أولاً اختيار ملف واحد على الأقل!');
      return;
    }

    setTransferringFilesList(selected);
    setTransferType('send');
    setIsTransferring(true);
    setTransferProgress(0);
    setTransferCompletedSuccessfully(false);

    // Simulate speedy transfer
    let prg = 0;
    const interval = setInterval(() => {
      prg += Math.floor(Math.random() * 15) + 5;
      if (prg >= 100) {
        prg = 100;
        clearInterval(interval);
        setTimeout(() => {
          // Finish transfer
          setTransferCompletedSuccessfully(true);
          // Insert items into Recent Files simulator list
          const newRecent: RecentFile[] = selected.map((item, index) => ({
            id: 'sent_' + Date.now() + index,
            name: item.name,
            size: item.size,
            timeStringSd: 'الآن',
            timeStringAr: 'الآن',
            timeStringEn: 'Just now',
            type: item.type,
            dateAdded: Date.now()
          }));
          setRecentFiles(prev => [...newRecent, ...prev]);
          
          // Deselect transferred files
          setTransferItems(prev => prev.map(i => ({ ...i, selected: false })));
          
          // Trigger success toast
          triggerToast(dictionary.connectionSuccess);
        }, 8000);
      }
      setTransferProgress(prg);
      // Randomize Speed / ETA
      const currentSpeedRounded = (Math.random() * 10 + 20).toFixed(1);
      setTransferSpeed(`${currentSpeedRounded} MB/s`);
      const secondsLeft = Math.ceil((100 - prg) / 18);
      setTransferTimeLeft(`${secondsLeft}s`);
    }, 450);
  };

  // Simulated simulator to receive a file from a selected nearby sender
  const handleSimulateReceiveFromDevice = (device: SendersMock) => {
    setTransferType('receive');
    setIsTransferring(true);
    setTransferProgress(0);
    setTransferCompletedSuccessfully(false);

    const receivedItem: MockTransferItem = {
      id: 'rec_sim_' + Date.now(),
      name: `${device.name}_مستند_مشارك.zip`,
      size: '34.8 MB',
      selected: false,
      type: 'file'
    };

    setTransferringFilesList([receivedItem]);

    let prg = 0;
    const interval = setInterval(() => {
      prg += Math.floor(Math.random() * 12) + 8;
      if (prg >= 100) {
        prg = 100;
        clearInterval(interval);
        setTimeout(() => {
          setTransferCompletedSuccessfully(true);
          // Save Received file to Recent Files
          const fileToReceive: RecentFile = {
            id: receivedItem.id,
            name: receivedItem.name,
            size: receivedItem.size,
            timeStringSd: 'الآن',
            timeStringAr: 'الآن',
            timeStringEn: 'Just now',
            type: 'file',
            dateAdded: Date.now()
          };
          setRecentFiles(prev => [fileToReceive, ...prev]);
          triggerToast(dictionary.connectionSuccess);
        }, 1000);
      }
      setTransferProgress(prg);
      const currentSpeedRounded = (Math.random() * 8 + 22).toFixed(1);
      setTransferSpeed(`${currentSpeedRounded} MB/s`);
      setTransferTimeLeft(`${Math.ceil((100 - prg) / 22)}s`);
    }, 400);
  };

  const handleShareAppBluetoothSim = () => {
    triggerToast(dictionary.shareSuccess);
  };

  const handleSaveProfile = () => {
    if (tempName.trim()) {
      setNickname(tempName);
      localStorage.setItem('wasl_nickname', tempName);
      // Change wasl ID randomly for premium organic feel
      const newId = Math.floor(Math.random() * 900) + 100;
      setWaslId(String(newId));
      localStorage.setItem('wasl_id', String(newId));
      setIsEditingProfile(false);
      triggerToast(lag === 'en' ? 'Profile details saved!' : 'تم حفظ بيانات الحساب بنجاح!');
    }
  };

  const handleDeleteRecentFile = (id: string) => {
    setRecentFiles(prev => prev.filter(f => f.id !== id));
    triggerToast(lag === 'en' ? 'File record removed' : 'تم حذف سجل الملف');
  };

  // Add dummy file to simulate receiving custom local file
  const handleAddDummyFileToSimulate = () => {
    const fileNames = [
      'تقرير_الشركة_الخرطوم.docx',
      'فول_سوداني_لذيذ.jpg',
      'صورة_بورتسودان_الجميلة.png',
      'كليب_عرض_أصيل.mp4',
      'كتاب_تاريخ_مملكة_مروي.pdf'
    ];
    const itemTypes: ('file' | 'photo' | 'video')[] = ['file', 'photo', 'photo', 'video', 'file'];
    const sizes = ['4.5 MB', '1.2 MB', '8.9 MB', '34.2 MB', '15.6 MB'];
    const randomIndex = Math.floor(Math.random() * fileNames.length);

    const simulatedFile: RecentFile = {
      id: 'dummy_' + Date.now(),
      name: fileNames[randomIndex],
      size: sizes[randomIndex],
      timeStringSd: 'الآن',
      timeStringAr: 'الآن',
      timeStringEn: 'Just now',
      type: itemTypes[randomIndex],
      dateAdded: Date.now()
    };

    setRecentFiles(prev => [simulatedFile, ...prev]);
    triggerToast(lag === 'en' ? 'Simulated file receipt recorded!' : 'تم محاكاة استلام ملف بنجاح!');
  };

  // Toggle Camera stream using real HTML5 API inside AI Studio sandbox
  const toggleCameraStream = async () => {
    if (webcamActive) {
      if (videoRef.current && videoRef.current.srcObject) {
         const stream = videoRef.current.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
      }
      setWebcamActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setWebcamActive(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(err => console.log("Video play error: ", err));
          }
        }, 100);
      } catch (err) {
        console.warn("Could not activate camera inside this browser framework: ", err);
        triggerToast(lag === 'en' ? 'Camera stream blocked or not available, using fallback animation.' : 'الكاميرا غير متاحة، تم تشغيل محاكي المسح التفاعلي.');
      }
    }
  };

  // Cleanup video stream on unmount or tab change
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab]);

  return (
    <div className="bg-background text-on-background font-sans min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Absolute Sudanse-inspired cultural pattern background overlay */}
      <div className="fixed inset-0 sudanese-pattern z-0 opacity-[0.25] pointer-events-none" />

      {/* Dynamic Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-20 left-4 right-4 md:left-auto md:right-12 z-[100] max-w-sm glass-card border border-primary/30 text-on-background px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3`}
          >
            <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <p className="text-sm font-medium">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT WRAPPER (Fluid grid) */}
      <div className="max-w-6xl mx-auto min-h-screen flex flex-col relative z-10">
        
        {/* TOP COMPREHENSIVE HEADER/APPBAR */}
        <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/40 px-4 py-3 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {activeTab !== 'home' && (
              <button
                onClick={() => setActiveTab('home')}
                className="p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150 text-primary-container"
              >
                {lag === 'en' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            )}
            <div>
              <h1 className="font-display text-2xl font-bold text-primary flex items-center gap-1">
                {dictionary.appName}
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              </h1>
              {activeTab === 'home' && (
                <p className="text-xs text-on-surface-variant font-medium">
                  {lag === 'en' ? 'Lightning file sharing' : 'بسرعة البرق'}
                </p>
              )}
              {activeTab !== 'home' && (
                <p className="text-xs text-on-surface-variant font-medium capitalize">
                  {dictionary[activeTab]}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Language Toggle Badge directly in headers */}
            <div className="flex bg-surface-container rounded-full p-0.5 border border-outline-variant/30 text-xs font-semibold mr-1">
              <button
                onClick={() => setLag('ar-sd')}
                className={`px-2.5 py-1 rounded-full transition-all ${lag === 'ar-sd' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                سوداني
              </button>
              <button
                onClick={() => setLag('ar-fn')}
                className={`px-2.5 py-1 rounded-full transition-all ${lag === 'ar-fn' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                فصحى
              </button>
              <button
                onClick={() => setLag('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${lag === 'en' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                EN
              </button>
            </div>

            {/* Quick User Avatar Badge */}
            <div
              onClick={() => {
                setActiveTab('settings');
                setIsEditingProfile(true);
              }}
              className="group flex items-center gap-2 hover:bg-surface-container-high transition-colors rounded-full p-1 pl-3 rtl:pl-1 rtl:pr-3 cursor-pointer border border-outline-variant/20 bg-surface-container-low"
            >
              <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-primary shrink-0 transition-transform group-hover:scale-105 duration-200">
                <img
                  alt="Wasl User Profile Portrait"
                  src={PORTRAIT_HOTLINK}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-on-surface font-display hidden sm:inline max-w-[80px] truncate">
                {nickname}
              </span>
            </div>

            {/* Main Toggle to access Settings */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 transition-transform rounded-full ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-surface-container-high text-primary'}`}
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* CONTAINER FOR TAB SCREENS */}
        <main className="flex-1 px-4 md:px-8 py-6 pb-28 min-h-screen relative z-10">
          
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: HOME SCREEN */}
            {activeTab === 'home' && (
              <motion.div
                key="home_tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Hero Welcome Banner Card */}
                <div className="bg-surface-container-lowest/80 border border-outline-variant/40 rounded-2xl p-6 relative overflow-hidden custom-shadow">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-bl-full pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-on-surface mb-1 flex items-center gap-2">
                        {dictionary.welcomeBack}
                        <span className="text-xl">🇸🇩</span>
                      </h2>
                      <p className="text-on-surface-variant text-sm md:text-base font-medium max-w-lg">
                        {dictionary.subtitlePhrase}
                      </p>
                    </div>

                    <button
                      onClick={handleAddDummyFileToSimulate}
                      className="bg-tertiary-fixed text-tertiary font-bold text-xs py-2 px-4 rounded-full border border-tertiary/20 hover:bg-tertiary-fixed/80 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      {lag === 'en' ? 'Simulate Receive File' : 'محاكاة استقبال ملف'}
                    </button>
                  </div>
                </div>

                {/* Main Action Grid - BENTO STYLE (Send/Receive Big buttons) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* SEND BUTTON */}
                  <button
                    onClick={() => {
                      setActiveTab('send');
                    }}
                    className="group relative flex flex-col items-center justify-center py-10 px-6 rounded-2xl bg-primary-container text-on-primary-container shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 overflow-hidden text-center cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-primary/90 opacity-90 z-0" />
                    <div className="absolute inset-0 bg-radial-[circle_at_bottom_left] from-white/10 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white group-hover:-translate-y-2.5 transition-transform duration-300">
                        <Send className="w-8 h-8" />
                      </div>
                      <span className="font-display text-2xl font-bold text-white mb-2">
                        {dictionary.sendActionTitle}
                      </span>
                      <span className="text-on-primary-container/85 text-xs md:text-sm font-medium max-w-xs">
                        {dictionary.sendActionDesc}
                      </span>
                    </div>
                  </button>

                  {/* RECEIVE BUTTON */}
                  <button
                    onClick={() => {
                      setActiveTab('receive');
                    }}
                    className="group relative flex flex-col items-center justify-center py-10 px-6 rounded-2xl bg-surface-container-highest border-2 border-primary-container/20 text-primary shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 overflow-hidden text-center cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/70 z-0" />
                    <div className="absolute inset-0 sudanese-pattern opacity-10 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                        {/* Custom visual QR representation using Lucide */}
                        <Clock className="w-8 h-8 animate-[spin_5s_infinite_linear]" />
                      </div>
                      <span className="font-display text-2xl font-bold text-primary mb-2">
                        {dictionary.receiveActionTitle}
                      </span>
                      <span className="text-on-surface-variant text-xs md:text-sm font-medium max-w-xs">
                        {dictionary.receiveActionDesc}
                      </span>
                    </div>
                  </button>

                </div>

                {/* Share Application Card */}
                <div className="glass-card p-5 rounded-2xl border border-outline-variant/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
                    <div className="w-12 h-12 bg-primary-container/15 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-on-surface text-base">
                        {dictionary.shareAppLong}
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        {dictionary.shareDesc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleShareAppBluetoothSim}
                    className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-full font-bold text-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {dictionary.startSharing}
                  </button>
                </div>

                {/* Recent Files Table Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-on-surface">
                      {dictionary.recentFiles}
                    </h3>
                    <button
                      onClick={() => setShowAllRecentDrawer(true)}
                      className="text-primary font-bold text-xs hover:underline flex items-center gap-1"
                    >
                      {dictionary.viewAll}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {recentFiles.slice(0, 3).map(file => (
                      <div
                        key={file.id}
                        className="flex items-center p-3.5 bg-white rounded-xl border border-surface-container shadow-sm hover:border-primary-container/30 transition-colors cursor-pointer group relative"
                      >
                        {/* Conditional icons */}
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ml-3 ltr:mr-3 ltr:ml-0 ${
                            file.type === 'file'
                              ? 'bg-primary-container/10 text-primary-container'
                              : file.type === 'photo'
                              ? 'bg-tertiary-fixed-dim/20 text-tertiary'
                              : 'bg-secondary-container/10 text-secondary'
                          }`}
                        >
                          {file.type === 'file' && <FileText className="w-5 h-5" />}
                          {file.type === 'photo' && <ImageIcon className="w-5 h-5" />}
                          {file.type === 'video' && <VideoIcon className="w-5 h-5" />}
                          {file.type === 'app' && <Folder className="w-5 h-5" />}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-display font-bold text-on-surface text-sm truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-on-surface-variant font-medium">
                            {lag === 'ar-sd'
                              ? file.timeStringSd
                              : lag === 'ar-fn'
                              ? file.timeStringAr
                              : file.timeStringEn}{' '}
                            • {file.size}
                          </p>
                        </div>

                        {/* Direct deletion hover button for interactive client-side management */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecentFile(file.id);
                          }}
                          className="p-1 text-on-surface-variant hover:text-red-600 rounded-full hover:bg-red-50"
                          title={dictionary.deleteBtn}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* SCREEN 2: SEND (FILE PICKER + CAMERA QR CODE SCANNER SIMULATOR) */}
            {activeTab === 'send' && (
              <motion.div
                key="send_tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Header view message */}
                <div className="text-center max-w-md mx-auto mb-4">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-primary">
                    {dictionary.scanToConnect}
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {dictionary.scanSpeedDesc}
                  </p>
                </div>

                {/* Grid Layout: Left is File Selector categories picker, Right is QR Code scanner camera visualizer */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Interactive Category Pickers & Category Checklist (Self-persist checklist) */}
                  <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
                    
                    <div className="flex items-center justify-between border-b border-surface-container pb-3">
                      <h3 className="font-display font-bold text-on-surface text-base">
                        {dictionary.selectItems}
                      </h3>
                      {selectedFilesCount > 0 && (
                        <div className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <span>{selectedFilesCount}</span>
                          <span className="opacity-80">{dictionary.itemsSelected}</span>
                        </div>
                      )}
                    </div>

                    {/* Category switcher tabs */}
                    <div className="grid grid-cols-4 gap-1 bg-surface-container p-1 rounded-xl">
                      <button
                        onClick={() => setSelectedCategoryTab('app')}
                        className={`text-center py-2 px-1 rounded-lg text-xs font-bold font-display transition-all capitalize ${
                          selectedCategoryTab === 'app' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        {dictionary.appsCategory}
                      </button>
                      <button
                        onClick={() => setSelectedCategoryTab('photo')}
                        className={`text-center py-2 px-1 rounded-lg text-xs font-bold font-display transition-all capitalize ${
                          selectedCategoryTab === 'photo' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        {dictionary.photosCategory}
                      </button>
                      <button
                        onClick={() => setSelectedCategoryTab('video')}
                        className={`text-center py-2 px-1 rounded-lg text-xs font-bold font-display transition-all capitalize ${
                          selectedCategoryTab === 'video' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        {dictionary.videosCategory}
                      </button>
                      <button
                        onClick={() => setSelectedCategoryTab('file')}
                        className={`text-center py-2 px-1 rounded-lg text-xs font-bold font-display transition-all capitalize ${
                          selectedCategoryTab === 'file' ? 'bg-primary-container text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        {dictionary.filesCategory}
                      </button>
                    </div>

                    {/* Item Checklist Scroll list */}
                    <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                      {transferItems
                        .filter(u => u.type === selectedCategoryTab)
                        .map(item => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleSelectFile(item.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                              item.selected
                                ? 'bg-primary-container/5 border-primary-container'
                                : 'bg-surface-container-low/50 border-outline-variant/30 hover:bg-surface-low'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                item.selected ? 'bg-primary-container/15 text-primary-container' : 'bg-surface-container-high text-on-surface-variant'
                              }`}>
                                {item.type === 'app' && <Folder className="w-4 h-4" />}
                                {item.type === 'photo' && <ImageIcon className="w-4 h-4" />}
                                {item.type === 'video' && <VideoIcon className="w-4 h-4" />}
                                {item.type === 'file' && <FileText className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface line-clamp-1">
                                  {item.name}
                                </p>
                                <p className="text-[10px] text-on-surface-variant font-medium">
                                  {item.size}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0">
                              {item.selected ? (
                                <div className="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center text-white">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full border border-outline-variant" />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Bottom Selected indicators */}
                    {selectedFilesCount > 0 && (
                      <div className="pt-2 border-t border-surface-container flex justify-between items-center text-xs">
                        <span className="text-on-surface-variant font-medium">
                          {lag === 'en' ? 'Total Size:' : 'الحجم الإجمالي:'}
                        </span>
                        <span className="font-bold text-primary">
                          {selectedFilesTotalSize.toFixed(1)} {dictionary.sizeMb}
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Right Column: Beautiful QR Viewfinder Frame */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    
                    <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-md border-4 border-white/80 p-1 bg-surface-container-low group">
                      {/* Decorative scanning corners */}
                      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl z-20" />
                      <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl z-20" />
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl z-20" />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl z-20" />

                      {/* Display either real camera OR glowing illustration fallback */}
                      <div className="w-full h-full relative bg-black flex items-center justify-center">
                        {webcamActive ? (
                          <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            playsInline
                            muted
                          />
                        ) : (
                          <>
                            <img
                              alt="Futuristic QR Scan mockup"
                              src={QR_Futuristic_Scan}
                              className="w-full h-full object-cover opacity-65"
                            />
                            {/* Neon indicator code overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent pointer-events-none" />
                          </>
                        )}

                        {/* Scanner visualizer scanline */}
                        <div className="absolute left-0 top-0 w-full h-1 bg-primary-container shadow-[0_0_15px_rgba(0,122,94,0.9)] scan-anim-line z-10" />
                      </div>
                    </div>

                    {/* Camera Trigger switch */}
                    <button
                      onClick={toggleCameraStream}
                      className="mt-3.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${webcamActive ? 'animate-spin' : ''}`} />
                      {webcamActive
                        ? (lag === 'en' ? 'Use Fallback View' : 'استخدم شاشة المحاكاة')
                        : (lag === 'en' ? 'Simulate Real Camera' : 'تفعيل الكاميرا الحقيقية للمسح')}
                    </button>

                    {/* Active Speed Network indicator status */}
                    <div className="w-full mt-4 bg-primary-container/10 p-3.5 rounded-xl flex items-center gap-3 border border-primary/20">
                      <div className="p-1.5 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xs text-primary leading-tight">
                          {dictionary.readyStatus}
                        </h4>
                        <p className="text-[11px] text-on-surface-variant leading-normal">
                          {dictionary.readyStatusDesc}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Floating Absolute Footer Action Send Trigger */}
                <div className="pt-4 flex flex-col items-center">
                  <button
                    onClick={handleStartSending}
                    disabled={selectedFilesCount === 0}
                    className={`w-full max-w-md py-4 bg-primary text-white font-display text-lg font-bold rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
                      selectedFilesCount === 0 ? 'opacity-50 cursor-not-allowed bg-outline' : 'hover:bg-primary-container'
                    }`}
                  >
                    <span>{dictionary.confirmSendText}</span>
                    <Send className="w-5 h-5 shrink-0" />
                  </button>
                </div>

              </motion.div>
            )}

            {/* SCREEN 3: RECEIVE (QR CARD WITH RADAR RIPPLES SIMULATOR) */}
            {activeTab === 'receive' && (
              <motion.div
                key="receive_tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center space-y-6"
              >
                
                {/* Header Messaging */}
                <div className="text-center max-w-sm mx-auto">
                  <h2 className="font-display text-2xl font-bold text-primary">
                    {dictionary.stayClose}
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {dictionary.askSender}
                  </p>
                </div>

                {/* QR Code premium Card layout */}
                <div className="relative">
                  {/* Outer decorative corners */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

                  {/* QR Card container */}
                  <div className="bg-white p-4 rounded-2xl shadow-xl border border-outline-variant/30 max-w-[260px]">
                    <img
                      alt="Receive QR Code generator"
                      src={QR_White_Frame}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </div>

                {/* ID Badge indicator */}
                <div className="flex items-center bg-surface-container-low px-4 py-2.5 rounded-full border border-outline-variant/50 shadow-sm max-w-[320px] truncate">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white mr-2.5 rtl:mr-0 rtl:ml-2.5 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-display font-semibold text-xs text-on-surface">
                    {nickname} (Wasl ID: {waslId})
                  </span>
                </div>

                {/* RADAR WAVES & CONNECTING STATUS */}
                <div className="w-full flex flex-col items-center pt-8 border-t border-outline-variant/20 max-w-lg">
                  
                  {/* Radar Wave graphics */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full border-2 border-primary-container opacity-20 radar-circle" />
                    <div className="absolute w-20 h-20 rounded-full border-2 border-primary-container opacity-20 radar-circle delay-1" />
                    <div className="absolute w-20 h-20 rounded-full border-2 border-primary-container opacity-20 radar-circle delay-2" />
                    
                    <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg text-white">
                      {/* Bluetooth icon as referenced */}
                      <Sparkles className="w-5 h-5 animate-spin" />
                    </div>
                  </div>

                  <p className="mt-4 text-primary font-display font-medium text-xs tracking-wide flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                    {dictionary.searchingNearby}
                  </p>

                  {/* Nearby simulated Devices connector panel */}
                  <div className="w-full mt-6 space-y-2">
                    <p className="text-xs font-bold text-on-surface-variant font-display mb-1 px-1">
                      {lag === 'en' ? 'Click on Senders around you to pull files:' : 'اضغط على أحد المستخدمين حولك لاستيراد ملفاته:'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {simulatedNearbyDevices.map(dev => (
                        <div
                          key={dev.id}
                          onClick={() => handleSimulateReceiveFromDevice(dev)}
                          className="flex items-center gap-2.5 p-3 bg-white hover:bg-primary-container/10 border border-outline-variant/40 rounded-xl cursor-pointer active:scale-95 transition-all text-right"
                        >
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold border border-outline-variant/65 text-primary shrink-0">
                            {dev.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-on-surface truncate leading-tight">
                              {dev.name}
                            </p>
                            <p className="text-[10px] text-on-surface-variant font-medium">
                              {lag === 'en' ? 'Signal Strength' : 'قوة الإرسال'}: {dev.strength === 3 ? '⚡ ممتاز' : '★ جيد'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connecting status label */}
                  <div className="w-full mt-6 bg-surface-container-highest/20 rounded-xl p-4 border border-dashed border-outline-variant/60 flex items-center justify-center h-16">
                    <p className="text-on-surface-variant text-xs font-medium italic opacity-75">
                      {dictionary.waitingConnection}
                    </p>
                  </div>

                </div>

              </motion.div>
            )}

            {/* SCREEN 4: SETTINGS SCREEN */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings_tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Profile Customizer Heading / Card */}
                <div className="bg-white p-5 rounded-2xl border border-outline-variant/50 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-sm shrink-0">
                      <img
                        alt="Wasl main portrait placeholder"
                        src={PORTRAIT_HOTLINK}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left space-y-1">
                      <h3 className="font-display font-bold text-lg text-on-surface">
                        {nickname}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-semibold">
                        {dictionary.waslId}: <span className="text-primary font-bold">#{waslId}</span>
                      </p>
                      
                      {!isEditingProfile ? (
                        <button
                          onClick={() => {
                            setTempName(nickname);
                            setIsEditingProfile(true);
                          }}
                          className="mt-2 text-xs font-bold text-primary hover:underline bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/20 transition-all cursor-pointer"
                        >
                          {dictionary.editNickname}
                        </button>
                      ) : (
                        <div className="mt-2 flex flex-col sm:flex-row gap-2 max-w-sm">
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="bg-surface-container-lowest border border-outline-variant rounded-full text-xs px-3 py-1.5 text-on-surface"
                            placeholder={lag === 'en' ? 'Type new name...' : 'اكتب الإسم الجديد...'}
                          />
                          <div className="flex gap-1.5 justify-center">
                            <button
                              onClick={handleSaveProfile}
                              className="bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-primary-container"
                            >
                              {dictionary.save}
                            </button>
                            <button
                              onClick={() => setIsEditingProfile(false)}
                              className="bg-surface-container-high text-on-surface text-[11px] font-bold px-2.5 py-1.5 rounded-full"
                            >
                              {dictionary.cancel}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* LANGUAGE SELECTION CONTAINER */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <Languages className="w-5 h-5 text-tertiary" />
                    <h2 className="font-display text-lg font-bold text-on-surface">
                      {dictionary.appLanguage}
                    </h2>
                  </div>

                  <div className="space-y-2.5">
                    
                    {/* Sudanese Option Container */}
                    <div
                      onClick={() => setLag('ar-sd')}
                      className={`rounded-xl p-4 border-2 flex justify-between items-center cursor-pointer transition-all active:scale-[0.98] ${
                        lag === 'ar-sd'
                          ? 'border-primary-container bg-surface-container-highest/60'
                          : 'border-outline-variant/30 bg-surface-container-low/40 hover:bg-surface-low'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-base text-on-surface text-right">
                          {dictionary.sudaneseDialect}
                        </span>
                        <span className="text-xs text-on-surface-variant font-semibold">
                          {dictionary.sudaneseDialectDesc}
                        </span>
                      </div>
                      <div className="shrink-0 leading-none">
                        {lag === 'ar-sd' ? (
                          <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-white">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-outline-variant" />
                        )}
                      </div>
                    </div>

                    {/* Standard Arabic Option Container */}
                    <div
                      onClick={() => setLag('ar-fn')}
                      className={`rounded-xl p-4 border-2 flex justify-between items-center cursor-pointer transition-all active:scale-[0.98] ${
                        lag === 'ar-fn'
                          ? 'border-primary-container bg-surface-container-highest/60'
                          : 'border-outline-variant/30 bg-surface-container-low/40 hover:bg-surface-low'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-base text-on-surface text-right">
                          {dictionary.formalArabic}
                        </span>
                        <span className="text-xs text-on-surface-variant font-semibold">
                          {dictionary.formalArabicDesc}
                        </span>
                      </div>
                      <div className="shrink-0 leading-none">
                        {lag === 'ar-fn' ? (
                          <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-white">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-outline-variant" />
                        )}
                      </div>
                    </div>

                    {/* English Option Container */}
                    <div
                      onClick={() => setLag('en')}
                      className={`rounded-xl p-4 border-2 flex justify-between items-center cursor-pointer transition-all active:scale-[0.98] ${
                        lag === 'en'
                          ? 'border-primary-container bg-surface-container-highest/60'
                          : 'border-outline-variant/30 bg-surface-container-low/40 hover:bg-surface-low'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-base text-on-surface text-left">
                          {dictionary.english}
                        </span>
                        <span className="text-xs text-on-surface-variant font-semibold">
                          {dictionary.englishDesc}
                        </span>
                      </div>
                      <div className="shrink-0 leading-none">
                        {lag === 'en' ? (
                          <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-white">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-outline-variant" />
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* SECONDARY SETTINGS TOOLS SECTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Bluetooth Bluetooth card */}
                  <div className="bg-surface-container-lowest/80 border border-outline-variant/50 rounded-2xl p-5 text-center flex flex-col items-center justify-between space-y-3 shadow-sm group hover:border-primary transition-all">
                    <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary group-hover:scale-115 transition-transform duration-200">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-on-surface text-sm">
                        {dictionary.shareTitle}
                      </h3>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                        {dictionary.shareDesc}
                      </p>
                    </div>
                    <button
                      onClick={handleShareAppBluetoothSim}
                      className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-full text-xs font-bold active:scale-95 transition-all"
                    >
                      {dictionary.startSharing}
                    </button>
                  </div>

                  {/* Help Card */}
                  <div className="bg-surface-container-lowest/80 border border-outline-variant/50 rounded-2xl p-5 text-center flex flex-col items-center justify-between space-y-3 shadow-sm group hover:border-tertiary transition-all">
                    <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-115 transition-transform duration-200">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-on-surface text-sm">
                        {dictionary.helpTitle}
                      </h3>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                        {dictionary.helpDesc}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        triggerToast(lag === 'en' ? 'Support module initialized - Contact channel verified!' : 'تم تفعيل مسار الدعم الفني! تواصل معنا عبر البريد الإلكتروني mohmedelmhi2@gmail.com');
                      }}
                      className="border-2 border-tertiary text-tertiary px-5 py-1.5 rounded-full text-xs font-bold hover:bg-tertiary-fixed active:scale-95 transition-all"
                    >
                      {dictionary.contactUs}
                    </button>
                  </div>

                </div>

                {/* Section About with Dashed Gold Border */}
                <div className="dashed-border p-6 flex flex-col md:flex-row items-center gap-5">
                  <div className="w-20 h-20 shrink-0 bg-primary-container rounded-2xl flex items-center justify-center text-white font-display font-bold text-4xl shadow-md">
                    W
                  </div>
                  <div className="flex-1 text-center md:text-right rtl:md:text-right ltr:md:text-left space-y-2">
                    <h2 className="font-display text-lg font-bold text-primary">
                      {dictionary.aboutTitle}
                    </h2>
                    <p className="text-on-surface-variant text-xs leading-relaxed max-w-2xl font-medium">
                      {dictionary.aboutDesc}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1.5">
                      <span className="bg-surface-container-highest text-[10px] text-on-surface-variant px-3 py-1 rounded-full font-bold">
                        {dictionary.versionBadge}
                      </span>
                      <span className="bg-surface-container-highest text-[10px] text-on-surface-variant px-3 py-1 rounded-full font-bold">
                        {dictionary.madeInSudanBadge}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* SCREEN 5: TRANSFER HISTORY SCREEN */}
            {activeTab === 'history' && (
              <motion.div
                key="history_tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                
                {/* Search Bar filter */}
                <div className="bg-white p-2 rounded-full border border-outline-variant flex items-center px-4 shadow-sm">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-on-surface h-8"
                    placeholder={dictionary.searchPlaceholder}
                  />
                  <Clock className="w-4 h-4 text-on-surface-variant/70 shrink-0" />
                </div>

                {/* History list card container */}
                <div className="bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-surface-container pb-2">
                    <h2 className="font-display font-bold text-on-surface text-base">
                      {lag === 'en' ? 'Comprehensive Transfer Logs' : 'سجل التحويلات الكامل'}
                    </h2>
                    <span className="text-[10px] text-on-surface-variant font-bold">
                      {recentFiles.length} {lag === 'en' ? 'records' : 'عمليات'}
                    </span>
                  </div>

                  {recentFiles.length === 0 ? (
                    <div className="py-12 text-center text-on-surface-variant text-sm italic">
                      {dictionary.emptyHistory}
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[460px] overflow-y-auto">
                      {recentFiles
                        .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(file => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 rounded-xl border border-outline-variant/20 bg-surface-container-low/30 hover:bg-surface-container-low transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                                {file.type === 'file' && <FileText className="w-4 h-4" />}
                                {file.type === 'photo' && <ImageIcon className="w-4 h-4" />}
                                {file.type === 'video' && <VideoIcon className="w-4 h-4" />}
                                {file.type === 'app' && <Folder className="w-4 h-4" />}
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-bold text-on-surface line-clamp-1">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-on-surface-variant">
                                  {file.size} • {lag === 'en'? 'Received' : 'مستلم بنجاح'}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteRecentFile(file.id)}
                              className="text-on-surface-variant hover:text-red-600 p-1 rounded-md"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </main>

        {/* COMPREHENSIVE BOTTOM TIMELINE ACTION SHEETS / DRAWER DRAWER */}
        <AnimatePresence>
          {showAllRecentDrawer && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAllRecentDrawer(false)}
                className="absolute inset-0 bg-black"
              />

              {/* Bottom Sheet Body */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative z-10 w-full max-w-lg bg-white rounded-t-2xl shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
              >
                {/* Drag handle line */}
                <div className="w-12 h-1 bg-tertiary-fixed rounded-full mx-auto" />
                
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                  <h3 className="font-display font-bold text-on-surface text-base">
                    {dictionary.recentFiles}
                  </h3>
                  <button
                    onClick={() => setShowAllRecentDrawer(false)}
                    className="p-1 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {recentFiles.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border border-outline-variant/30 rounded-xl bg-surface-container-low/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                          {file.type === 'file' && <FileText className="w-4.5 h-4.5" />}
                          {file.type === 'photo' && <ImageIcon className="w-4.5 h-4.5" />}
                          {file.type === 'video' && <VideoIcon className="w-4.5 h-4.5" />}
                          {file.type === 'app' && <Folder className="w-4.5 h-4.5" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface truncate max-w-[190px]">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-on-surface-variant">
                            {file.size} • {lag === 'en' ? 'Completed' : 'مستقبل'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteRecentFile(file.id)}
                        className="text-on-surface-variant hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* TRANSFER SIMULATOR RUNTIME DIALOG (Send/Receive overlay) */}
        <AnimatePresence>
          {isTransferring && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Box Dialog body */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-outline-variant text-center space-y-4"
              >
                <div className="flex justify-between items-center border-b border-surface-container pb-2">
                  <span className="font-display font-semibold text-xs text-on-surface-variant flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    {transferType === 'send' ? dictionary.sending : dictionary.receiving}
                  </span>
                  {!transferCompletedSuccessfully && (
                    <button
                      onClick={() => setIsTransferring(false)}
                      className="p-1 rounded-full hover:bg-surface-container-high transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Simulated profile avatar image pair */}
                <div className="flex items-center justify-center gap-8 py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container">
                      <img alt="Receiver main profile image" src={PORTRAIT_HOTLINK} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant mt-1.5 truncate max-w-[70px]">
                      {nickname}
                    </span>
                  </div>

                  {/* High speed Nile logo link line */}
                  <div className="relative flex-1 flex items-center justify-center">
                    <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden absolute">
                      <motion.div
                        className="h-full bg-primary-container"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        style={{ width: '50%' }}
                      />
                    </div>
                    <Sparkles className="w-5 h-5 text-primary animate-spin relative z-10" />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container">
                      <img alt="Sender main profile avatar" src={INCOMING_PORTRAIT_HOTLINK} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant mt-1.5 truncate max-w-[70px]">
                      {transferType === 'send' ? 'عثمان الطيب' : 'سارة الطاهر'}
                    </span>
                  </div>
                </div>

                {/* Progress Circle or Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-on-surface-variant">
                      {transferCompletedSuccessfully ? dictionary.transferComplete : `${dictionary.remainingTime}: ${transferTimeLeft}`}
                    </span>
                    <span className="font-bold text-primary">
                      {transferProgress}%
                    </span>
                  </div>

                  {/* Transfer Flow bar referenced in styles (sand unfilled, primary/container gradient filled) */}
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary-container"
                      initial={{ width: 0 }}
                      animate={{ width: `${transferProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Metadata of items currently selected */}
                <div className="bg-surface-container-low p-3 rounded-lg text-right text-xs max-h-[85px] overflow-y-auto">
                  <p className="font-bold text-on-surface leading-tight mb-1">
                    {transferType === 'send' ? `إرسال ${transferringFilesList.length} ملفات:` : 'استقبال:'}
                  </p>
                  <ul className="space-y-1 text-on-surface-variant font-medium text-[11px] list-disc list-inside">
                    {transferringFilesList.map(item => (
                      <li key={item.id} className="truncate select-none">
                        {item.name} ({item.size})
                      </li>
                    ))}
                  </ul>
                </div>

                {!transferCompletedSuccessfully ? (
                  <div className="flex justify-between text-[11px] text-on-surface-variant font-semibold bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/20">
                    <div>
                      <span className="opacity-75">{dictionary.transferSpeed}:</span>{' '}
                      <span className="font-bold text-primary">{transferSpeed}</span>
                    </div>
                    <div>
                      <span>Wasl HighSpeed Direct ™</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 text-green-800 text-xs py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>{dictionary.connectionSuccess}</span>
                    </div>

                    <button
                      onClick={() => {
                        setIsTransferring(false);
                        // Redirect to History page
                        setActiveTab('history');
                      }}
                      className="w-full py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-full transition-all active:scale-95"
                    >
                      {lag === 'en' ? 'Open History Log' : 'فتح سجل التحويلات'}
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PERSISTENT FLUID BOTTOM NAVIGATION BAR */}
        <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface border-t border-outline-variant dark:border-outline shadow-2xl flex justify-around items-center px-4 py-2 pb-5 md:pb-3 max-w-6xl mx-auto rounded-t-2xl">
          
          {/* HOME */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
              activeTab === 'home' ? 'bg-primary-container text-white px-4 py-1' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">
              {dictionary.home}
            </span>
          </button>

          {/* SEND */}
          <button
            onClick={() => {
              setActiveTab('send');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
              activeTab === 'send' ? 'bg-primary-container text-white px-4 py-1' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Send className="w-5 h-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">
              {dictionary.send}
            </span>
          </button>

          {/* RECEIVE */}
          <button
            onClick={() => {
              setActiveTab('receive');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
              activeTab === 'receive' ? 'bg-primary-container text-white px-4 py-1' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">
              {dictionary.receive}
            </span>
          </button>

          {/* HISTORY */}
          <button
            onClick={() => {
              setActiveTab('history');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
              activeTab === 'history' ? 'bg-primary-container text-white px-4 py-1' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <HistoryIcon className="w-5 h-5" />
            <span className="text-[10px] font-display font-semibold mt-0.5">
              {dictionary.history}
            </span>
          </button>

        </nav>

      </div>
    </div>
  );
}
