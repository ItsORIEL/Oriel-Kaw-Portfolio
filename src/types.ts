export interface ProjectNode {
  id: number;
  title: string;
  role: string;
  tech: string[];
  description: string;
  position: [number, number, number];
  iconType: 'profile' | 'hr' | 'travel';
}

export type AppState = {
  activeSection: number | null;
  setActiveSection: (index: number | null) => void;
};