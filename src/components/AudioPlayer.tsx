import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioMode: 'synth' | 'custom_mp3';
  customAudioUrl: string;
}

export default function AudioPlayer({ isPlaying, setIsPlaying, audioMode, customAudioUrl }: AudioPlayerProps) {
  const [volume, setVolume] = useState(0.5);
  const [soundMode, setSoundMode] = useState<'music_box' | 'lofi_piano' | 'cosmic_bell'>('music_box');
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerIntervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const tempo = 80; // BPM
  const noteIndexRef = useRef<number>(0);
  
  // HTML5 audio ref for MP3 playback
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and sync HTML5 audio player
  useEffect(() => {
    if (audioMode === 'custom_mp3') {
      const url = customAudioUrl.trim() || "https://www.chosic.com/wp-content/uploads/2021/04/Happy-Birthday-To-You-Piano-Version.mp3";
      
      // Stop and clean up any old audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;
      
      if (isPlaying) {
        audio.play().catch(err => {
          console.log("Audio play failed, user interaction needed:", err);
          setIsPlaying(false);
        });
      }
    } else {
      // If we switched away from custom MP3, stop the audio player
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioMode, customAudioUrl]);

  // Sync isPlaying with HTML5 audio
  useEffect(() => {
    if (audioMode === 'custom_mp3' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioMode]);

  // Sync volume with HTML5 audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Romantic Birthday Melody Progression in G Major (Chords: G - C - D - Em)
  // Notes are MIDI values, mapped to frequency
  const chords = [
    [55, 59, 62, 67], // G maj (G3, B3, D4, G4)
    [48, 52, 55, 64], // C maj (C3, E3, G3, E4)
    [50, 54, 57, 62], // D maj (D3, F#3, A3, D4)
    [52, 55, 59, 67], // E min (E3, G3, B3, G4)
  ];

  // Soft birthday melody notes over the chords (G major scale)
  // Midi values of Happy Birthday: G G A G C B, G G A G D C, G G G(oct) E C B A...
  const melody = [
    55, 55, 57, 55, 60, 59, 0,
    55, 55, 57, 55, 62, 60, 0,
    55, 55, 67, 64, 60, 59, 57,
    65, 65, 64, 60, 62, 60, 0
  ];

  function midiToFreq(note: number): number {
    if (note === 0) return 0;
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  // Synthesize a note with a gorgeous soft physical modeling/music box envelope
  function playSynthNote(time: number, midiNote: number, type: typeof soundMode) {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    // Create master gain for individual note
    const oscGain = ctx.createGain();
    oscGain.connect(ctx.destination);
    
    // Setup synthesizer parameters based on mode
    if (type === 'music_box') {
      // Clean sine + tiny touch of high triangle, fast attack, slow exponential decay
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(midiToFreq(midiNote), time);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(midiToFreq(midiNote + 12) * 1.002, time); // slightly detuned octave
      
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      
      gain1.connect(oscGain);
      gain2.connect(oscGain);
      
      osc1.connect(gain1);
      osc2.connect(gain2);
      
      // Music box volume envelope
      oscGain.gain.setValueAtTime(0, time);
      oscGain.gain.linearRampToValueAtTime(volume * 0.18, time + 0.005);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);
      
      gain1.gain.setValueAtTime(0.8, time);
      gain2.gain.setValueAtTime(0.12, time); // soft bell undertone
      
      osc1.start(time);
      osc2.start(time);
      
      osc1.stop(time + 2.0);
      osc2.stop(time + 2.0);
    } else if (type === 'lofi_piano') {
      // Triangle + Sine, slightly filtered to sound warm and mellow
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(midiToFreq(midiNote), time);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);
      filter.frequency.exponentialRampToValueAtTime(200, time + 0.6);
      
      osc.connect(filter);
      filter.connect(oscGain);
      
      oscGain.gain.setValueAtTime(0, time);
      oscGain.gain.linearRampToValueAtTime(volume * 0.25, time + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.5);
      
      osc.start(time);
      osc.stop(time + 1.8);
    } else {
      // Cosmic bell: FM Synthesis (sine modulator modulating sine carrier)
      const carrier = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const modGain = ctx.createGain();
      
      carrier.type = 'sine';
      modulator.type = 'sine';
      
      const freq = midiToFreq(midiNote);
      carrier.frequency.setValueAtTime(freq, time);
      modulator.frequency.setValueAtTime(freq * 1.5, time); // harmonic ratio
      
      modGain.gain.setValueAtTime(freq * 0.8, time);
      modGain.gain.exponentialRampToValueAtTime(0.1, time + 0.8);
      
      modulator.connect(modGain);
      modGain.connect(carrier.frequency);
      
      carrier.connect(oscGain);
      
      oscGain.gain.setValueAtTime(0, time);
      oscGain.gain.linearRampToValueAtTime(volume * 0.12, time + 0.008);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 2.5);
      
      carrier.start(time);
      modulator.start(time);
      
      carrier.stop(time + 3.0);
      modulator.stop(time + 3.0);
    }
  }

  // Melodic scheduler to queue up arpeggios and soft notes
  useEffect(() => {
    if (!isPlaying || audioMode === 'custom_mp3') {
      if (schedulerIntervalRef.current) {
        window.clearInterval(schedulerIntervalRef.current);
        schedulerIntervalRef.current = null;
      }
      return;
    }

    // Initialize audio context lazily
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    nextNoteTimeRef.current = ctx.currentTime + 0.1;

    const scheduleNotes = () => {
      const lookahead = 0.2; // how far ahead to schedule (seconds)
      const secondsPerBeat = 60.0 / tempo;
      const stepDuration = secondsPerBeat / 2; // eighth notes

      while (nextNoteTimeRef.current < ctx.currentTime + lookahead) {
        const time = nextNoteTimeRef.current;
        const currentStep = noteIndexRef.current;
        
        // 1. Play Chord Arpeggios (soft backing rhythm)
        const chordIndex = Math.floor(currentStep / 8) % chords.length;
        const noteInChord = chords[chordIndex][currentStep % 4];
        
        if (currentStep % 2 === 0) {
          // Play a soft arpeggiated bass/mid note
          playSynthNote(time, noteInChord, soundMode);
        }

        // 2. Play Birthday Melody in the upper octave on top of chords
        const melodyStep = currentStep % melody.length;
        const melodyNote = melody[melodyStep];
        
        // Let's play the melody every 4 steps (quarter note feel)
        if (melodyNote > 0 && currentStep % 2 === 1 && Math.random() > 0.3) {
          playSynthNote(time + 0.05, melodyNote, soundMode);
        }

        // Increment step
        noteIndexRef.current = (noteIndexRef.current + 1) % 64;
        nextNoteTimeRef.current += stepDuration;
      }
    };

    schedulerIntervalRef.current = window.setInterval(scheduleNotes, 50);

    return () => {
      if (schedulerIntervalRef.current) {
        window.clearInterval(schedulerIntervalRef.current);
        schedulerIntervalRef.current = null;
      }
    };
  }, [isPlaying, soundMode, volume, audioMode]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      // Trigger Web Audio resume immediately on interaction
      if (audioMode === 'synth') {
        if (!audioContextRef.current) {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          audioContextRef.current = new AudioCtx();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="audio-player-widget" className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/80 p-3 shadow-xl backdrop-blur-md border border-pink-500/20 text-white max-w-sm transition-all hover:border-pink-500/40">
      <button
        onClick={handleTogglePlay}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white transition-transform active:scale-95 ${isPlaying ? 'animate-pulse' : ''}`}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500"></span>
          </span>
        )}
      </button>

      <div className="flex flex-col gap-1 pr-1">
        <div className="flex items-center gap-2">
          <Music size={12} className="text-pink-400" />
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            {audioMode === 'custom_mp3' 
              ? 'Happy Birthday MP3' 
              : soundMode === 'music_box' ? 'Dreamy Music Box' : soundMode === 'lofi_piano' ? 'Warm Piano' : 'Cosmic Bell'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Mode Selection or Custom track info */}
          {audioMode === 'custom_mp3' ? (
            <span className="text-[10px] text-pink-300 select-none">
              Custom Music Playing 🎵
            </span>
          ) : (
            <select
              value={soundMode}
              onChange={(e) => setSoundMode(e.target.value as any)}
              className="bg-transparent text-[10px] text-pink-300 border-none outline-none focus:ring-0 cursor-pointer hover:text-pink-200"
            >
              <option value="music_box" className="bg-slate-900 text-white text-xs">Dreamy Music Box</option>
              <option value="lofi_piano" className="bg-slate-900 text-white text-xs">Warm Piano</option>
              <option value="cosmic_bell" className="bg-slate-900 text-white text-xs">Cosmic Bell</option>
            </select>
          )}

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1 w-16 cursor-pointer rounded-lg bg-slate-700 accent-pink-500"
          />
        </div>
      </div>

      {/* Mini Audio Waves */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-4 w-6 px-1">
          <div className="w-[3px] rounded bg-pink-400 animate-[bounce_1s_infinite_100ms] h-1"></div>
          <div className="w-[3px] rounded bg-rose-400 animate-[bounce_1.2s_infinite_300ms] h-2"></div>
          <div className="w-[3px] rounded bg-pink-500 animate-[bounce_0.8s_infinite_0ms] h-3"></div>
          <div className="w-[3px] rounded bg-purple-400 animate-[bounce_1.1s_infinite_500ms] h-2"></div>
        </div>
      )}
    </div>
  );
}
