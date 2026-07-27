export interface Project {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  video?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  keyword: string;
}

export interface DimensionNode {
  id: string;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  color: string;
  href: string;
}

export interface PhilosophyItem {
  number: string;
  title: string;
  subtitle: string;
}