import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Gift,
  Camera,
  Play,
  RotateCcw,
  Sparkles,
  Edit,
  Check,
  Music,
  User,
  ExternalLink,
  Tv,
  Maximize2,
  X
} from 'lucide-react';

import { PageIndex } from './types';
import { DEFAULT_MEMORIES, SPECIAL_VIDEOS } from './data/memories';
import AudioPlayer from './components/AudioPlayer';
import Fireworks from './components/Fireworks';
import Balloons from './components/Balloons';
import Hearts from './components/Hearts';
import Cake from './components/Cake';
import GiftBox from './components/GiftBox';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageIndex>(PageIndex.Intro);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  // Customization Core States (with localStorage memory fallbacks)
  const [birthdayPerson, setBirthdayPerson] = useState(() => {
    return localStorage.getItem('bday_person') || 'Eman ❤️';
  });
  const [senderName, setSenderName] = useState(() => {
    return localStorage.getItem('bday_sender') || 'Your Special Someone';
  });
  
  // Custom letter state
  const [customLetter, setCustomLetter] = useState(() => {
    return localStorage.getItem('bday_letter') || 
      `My dearest birthday girl/boy,\n\nOn this incredibly special day, I wanted to create something as magical, bright, and beautiful as you are. You bring so much light, comfort, and pure happiness into my world. Every single moment shared with you is a treasure.\n\nAs you blow out your candles and celebrate another year, I want you to know how deeply you are loved. I promise to stand by your side, laugh with you in happy times, and be your cozy shelter during life's storms.\n\nHappy Birthday, my favorite person, my world, my everything. Forever & always.`;
  });

  // Dynamic page text states (with localStorage fallbacks)
  const [introGreeting, setIntroGreeting] = useState(() => {
    return localStorage.getItem('bday_intro_greeting') || '✨ TADAAAAAA... ✨';
  });
  const [introTitle, setIntroTitle] = useState(() => {
    return localStorage.getItem('bday_intro_title') || 'The Most Special Birthday Surprise For You ❤️';
  });
  const [introSub, setIntroSub] = useState(() => {
    return localStorage.getItem('bday_intro_sub') || 'Today is a very beautiful day because the most beautiful person was born on this day. Turn up your volume, click the button below, and dive into your surprise! 🎁';
  });
  const [introBtn, setIntroBtn] = useState(() => {
    return localStorage.getItem('bday_intro_btn') || 'Start Surprise';
  });

  const [page2Title, setPage2Title] = useState(() => {
    return localStorage.getItem('bday_page2_title') || 'Happy Birthday 🎉';
  });
  const [typewriterGreeting, setTypewriterGreeting] = useState(() => {
    return localStorage.getItem('bday_typewriter_greeting') || 'Happy Birthday to the most beautiful, amazing, and precious soul in the entire universe! 🎂✨ Today is all about you—your lovely laugh, your bright smile, and the warmth you radiate everywhere you go. This website is a small tribute to how special you are to me. Let\'s embark on a little journey of our sweetest memories...';
  });

  const [page3Title, setPage3Title] = useState(() => {
    return localStorage.getItem('bday_page3_title') || 'My Special Letter to You';
  });

  const [page4Title, setPage4Title] = useState(() => {
    return localStorage.getItem('bday_page4_title') || 'A Walk Down Memory Lane';
  });
  const [page4Sub, setPage4Sub] = useState(() => {
    return localStorage.getItem('bday_page4_sub') || 'Tap on any polaroid photo to open the lightbox story! ❤️';
  });

  // Memories state (4 personal photos!)
  const [memories, setMemories] = useState<any[]>(() => {
    const saved = localStorage.getItem('bday_memories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'mem-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
        title: 'Starry Conversations 🌌',
        description: 'Remember the long conversations we shared under the starry sky, laughing, dreaming, and planning our beautiful future together. That remains one of my most cherished moments.',
        date: 'A Sweet Summer Night'
      },
      {
        id: 'mem-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
        title: 'Locked in Polaroids 📸',
        description: 'Capturing every genuine smile, silly face, and warm glance on film. Each photograph is a precious chapter in our story that I love revisiting over and over again.',
        date: 'Cozy Winter Evening'
      },
      {
        id: 'mem-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1464349172961-10442b3c173c?q=80&w=600&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1464349172961-10442b3c173c?q=80&w=600&auto=format&fit=crop',
        title: 'The Perfect Birthday 🎂',
        description: 'Celebrating you—the most wonderful, bright, and loving soul I have ever known. Being able to see your eyes light up as you blow out your candles is the best gift in the world.',
        date: 'Your Special Day'
      },
      {
        id: 'mem-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop',
        title: 'Sweet Magic Moments ✨',
        description: 'No matter where we go or what we do, life is an amazing adventure with you. Thank you for filling every day with pure joy, sweet surprises, and unconditional love.',
        date: 'Our Sweet Journey'
      }
    ];
  });

  const [page5Title, setPage5Title] = useState(() => {
    return localStorage.getItem('bday_page5_title') || 'Cozy Vibe Player';
  });
  const [page5Sub, setPage5Sub] = useState(() => {
    return localStorage.getItem('bday_page5_sub') || 'Select a beautiful atmosphere designed to play alongside the music!';
  });

  // Videos state (4 personal video clips!)
  const [videos, setVideos] = useState<any[]>(() => {
    const saved = localStorage.getItem('bday_videos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'vid-1',
        title: 'Cozy Rainy Café ☕',
        description: 'A beautiful place that reminds me of our warm, cozy dates filled with hot cocoa and endless laughter.',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-cup-with-a-heart-drawn-in-the-foam-43301-large.mp4',
        caption: 'Every sweet cup of coffee reminds me of the warmth you bring into my life. ❤️'
      },
      {
        id: 'vid-2',
        title: 'Sparkling Sunset Sea 🌊',
        description: 'A breathtaking golden sunset on the ocean that sparkles just like your beautiful eyes when you laugh.',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-sunset-on-the-horizon-of-the-sea-11881-large.mp4',
        caption: 'You are my sunset, my sunrise, and my entire beautiful ocean of happiness. 🌅'
      },
      {
        id: 'vid-3',
        title: 'Starry Forest Cabin 🏡',
        description: 'A wooden cabin in the mountains surrounded by nature, tall trees, and peaceful silence.',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-wood-log-burning-in-a-fireplace-42801-large.mp4',
        caption: 'Away from the rush, our own cozy bubble of pure magical comfort. ✨'
      },
      {
        id: 'vid-4',
        title: 'Beautiful Golden Fireflies ✨',
        description: 'Blinking fireflies in the twilight of an enchanted forest, creating a dreamlike glow.',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-night-sky-41585-large.mp4',
        caption: 'Even in the darkest times, your sweet presence guides me like glowing lights. 💖'
      }
    ];
  });

  const [finalHeading, setFinalHeading] = useState(() => {
    return localStorage.getItem('bday_final_heading') || '🎉 Hooray! 🎉';
  });
  const [finalTitle, setFinalTitle] = useState(() => {
    return localStorage.getItem('bday_final_title') || 'I Hope You Loved This Surprise ❤️';
  });
  const [finalSub, setFinalSub] = useState(() => {
    return localStorage.getItem('bday_final_sub') || 'Happy Birthday Once Again, {name} 🎂';
  });
  const [finalCardText, setFinalCardText] = useState(() => {
    return localStorage.getItem('bday_final_card_text') || 'This special gift website is locked with love. Share it with your loved one to bring a bright smile to their face!';
  });

  // Audio configuration state
  const [audioMode, setAudioMode] = useState<'synth' | 'custom_mp3'>(() => {
    return (localStorage.getItem('bday_audio_mode') as any) || 'synth';
  });
  const [customAudioUrl, setCustomAudioUrl] = useState(() => {
    return localStorage.getItem('bday_custom_audio_url') || '';
  });

  const [isEditingNames, setIsEditingNames] = useState(false);
  const [tempPerson, setTempPerson] = useState(birthdayPerson);
  const [tempSender, setTempSender] = useState(senderName);
  const [tempLetter, setTempLetter] = useState(customLetter);

  // Temporary editing state for settings modal tabs
  const [tempIntroGreeting, setTempIntroGreeting] = useState(introGreeting);
  const [tempIntroTitle, setTempIntroTitle] = useState(introTitle);
  const [tempIntroSub, setTempIntroSub] = useState(introSub);
  const [tempIntroBtn, setTempIntroBtn] = useState(introBtn);

  const [tempPage2Title, setTempPage2Title] = useState(page2Title);
  const [tempTypewriterGreeting, setTempTypewriterGreeting] = useState(typewriterGreeting);

  const [tempPage3Title, setTempPage3Title] = useState(page3Title);

  const [tempPage4Title, setTempPage4Title] = useState(page4Title);
  const [tempPage4Sub, setTempPage4Sub] = useState(page4Sub);
  const [tempMemories, setTempMemories] = useState(() => memories);

  const [tempPage5Title, setTempPage5Title] = useState(page5Title);
  const [tempPage5Sub, setTempPage5Sub] = useState(page5Sub);
  const [tempVideos, setTempVideos] = useState(() => videos);

  const [tempFinalHeading, setTempFinalHeading] = useState(finalHeading);
  const [tempFinalTitle, setTempFinalTitle] = useState(finalTitle);
  const [tempFinalSub, setTempFinalSub] = useState(finalSub);
  const [tempFinalCardText, setTempFinalCardText] = useState(finalCardText);

  const [tempAudioMode, setTempAudioMode] = useState(audioMode);
  const [tempCustomAudioUrl, setTempCustomAudioUrl] = useState(customAudioUrl);

  const [activeSettingsTab, setActiveSettingsTab] = useState<'basic' | 'letter' | 'memories' | 'videos' | 'audio'>('basic');

  // Typewriter effect state for Page 2
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterFinished, setTypewriterFinished] = useState(false);

  // Typewriter effect state for Page 3 (Special Letter)
  const [letterTypedText, setLetterTypedText] = useState('');
  const [letterTypedFinished, setLetterTypedFinished] = useState(false);

  // Lightbox memory state for Page 4
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lovedMemories, setLovedMemories] = useState<Record<string, boolean>>({});

  // Video state for Page 5
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoAmbientGlow, setVideoAmbientGlow] = useState(true);

  // Auto trigger special screen indicators
  const [fireworksActive, setFireworksActive] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [heartsActive, setHeartsActive] = useState(false);

  // Synchronize dynamic ambient effects based on current page
  useEffect(() => {
    if (currentPage === PageIndex.Intro) {
      setFireworksActive(true);
      setBalloonsActive(false);
      setHeartsActive(false);
    } else if (currentPage === PageIndex.Birthday) {
      setFireworksActive(false);
      setBalloonsActive(true);
      setHeartsActive(false);
      // Trigger typewriter reset
      setTypewriterText('');
      setTypewriterFinished(false);
    } else if (currentPage === PageIndex.Letter) {
      setFireworksActive(false);
      setBalloonsActive(false);
      setHeartsActive(true);
      // Trigger letter typing reset
      setLetterTypedText('');
      setLetterTypedFinished(false);
    } else if (currentPage === PageIndex.Memories) {
      setFireworksActive(false);
      setBalloonsActive(false);
      setHeartsActive(false);
    } else if (currentPage === PageIndex.Video) {
      setFireworksActive(false);
      setBalloonsActive(false);
      setHeartsActive(false);
    } else if (currentPage === PageIndex.Final) {
      setFireworksActive(true);
      setBalloonsActive(true);
      setHeartsActive(true);
    }
  }, [currentPage]);

  // Page 2 Typewriter Logic
  useEffect(() => {
    if (currentPage !== PageIndex.Birthday) return;
    
    let index = 0;
    setTypewriterText('');
    setTypewriterFinished(false);

    const interval = setInterval(() => {
      if (index < typewriterGreeting.length) {
        setTypewriterText((prev) => prev + typewriterGreeting.charAt(index));
        index++;
      } else {
        setTypewriterFinished(true);
        clearInterval(interval);
      }
    }, 45); // highly readable speed

    return () => clearInterval(interval);
  }, [currentPage, typewriterGreeting]);

  // Page 3 Love Letter Typewriter Logic
  useEffect(() => {
    if (currentPage !== PageIndex.Letter) return;

    let index = 0;
    setLetterTypedText('');
    setLetterTypedFinished(false);

    const interval = setInterval(() => {
      if (index < customLetter.length) {
        setLetterTypedText((prev) => prev + customLetter.charAt(index));
        index++;
      } else {
        setLetterTypedFinished(true);
        clearInterval(interval);
      }
    }, 25); // slightly faster for the long letter

    return () => clearInterval(interval);
  }, [currentPage, customLetter]);

  // Handle saving of personalized configuration
  const handleSaveConfig = () => {
    setBirthdayPerson(tempPerson);
    setSenderName(tempSender);
    setCustomLetter(tempLetter);
    localStorage.setItem('bday_person', tempPerson);
    localStorage.setItem('bday_sender', tempSender);
    localStorage.setItem('bday_letter', tempLetter);

    setIntroGreeting(tempIntroGreeting);
    setIntroTitle(tempIntroTitle);
    setIntroSub(tempIntroSub);
    setIntroBtn(tempIntroBtn);
    localStorage.setItem('bday_intro_greeting', tempIntroGreeting);
    localStorage.setItem('bday_intro_title', tempIntroTitle);
    localStorage.setItem('bday_intro_sub', tempIntroSub);
    localStorage.setItem('bday_intro_btn', tempIntroBtn);

    setPage2Title(tempPage2Title);
    setTypewriterGreeting(tempTypewriterGreeting);
    localStorage.setItem('bday_page2_title', tempPage2Title);
    localStorage.setItem('bday_typewriter_greeting', tempTypewriterGreeting);

    setPage3Title(tempPage3Title);
    localStorage.setItem('bday_page3_title', tempPage3Title);

    setPage4Title(tempPage4Title);
    setPage4Sub(tempPage4Sub);
    setMemories(tempMemories);
    localStorage.setItem('bday_page4_title', tempPage4Title);
    localStorage.setItem('bday_page4_sub', tempPage4Sub);
    localStorage.setItem('bday_memories', JSON.stringify(tempMemories));

    setPage5Title(tempPage5Title);
    setPage5Sub(tempPage5Sub);
    setVideos(tempVideos);
    localStorage.setItem('bday_page5_title', tempPage5Title);
    localStorage.setItem('bday_page5_sub', tempPage5Sub);
    localStorage.setItem('bday_videos', JSON.stringify(tempVideos));

    setFinalHeading(tempFinalHeading);
    setFinalTitle(tempFinalTitle);
    setFinalSub(tempFinalSub);
    setFinalCardText(tempFinalCardText);
    localStorage.setItem('bday_final_heading', tempFinalHeading);
    localStorage.setItem('bday_final_title', tempFinalTitle);
    localStorage.setItem('bday_final_sub', tempFinalSub);
    localStorage.setItem('bday_final_card_text', tempFinalCardText);

    setAudioMode(tempAudioMode);
    setCustomAudioUrl(tempCustomAudioUrl);
    localStorage.setItem('bday_audio_mode', tempAudioMode);
    localStorage.setItem('bday_custom_audio_url', tempCustomAudioUrl);

    setIsEditingNames(false);

    // Re-trigger typewriter displays if currently on those pages
    if (currentPage === PageIndex.Birthday) {
      setTypewriterText('');
      setTypewriterFinished(false);
    }
    if (currentPage === PageIndex.Letter) {
      setLetterTypedText('');
      setLetterTypedFinished(false);
    }
  };

  const handleStartSurprise = () => {
    // Enable background audio playback context
    setIsPlayingMusic(true);
    setCurrentPage(PageIndex.Birthday);
  };

  const navigateNext = () => {
    if (currentPage < PageIndex.Final) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const navigatePrev = () => {
    if (currentPage > PageIndex.Intro) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleToggleLoveMemory = (id: string) => {
    setLovedMemories((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleResetAll = () => {
    setCurrentPage(PageIndex.Intro);
    setIsPlayingMusic(false);
  };

  // Skip typewriter helper
  const skipGreetingTypewriter = () => {
    setTypewriterText(typewriterGreeting);
    setTypewriterFinished(true);
  };

  const skipLetterTypewriter = () => {
    setLetterTypedText(customLetter);
    setLetterTypedFinished(true);
  };

  return (
    <div id="surprise-app-root" className="relative min-h-screen w-full bg-[#FFF0F5] font-sans text-[#4A154B] overflow-x-hidden flex flex-col justify-between">
      
      {/* Absolute Ambient Background Pattern & Blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#dca4d3_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      <div className="absolute top-10 left-10 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-44 h-44 bg-purple-300/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none z-0 animate-bounce [animation-duration:8s]" />

      {/* Absolute Ambient Background Particle Controllers */}
      <Fireworks active={fireworksActive} intensity={currentPage === PageIndex.Final ? 3 : 1.5} />
      <Balloons active={balloonsActive} count={currentPage === PageIndex.Final ? 20 : 12} />
      <Hearts active={heartsActive} count={16} />

      {/* Persistent Floating Music Player Controller widget */}
      <AudioPlayer 
        isPlaying={isPlayingMusic} 
        setIsPlaying={setIsPlayingMusic} 
        audioMode={audioMode}
        customAudioUrl={customAudioUrl}
      />

      {/* Top Navigation / Personalization Header */}
      <header className="w-full max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between border-b border-pink-200/60 bg-white/40 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-600 fill-pink-500 animate-pulse" size={18} />
          <span className="font-cursive text-lg tracking-wider bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent">
            {birthdayPerson}'s Special Day
          </span>
        </div>

        {/* Edit Surprises button to open direct configuration modal */}
        <button
          onClick={() => {
            setTempPerson(birthdayPerson);
            setTempSender(senderName);
            setTempLetter(customLetter);
            setTempIntroGreeting(introGreeting);
            setTempIntroTitle(introTitle);
            setTempIntroSub(introSub);
            setTempIntroBtn(introBtn);
            setTempPage2Title(page2Title);
            setTempTypewriterGreeting(typewriterGreeting);
            setTempPage3Title(page3Title);
            setTempPage4Title(page4Title);
            setTempPage4Sub(page4Sub);
            setTempMemories(memories.map(m => ({ ...m })));
            setTempPage5Title(page5Title);
            setTempPage5Sub(page5Sub);
            setTempVideos(videos.map(v => ({ ...v })));
            setTempFinalHeading(finalHeading);
            setTempFinalTitle(finalTitle);
            setTempFinalSub(finalSub);
            setTempFinalCardText(finalCardText);
            setTempAudioMode(audioMode);
            setTempCustomAudioUrl(customAudioUrl);
            setActiveSettingsTab('basic');
            setIsEditingNames(true);
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-xs font-bold text-pink-700 hover:bg-pink-200 hover:border-pink-400 shadow-sm transition-all cursor-pointer"
        >
          <Edit size={12} />
          <span>Edit Surprise Info ⚙️</span>
        </button>
      </header>

      {/* Main Experience Body (Handles Section Layout Switching with Transitions) */}
      <main className="flex-grow flex items-center justify-center w-full max-w-4xl mx-auto px-4 py-6 md:py-10 z-30">
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* PAGE 1: GRAND INTRO                                       */}
          {/* ========================================================= */}
          {currentPage === PageIndex.Intro && (
            <motion.div
              key="intro-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center text-center px-4"
            >
              <div className="relative mb-6">
                {/* Glowing pink background blur */}
                <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-3xl scale-125 pointer-events-none" />
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block text-glow-pink font-cursive text-4xl sm:text-6xl text-pink-600 tracking-widest animate-bounce mb-2"
                >
                  {introGreeting}
                </motion.span>
              </div>

              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-serif text-3xl sm:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent tracking-tight max-w-2xl mb-6 leading-tight"
              >
                {introTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-purple-950 font-medium text-sm sm:text-base max-w-md mb-8 leading-relaxed bg-white/70 p-5 rounded-2xl border border-pink-200/50 backdrop-blur-md shadow-lg"
              >
                {introSub}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartSurprise}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-extrabold text-white shadow-[0_10px_30px_rgba(219,39,119,0.35)] hover:shadow-[0_15px_35px_rgba(219,39,119,0.5)] transition-all cursor-pointer overflow-hidden text-base md:text-lg"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 duration-300" />
                <Gift className="animate-bounce" size={20} />
                <span>{introBtn}</span>
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 2: HAPPY BIRTHDAY ANIMATION & CAKE                   */}
          {/* ========================================================= */}
          {currentPage === PageIndex.Birthday && (
            <motion.div
              key="birthday-page"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="w-full flex flex-col items-center"
            >
              {/* Floating banner title with glowing name */}
              <div className="text-center mb-4">
                <h2 className="font-cursive text-3xl sm:text-5xl text-pink-600 mb-2">
                  {page2Title}
                </h2>
                <div className="inline-block px-8 py-2.5 bg-white rounded-full text-2xl sm:text-4xl font-extrabold text-purple-700 shadow-md border border-pink-100 animate-pulse">
                  {birthdayPerson}
                </div>
              </div>

              {/* Interactive Cake Component */}
              <Cake />

              {/* Typewriter Greeting text with pastel translucent bubble */}
              <div className="w-full max-w-xl mt-4 p-5 rounded-2xl bg-white/70 border border-pink-200/60 backdrop-blur-md shadow-xl text-purple-950 font-medium">
                <p className="text-xs font-mono uppercase tracking-widest text-pink-600 mb-2 flex items-center gap-1.5">
                  <Sparkles size={12} className="animate-spin-slow" /> Sweet Message
                </p>
                <div className="text-sm md:text-base leading-relaxed font-sans min-h-[96px] relative">
                  <span>{typewriterText}</span>
                  {!typewriterFinished && (
                    <span className="inline-block w-2 h-4 ml-1 bg-pink-500 animate-pulse" />
                  )}
                </div>

                {/* Skip button for rapid reading */}
                {!typewriterFinished && (
                  <button
                    onClick={skipGreetingTypewriter}
                    className="mt-3 text-xs text-pink-600 hover:text-pink-800 font-bold underline transition-colors cursor-pointer"
                  >
                    Skip typing... ⏩
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 3: SPECIAL LETTER                                    */}
          {/* ========================================================= */}
          {currentPage === PageIndex.Letter && (
            <motion.div
              key="letter-page"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-6">
                <span className="text-xs uppercase font-mono tracking-widest bg-pink-100 border border-pink-300 text-pink-700 px-3 py-1.5 rounded-full font-bold">
                  💌 Section 3: A Written Note
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B] mt-3">
                  {page3Title}
                </h2>
              </div>

              {/* Gorgeous glassmorphic letter card */}
              <div className="relative w-full max-w-2xl bg-white/60 border border-white/80 shadow-2xl rounded-[32px] p-6 sm:p-10 backdrop-blur-md overflow-hidden">
                {/* Decorative retro stamp */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-pink-400 rounded-lg flex flex-col items-center justify-center rotate-12 text-pink-500 uppercase font-mono text-[9px] pointer-events-none select-none">
                  <Heart size={16} className="fill-pink-500/20 mb-1 text-pink-500" />
                  <span>BDAY SURPRISE</span>
                </div>

                {/* Handwritten-looking letter contents */}
                <div className="font-serif text-base sm:text-lg leading-relaxed text-purple-950 whitespace-pre-line text-left max-h-[350px] overflow-y-auto pr-2 font-medium">
                  {letterTypedText}
                  {!letterTypedFinished && (
                    <span className="inline-block w-1.5 h-5 ml-1 bg-pink-500 animate-pulse" />
                  )}
                </div>

                {/* Skip letter typewriter */}
                {!letterTypedFinished && (
                  <button
                    onClick={skipLetterTypewriter}
                    className="mt-6 text-xs text-pink-600 hover:text-pink-800 font-bold underline transition-colors cursor-pointer"
                  >
                    Skip to end of letter 📝
                  </button>
                )}

                {/* Letter Signature Block */}
                {letterTypedFinished && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 pt-6 border-t border-pink-200/60 flex flex-col items-end"
                  >
                    <span className="text-xs font-mono uppercase text-pink-600/70">With infinite love,</span>
                    <span className="font-cursive text-2xl text-pink-600 font-bold mt-1">{senderName}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 4: OUR MEMORIES GALLERY                              */}
          {/* ========================================================= */}
          {currentPage === PageIndex.Memories && (
            <motion.div
              key="memories-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-6">
                <span className="text-xs uppercase font-mono tracking-widest bg-pink-100 border border-pink-300 text-pink-700 px-3 py-1.5 rounded-full font-bold">
                  📸 Section 4: Our Moments
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B] mt-3">
                  {page4Title}
                </h2>
                <p className="text-xs text-purple-800 mt-1.5 font-medium">{page4Sub}</p>
              </div>

              {/* Grid of Polaroid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-4 px-2">
                {memories.map((mem, index) => {
                  const isLoved = lovedMemories[mem.id];
                  return (
                    <motion.div
                      key={mem.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                      onClick={() => setLightboxIndex(index)}
                      className="bg-white p-4 pb-6 rounded-sm shadow-xl cursor-pointer text-slate-900 border border-slate-200 transform hover:shadow-2xl transition-all"
                    >
                      {/* Image Container with Custom refererPolicy */}
                      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden rounded-xs mb-3">
                        <img
                          src={mem.url || undefined}
                          alt={mem.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleLoveMemory(mem.id);
                          }}
                          className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-pink-500 shadow-md hover:scale-110 active:scale-95 transition-all"
                        >
                          <Heart size={14} className={isLoved ? 'fill-pink-500' : ''} />
                        </button>
                      </div>

                      {/* Polaroid Title & Story caption snippet */}
                      <h4 className="font-serif font-bold text-sm tracking-tight text-slate-900 mb-1 truncate">
                        {mem.title}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-500 flex justify-between">
                        <span>{mem.date}</span>
                        <span>Read story ➔</span>
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 5: SPECIAL ATMOSPHERIC LOOPS / CINEMATIC              */}
          {/* ========================================================= */}
          {currentPage === PageIndex.Video && (
            <motion.div
              key="video-page"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-6">
                <span className="text-xs uppercase font-mono tracking-widest bg-pink-100 border border-pink-300 text-pink-700 px-3 py-1.5 rounded-full font-bold">
                  🎥 Section 5: Cinematic Serenade
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A154B] mt-3">
                  {page5Title}
                </h2>
                <p className="text-xs text-purple-800 mt-1.5 font-medium">{page5Sub}</p>
              </div>

              {/* Theater Ambient Screen Lighting effect behind player */}
              <div className="relative w-full max-w-2xl bg-white/60 rounded-3xl overflow-hidden border border-pink-200/60 shadow-2xl backdrop-blur-md p-1.5">
                {videoAmbientGlow && (
                  <div className="absolute inset-0 bg-pink-400/20 blur-3xl pointer-events-none -z-10 animate-pulse" />
                )}

                {/* HTML5 Native Loop Player with referrer policy */}
                <div className="aspect-video w-full bg-slate-900 relative rounded-t-[22px] overflow-hidden">
                  <video
                    key={videos[currentVideoIndex]?.url || undefined}
                    src={videos[currentVideoIndex]?.url || undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Absolute Glowing Video Tag */}
                  <span className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-[10px] font-mono text-pink-400 px-2 py-1 rounded-full uppercase border border-pink-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Cozy Stream
                  </span>
                </div>

                {/* High contrast overlay containing title & video caption descriptions */}
                <div className="p-5 bg-white/90 rounded-b-2xl text-[#4A154B]">
                  <h3 className="font-serif font-bold text-lg text-purple-900 mb-1">
                    {videos[currentVideoIndex]?.title || ''}
                  </h3>
                  <p className="text-sm text-purple-950 leading-relaxed italic font-medium">
                    "{videos[currentVideoIndex]?.caption || ''}"
                  </p>
                  <p className="text-xs text-purple-800 mt-2 font-sans font-medium">
                    {videos[currentVideoIndex]?.description || ''}
                  </p>

                  {/* Slider controls to toggle between videos */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-pink-100">
                    <button
                      onClick={() => setVideoAmbientGlow(!videoAmbientGlow)}
                      className={`text-[10px] px-3 py-1.5 rounded-full border transition-all cursor-pointer ${videoAmbientGlow ? 'bg-pink-100 border-pink-300 text-pink-700 font-bold' : 'bg-slate-100 border-slate-300 text-slate-500'}`}
                    >
                      Theater Glow: {videoAmbientGlow ? 'ON 🌟' : 'OFF'}
                    </button>

                    <div className="flex gap-2">
                      {videos.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => setCurrentVideoIndex(idx)}
                          className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${currentVideoIndex === idx ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'bg-pink-5 border border-pink-200 text-pink-700 hover:bg-pink-100'}`}
                        >
                          Scene {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 6: FINAL SURPRISE & 3D GIFT BOX                      */}
          {/* ========================================================= */}
          {currentPage === PageIndex.Final && (
            <motion.div
              key="final-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-3xl scale-125 pointer-events-none" />
                <motion.span
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="inline-block text-glow-pink font-cursive text-5xl sm:text-6xl text-pink-600 mb-2"
                >
                  {finalHeading}
                </motion.span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight mb-2">
                {finalTitle}
              </h2>
              <h3 className="font-cursive text-2xl sm:text-3xl text-pink-600 tracking-wide mb-6">
                {finalSub.replace('{name}', birthdayPerson).replace('{birthdayPerson}', birthdayPerson)}
              </h3>

              {/* Magical Gift Box with virtual voucher rewards */}
              <GiftBox />

              {/* Hearty Thank You card */}
              <div className="w-full max-w-md mt-6 p-4 rounded-2xl bg-white/60 border border-pink-200/50 backdrop-blur-md text-xs text-purple-900 font-medium shadow-md">
                <p>{finalCardText}</p>
              </div>

              {/* Replay/Restart Surprise button */}
              <button
                onClick={handleResetAll}
                className="mt-8 flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-pink-300 text-xs font-bold text-pink-700 hover:bg-pink-50 transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Replay from Start</span>
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ========================================================= */}
      {/* FLOATING CONTROLS & STEPPER DOCK                          */}
      {/* ========================================================= */}
      {currentPage > PageIndex.Intro && (
        <footer className="w-full max-w-3xl mx-auto px-4 py-4 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/75 backdrop-blur-md rounded-2xl border border-pink-200/80 mb-4 z-40 shadow-lg">
          
          {/* Stepper progress nodes */}
          <div className="flex items-center gap-2">
            {Object.values(PageIndex)
              .filter((v) => typeof v === 'number')
              .map((num) => {
                const stepNum = num as number;
                return (
                  <button
                    key={stepNum}
                    onClick={() => setCurrentPage(stepNum)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${currentPage === stepNum ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-600 shadow-xs' : 'w-2.5 bg-pink-200 hover:bg-pink-300'}`}
                    title={`Go to slide ${stepNum}`}
                  />
                );
              })}
          </div>

          {/* Previous & Next action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={navigatePrev}
              disabled={currentPage === PageIndex.Intro}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-pink-200 font-bold text-xs text-pink-700 hover:bg-pink-50 disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <button
              onClick={navigateNext}
              disabled={currentPage === PageIndex.Final}
              className="flex items-center gap-1 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-extrabold text-xs text-white shadow-md shadow-pink-500/10 hover:shadow-pink-500/25 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span>Next Surprise</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </footer>
      )}

      {/* ========================================================= */}
      {/* EDIT CONFIGURATION MODAL DIALOG                           */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isEditingNames && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white border border-pink-200 rounded-[32px] p-6 shadow-2xl text-[#4A154B] relative my-8"
            >
              <button
                onClick={() => setIsEditingNames(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer border border-pink-200"
              >
                <X size={16} />
              </button>

              <h3 className="font-serif font-bold text-xl text-pink-600 mb-2 flex items-center gap-2">
                <span>⚙️</span> Personalize Your Website!
              </h3>
              <p className="text-xs text-purple-900 mb-4 font-medium">
                You can customize every single text, title, message, and also add your own personal pictures and video clips!
              </p>

              {/* Tab Navigation buttons */}
              <div className="flex border-b border-pink-100 mb-4 overflow-x-auto gap-1 pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveSettingsTab('basic')}
                  className={`text-xs px-3 py-2 rounded-lg font-bold whitespace-nowrap cursor-pointer transition-all ${activeSettingsTab === 'basic' ? 'bg-pink-100 text-pink-700' : 'text-purple-900 hover:bg-pink-50/50'}`}
                >
                  📝 Basic & Pages 1-2
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsTab('letter')}
                  className={`text-xs px-3 py-2 rounded-lg font-bold whitespace-nowrap cursor-pointer transition-all ${activeSettingsTab === 'letter' ? 'bg-pink-100 text-pink-700' : 'text-purple-900 hover:bg-pink-50/50'}`}
                >
                  💌 Slide 3 Letter
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsTab('memories')}
                  className={`text-xs px-3 py-2 rounded-lg font-bold whitespace-nowrap cursor-pointer transition-all ${activeSettingsTab === 'memories' ? 'bg-pink-100 text-pink-700' : 'text-purple-900 hover:bg-pink-50/50'}`}
                >
                  📸 Slide 4 Pics (4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsTab('videos')}
                  className={`text-xs px-3 py-2 rounded-lg font-bold whitespace-nowrap cursor-pointer transition-all ${activeSettingsTab === 'videos' ? 'bg-pink-100 text-pink-700' : 'text-purple-900 hover:bg-pink-50/50'}`}
                >
                  🎥 Slide 5 Videos (4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSettingsTab('audio')}
                  className={`text-xs px-3 py-2 rounded-lg font-bold whitespace-nowrap cursor-pointer transition-all ${activeSettingsTab === 'audio' ? 'bg-pink-100 text-pink-700' : 'text-purple-900 hover:bg-pink-50/50'}`}
                >
                  🎵 Music Config
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="max-h-[380px] overflow-y-auto pr-2 flex flex-col gap-4 text-left scrollbar-thin">
                
                {/* TAB 1: BASIC & PAGES 1-2 */}
                {activeSettingsTab === 'basic' && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Birthday Person Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-purple-900 uppercase flex items-center gap-1">
                          <User size={12} className="text-pink-500" /> Birthday Person Name:
                        </label>
                        <input
                          type="text"
                          value={tempPerson}
                          onChange={(e) => setTempPerson(e.target.value)}
                          className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] font-medium"
                          maxLength={30}
                        />
                      </div>
                      {/* Sender Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-purple-900 uppercase flex items-center gap-1">
                          <Heart size={12} className="text-pink-500" /> Sender Name (Your Name):
                        </label>
                        <input
                          type="text"
                          value={tempSender}
                          onChange={(e) => setTempSender(e.target.value)}
                          className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] font-medium"
                          maxLength={35}
                        />
                      </div>
                    </div>

                    <div className="border-t border-dashed border-pink-200 pt-3">
                      <h4 className="text-xs font-bold text-pink-600 uppercase mb-2">🎈 Slide 1 (Grand Intro) texts:</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Intro Greeting (Small Bubble):</label>
                          <input
                            type="text"
                            value={tempIntroGreeting}
                            onChange={(e) => setTempIntroGreeting(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Intro Main Title Heading:</label>
                          <input
                            type="text"
                            value={tempIntroTitle}
                            onChange={(e) => setTempIntroTitle(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Intro Sub-description Paragraph:</label>
                          <textarea
                            value={tempIntroSub}
                            onChange={(e) => setTempIntroSub(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] h-16 resize-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Intro Button Text:</label>
                          <input
                            type="text"
                            value={tempIntroBtn}
                            onChange={(e) => setTempIntroBtn(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-pink-200 pt-3">
                      <h4 className="text-xs font-bold text-pink-600 uppercase mb-2">🍰 Slide 2 (Cake Screen) texts:</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Slide 2 Title:</label>
                          <input
                            type="text"
                            value={tempPage2Title}
                            onChange={(e) => setTempPage2Title(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Typewriter Greeting Sweet Message:</label>
                          <textarea
                            value={tempTypewriterGreeting}
                            onChange={(e) => setTempTypewriterGreeting(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] h-20 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-pink-200 pt-3">
                      <h4 className="text-xs font-bold text-pink-600 uppercase mb-2">🎁 Slide 6 (Final Screen) texts:</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Hooray Greeting Header:</label>
                          <input
                            type="text"
                            value={tempFinalHeading}
                            onChange={(e) => setTempFinalHeading(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Main Hearty Heading:</label>
                          <input
                            type="text"
                            value={tempFinalTitle}
                            onChange={(e) => setTempFinalTitle(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Once Again Sub-title (Use {"{name}"} for dynamic replacement):</label>
                          <input
                            type="text"
                            value={tempFinalSub}
                            onChange={(e) => setTempFinalSub(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Bottom locked-with-love footer card text:</label>
                          <textarea
                            value={tempFinalCardText}
                            onChange={(e) => setTempFinalCardText(e.target.value)}
                            className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] h-16 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: SPECIAL LOVE LETTER */}
                {activeSettingsTab === 'letter' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-purple-900 uppercase">💌 Special Letter Header Title:</label>
                      <input
                        type="text"
                        value={tempPage3Title}
                        onChange={(e) => setTempPage3Title(e.target.value)}
                        className="p-2.5 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] font-bold"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-purple-900 uppercase">📝 Love Letter Message Content (Page 3):</label>
                      <span className="text-[10px] text-pink-600 italic">Write an emotional letter that shows how deeply you care for them. Break lines normally using Enter.</span>
                      <textarea
                        value={tempLetter}
                        onChange={(e) => setTempLetter(e.target.value)}
                        placeholder="Write a custom emotional letter..."
                        className="w-full h-64 p-3 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B] font-medium focus:outline-none resize-none"
                        maxLength={1500}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: SLIDE 4 MEMORIES (4 PHOTOS) */}
                {activeSettingsTab === 'memories' && (
                  <div className="flex flex-col gap-5">
                    <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-200 text-[11px] text-purple-950 flex flex-col gap-1">
                      <span className="font-bold">💡 How to add your own personal pictures:</span>
                      <span>1. **Upload via File Explorer:** Drag & drop your image files (JPG/PNG) into the `/src/assets/images/` folder inside the file tree on the left sidebar. Then, write its local path below e.g. `/src/assets/images/my_photo.jpg`.</span>
                      <span>2. **Use Online URLs:** Upload your photos to any hosting site (Imgur, PostImages, Discord, etc.) and paste the direct image link (ending in `.jpg`, `.png`, or `.webp`) in the Picture URL field!</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-purple-900 uppercase">📸 Gallery Section Title & Subtitle:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={tempPage4Title}
                          onChange={(e) => setTempPage4Title(e.target.value)}
                          placeholder="Gallery Title"
                          className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                        />
                        <input
                          type="text"
                          value={tempPage4Sub}
                          onChange={(e) => setTempPage4Sub(e.target.value)}
                          placeholder="Gallery Subtitle"
                          className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                        />
                      </div>
                    </div>

                    {tempMemories.map((mem, index) => (
                      <div key={mem.id} className="p-4 bg-white border border-pink-100 rounded-2xl shadow-sm flex flex-col gap-3">
                        <span className="text-xs font-bold text-pink-600">Polaroid Photo #{index + 1}</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-semibold text-purple-950 uppercase">Polaroid Title:</label>
                            <input
                              type="text"
                              value={mem.title}
                              onChange={(e) => {
                                const updated = [...tempMemories];
                                updated[index].title = e.target.value;
                                setTempMemories(updated);
                              }}
                              className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B]"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-semibold text-purple-950 uppercase">Date/Moment Name:</label>
                            <input
                              type="text"
                              value={mem.date}
                              onChange={(e) => {
                                const updated = [...tempMemories];
                                updated[index].date = e.target.value;
                                setTempMemories(updated);
                              }}
                              className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B]"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Picture URL or Local File Path:</label>
                          <input
                            type="text"
                            value={mem.url}
                            onChange={(e) => {
                              const updated = [...tempMemories];
                              updated[index].url = e.target.value;
                              updated[index].thumbnailUrl = e.target.value; // sync
                              setTempMemories(updated);
                            }}
                            className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B] font-mono"
                            placeholder="/src/assets/images/myphoto.jpg or https://example.com/photo.jpg"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Memory Story Description:</label>
                          <textarea
                            value={mem.description}
                            onChange={(e) => {
                              const updated = [...tempMemories];
                              updated[index].description = e.target.value;
                              setTempMemories(updated);
                            }}
                            className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B] h-14 resize-none"
                            placeholder="Write the special story of this picture..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: SLIDE 5 VIDEOS (4 CLIPS) */}
                {activeSettingsTab === 'videos' && (
                  <div className="flex flex-col gap-5">
                    <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-200 text-[11px] text-purple-950 flex flex-col gap-1">
                      <span className="font-bold">💡 How to add your own personal video clips:</span>
                      <span>1. **Upload via File Explorer:** Drag your video clips (MP4/WebM) into `/src/assets/` or `/public/`. Then, write its local path e.g. `/myvideo.mp4` or `/src/assets/myvideo.mp4`.</span>
                      <span>2. **Use Online URLs:** Paste any public link of a direct MP4 file. You can upload video files to web storage (like Discord, Dropbox, or any fileshare) and copy the direct download link.</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-purple-900 uppercase">🎥 Cinematic Section Title & Subtitle:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={tempPage5Title}
                          onChange={(e) => setTempPage5Title(e.target.value)}
                          placeholder="Cinematic Player Title"
                          className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                        />
                        <input
                          type="text"
                          value={tempPage5Sub}
                          onChange={(e) => setTempPage5Sub(e.target.value)}
                          placeholder="Cinematic Player Subtitle"
                          className="p-2 bg-pink-50/30 border border-pink-200 rounded-xl text-xs text-[#4A154B]"
                        />
                      </div>
                    </div>

                    {tempVideos.map((vid, index) => (
                      <div key={vid.id} className="p-4 bg-white border border-pink-100 rounded-2xl shadow-sm flex flex-col gap-3">
                        <span className="text-xs font-bold text-pink-600">Video Clip #{index + 1}</span>
                        
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Video Title:</label>
                          <input
                            type="text"
                            value={vid.title}
                            onChange={(e) => {
                              const updated = [...tempVideos];
                              updated[index].title = e.target.value;
                              setTempVideos(updated);
                            }}
                            className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Video URL or Local MP4 Path:</label>
                          <input
                            type="text"
                            value={vid.url}
                            onChange={(e) => {
                              const updated = [...tempVideos];
                              updated[index].url = e.target.value;
                              setTempVideos(updated);
                            }}
                            className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B] font-mono"
                            placeholder="e.g. /myvideo.mp4 or https://assets.mixkit.co/...mp4"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Short Aesthetic Caption Overlay:</label>
                          <input
                            type="text"
                            value={vid.caption}
                            onChange={(e) => {
                              const updated = [...tempVideos];
                              updated[index].caption = e.target.value;
                              setTempVideos(updated);
                            }}
                            className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B] italic"
                            placeholder="e.g. You are my sunrise and sunset... ❤️"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Extended Scene Description:</label>
                          <textarea
                            value={vid.description}
                            onChange={(e) => {
                              const updated = [...tempVideos];
                              updated[index].description = e.target.value;
                              setTempVideos(updated);
                            }}
                            className="p-2 bg-pink-50/20 border border-pink-100 rounded-xl text-xs text-[#4A154B] h-14 resize-none"
                            placeholder="Describe this atmosphere or special trip video clip..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 5: AUDIO & BACKGROUND MUSIC CONFIGURATION */}
                {activeSettingsTab === 'audio' && (
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-pink-600 uppercase mb-2">🎵 Background Music & Happy Birthday Tunes:</h4>
                    
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-semibold text-purple-900 uppercase">Select Music Playback Mode:</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setTempAudioMode('synth')}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${tempAudioMode === 'synth' ? 'bg-pink-100 border-pink-400 text-pink-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                        >
                          <Music size={16} />
                          <span>Dreamy Synthesizer</span>
                          <span className="text-[9px] font-normal text-slate-500">Live generated music box</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTempAudioMode('custom_mp3')}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${tempAudioMode === 'custom_mp3' ? 'bg-pink-100 border-pink-400 text-pink-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                        >
                          <Heart size={16} />
                          <span>Happy Birthday MP3</span>
                          <span className="text-[9px] font-normal text-slate-500">Play sweet piano cover audio</span>
                        </button>
                      </div>
                    </div>

                    {tempAudioMode === 'custom_mp3' && (
                      <div className="flex flex-col gap-3 mt-2 p-3 bg-pink-50/30 border border-pink-100 rounded-2xl">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-semibold text-purple-950 uppercase">Custom MP3 Audio URL / Path:</label>
                          <input
                            type="text"
                            value={tempCustomAudioUrl}
                            onChange={(e) => setTempCustomAudioUrl(e.target.value)}
                            placeholder="Leave empty for beautiful romantic Happy Birthday piano cover!"
                            className="p-2 bg-white border border-pink-200 rounded-xl text-xs text-[#4A154B] font-mono"
                          />
                        </div>
                        <p className="text-[10px] text-purple-950 leading-relaxed italic">
                          💡 **Tip:** If you leave this field blank, the website will play a **gorgeous, romantic piano cover of Happy Birthday** by default! You can also paste any direct MP3 web link or place your custom MP3 inside `/public/` and write its name here (like `/bday_song.mp3`).
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal footer controls */}
              <div className="flex gap-2 justify-end mt-5 pt-4 border-t border-pink-100">
                <button
                  type="button"
                  onClick={() => setIsEditingNames(false)}
                  className="text-xs px-4 py-2 rounded-xl border border-pink-200 text-pink-700 hover:bg-pink-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="text-xs px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg shadow-pink-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={14} /> Save Surprise 💖
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* FULL-SCREEN LIGHTBOX OVERLAY                              */}
      {/* ========================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-xs">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-white/15 text-white hover:bg-slate-800 transition-colors z-50 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Previous slide trigger */}
            <button
              onClick={() => {
                setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : memories.length - 1));
              }}
              className="absolute left-4 p-2.5 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer z-40 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next slide trigger */}
            <button
              onClick={() => {
                setLightboxIndex((prev) => (prev !== null && prev < memories.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 p-2.5 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer z-40 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox content card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white border border-pink-200 rounded-[32px] overflow-hidden flex flex-col shadow-2xl text-[#4A154B]"
            >
              {/* Media viewer */}
              <div className="relative aspect-[4/3] w-full bg-pink-50/30">
                <img
                  src={memories[lightboxIndex]?.url || undefined}
                  alt={memories[lightboxIndex]?.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Memory Story details */}
              <div className="p-6 bg-white border-t border-pink-100 text-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-xl text-purple-900">
                    {memories[lightboxIndex].title}
                  </h3>
                  <span className="text-xs font-mono text-pink-700 font-bold bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                    {memories[lightboxIndex].date}
                  </span>
                </div>
                <p className="text-sm text-purple-950 leading-relaxed italic font-medium">
                  "{memories[lightboxIndex].description}"
                </p>

                {/* Double-Tap Love trigger */}
                <div className="mt-5 pt-4 border-t border-pink-100 flex justify-between items-center text-xs">
                  <button
                    onClick={() => handleToggleLoveMemory(memories[lightboxIndex!].id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 transition-all cursor-pointer font-bold animate-pulse"
                  >
                    <Heart size={14} className={lovedMemories[memories[lightboxIndex].id] ? 'fill-pink-500 text-pink-600' : 'text-pink-600'} />
                    <span>{lovedMemories[memories[lightboxIndex].id] ? 'I Love This Memory ❤️' : 'Love Memory'}</span>
                  </button>
                  <span className="text-purple-700 font-mono font-bold">
                    {lightboxIndex + 1} of {memories.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
