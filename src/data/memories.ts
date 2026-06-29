import { MemoryItem } from '../types';

export const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    type: 'image',
    url: '/src/assets/images/starry_memories_1782721041754.jpg',
    thumbnailUrl: '/src/assets/images/starry_memories_1782721041754.jpg',
    title: 'Starry Conversations 🌌',
    description: 'Remember the long conversations we shared under the starry sky, laughing, dreaming, and planning our beautiful future together. That remains one of my most cherished moments.',
    date: 'A Sweet Summer Night'
  },
  {
    id: 'mem-2',
    type: 'image',
    url: '/src/assets/images/fairylights_polaroid_1782721059783.jpg',
    thumbnailUrl: '/src/assets/images/fairylights_polaroid_1782721059783.jpg',
    title: 'Locked in Polaroids 📸',
    description: 'Capturing every genuine smile, silly face, and warm glance on film. Each photograph is a precious chapter in our story that I love revisiting over and over again.',
    date: 'Cozy Winter Evening'
  },
  {
    id: 'mem-3',
    type: 'image',
    url: '/src/assets/images/birthday_cake_glow_1782721022604.jpg',
    thumbnailUrl: '/src/assets/images/birthday_cake_glow_1782721022604.jpg',
    title: 'The Perfect Birthday 🎂',
    description: 'Celebrating you—the most wonderful, bright, and loving soul I have ever known. Being able to see your eyes light up as you blow out your candles is the best gift in the world.',
    date: 'Your Special Day'
  },
];

// Special romantic videos (using royalty-free beautiful lofi/cinematic backgrounds)
export const SPECIAL_VIDEOS = [
  {
    id: 'vid-1',
    title: 'Cozy Rainy Café Cozy Lofi Vibe ☕',
    description: 'A beautiful place that reminds me of our warm, cozy dates filled with hot cocoa and endless laughter.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-cup-with-a-heart-drawn-in-the-foam-43301-large.mp4',
    caption: 'Every sweet cup of coffee reminds me of the warmth you bring into my life. ❤️'
  },
  {
    id: 'vid-2',
    title: 'Sparkling Sea Sparkle & Sunset 🌊',
    description: 'A breathtaking golden sunset on the ocean that sparkles just like your beautiful eyes when you laugh.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-sunset-on-the-horizon-of-the-sea-11881-large.mp4',
    caption: 'You are my sunset, my sunrise, and my entire beautiful ocean of happiness. 🌅'
  }
];
