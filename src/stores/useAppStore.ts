import { create } from 'zustand';
import type { Project, Card, Workspace, EditorState } from '../models/types';
import { workspaceManager } from '../managers/workspaceManager';
import { projectManager } from '../managers/projectManager';

interface AppStore {
  // Workspace state
  workspace: Workspace | null;
  isLoading: boolean;

  // Editor state
  editorState: EditorState;
  selectedLayerId: string | null;
  zoom: number;

  // Actions
  init: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  selectProject: (projectId: string) => Promise<void>;
  createCard: (name: string, width?: number, height?: number) => Promise<void>;
  selectCard: (cardId: string) => void;
  setEditorState: (state: EditorState) => void;
  setSelectedLayerId: (id: string | null) => void;
  setZoom: (zoom: number) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  workspace: null,
  isLoading: true,
  editorState: 'idle',
  selectedLayerId: null,
  zoom: 100,

  init: async () => {
    const workspace = await workspaceManager.init();
    set({ workspace, isLoading: false });
  },

  createProject: async (name: string) => {
    await projectManager.createProject(name);
    const workspace = await workspaceManager.getWorkspace();
    set({ workspace });
  },

  deleteProject: async (projectId: string) => {
    await projectManager.deleteProject(projectId);
    const workspace = await workspaceManager.getWorkspace();
    set({ workspace });
  },

  selectProject: async (projectId: string) => {
    await workspaceManager.setCurrentProject(projectId);
    const workspace = await workspaceManager.getWorkspace();
    set({ workspace });
  },

  createCard: async (name: string, width = 600, height = 800) => {
    const { workspace } = get();
    if (!workspace?.currentProjectId) return;
    await projectManager.createCard(workspace.currentProjectId, name, width, height);
    const updatedProject = await projectManager.loadProject(workspace.currentProjectId);
    if (updatedProject) {
      const ws = await workspaceManager.getWorkspace();
      const idx = ws.projects.findIndex((p) => p.id === updatedProject.id);
      if (idx >= 0) ws.projects[idx] = updatedProject;
      set({ workspace: ws });
    }
  },

  selectCard: (cardId: string) => {
    workspaceManager.setCurrentCard(cardId);
    set({ selectedLayerId: null, editorState: 'idle' });
  },

  setEditorState: (state: EditorState) => set({ editorState: state }),
  setSelectedLayerId: (id: string | null) =>
    set({ selectedLayerId: id, editorState: id ? 'selected' : 'idle' }),
  setZoom: (zoom: number) => set({ zoom }),
}));
