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
  type: 'image' | 'text' | 'shape';
  visible: boolean;
  locked: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  imageUrl?: string;
  text?: string;
  font?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  vertical?: boolean;
  editable?: boolean;
  fixedStyle?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  zIndex?: number;
}

export interface CardTemplate {
  id: string;
  name: string;
  faction: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: Layer[];
  thumbnail?: string;
}

export interface Card {
  id: string;
  name: string;
  templateId?: string;
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
