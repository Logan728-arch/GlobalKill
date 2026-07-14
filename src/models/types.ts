// Global Kill Card Editor - Core Data Models

export interface Asset {
  id: string;
  name: string;
  url: string;
  type: 'image';
  createdAt: number;
}

export interface Layer {
  id: string;
  name: string;
  type: 'image' | 'text';
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  // Image specific
  imageUrl?: string;
  // Text specific
  text?: string;
  font?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
}

export interface Card {
  id: string;
  name: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: Layer[];
  createdAt: number;
  updatedAt: number;
}

export interface Project {
  id: string;
  name: string;
  cards: Card[];
  assets: Asset[];
  createdAt: number;
  updatedAt: number;
}

export interface Workspace {
  projects: Project[];
  currentProjectId: string | null;
  currentCardId: string | null;
}

export type EditorState = 'idle' | 'selected' | 'editing' | 'transforming';

export interface AppState {
  editorState: EditorState;
  selectedLayerId: string | null;
  zoom: number;
}
