export enum PageIndex {
  Intro = 1,
  Birthday = 2,
  Letter = 3,
  Memories = 4,
  Video = 5,
  Final = 6
}

export interface MemoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  date?: string;
}

export interface FloatingElement {
  id: string;
  x: number; // percentage width 0 - 100
  y: number; // percentage height or starting height
  size: number; // size in px
  delay: number; // animation delay in seconds
  speed: number; // animation duration or upward speed
  color: string;
  emoji?: string;
}
