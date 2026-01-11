import { create } from 'zustand';
import type { AppState } from './types';

interface ExtendedState extends AppState {
  mode: 'intro' | 'overview' | 'detail';
  setMode: (mode: 'intro' | 'overview' | 'detail') => void;
}

export const useStore = create<ExtendedState>((set) => ({
  activeSection: null,
  mode: 'intro',
  setActiveSection: (index) => set({ 
    activeSection: index,
    mode: index !== null ? 'detail' : 'overview'
  }),
  setMode: (mode) => set({ mode }),
}));