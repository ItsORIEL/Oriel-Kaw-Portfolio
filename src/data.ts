import type { ProjectNode } from './types';

export const RESUME_DATA: ProjectNode[] = [
  {
    id: 0,
    title: "Lead Frontend",
    role: "Professional Profile",
    tech: ["Vue", "TS", "React"],
    description: "Lead developer for the IDF's largest platform. Expertise in delivering high-quality solutions for complex technical challenges.",
    position: [0, 1.5, -3.5], 
    iconType: 'profile',
  },
  {
    id: 1,
    title: "HR System",
    role: "Internal Tools",
    tech: ["Vue.js", "Vuetify"],
    description: "Translated Figma to robust UI for the IDF's critical HR system. Managed API integration, code reviews, and mentored junior developers.",
    position: [-3.5, -1, 2], 
    iconType: 'hr',
  },
  {
    id: 2,
    title: "Travel Forms",
    role: "Logistics App",
    tech: ["React", "MUI"],
    description: "Developed a critical IDF-wide travel app. Handled version control (GitHub) and Agile workflow (Trello).",
    position: [3.5, -1, 2], 
    iconType: 'travel',
  },
];