import { create } from 'zustand';
import type { Project, Card, Workspace, EditorState, Layer } from '../models/types';
import { workspaceManager } from '../managers/workspaceManager';
import { projectManager } from '../managers/projectManager';
import { allTemplates, createCardFromTemplate } from '../templates/usaTemplate';
import { generateId } from '../utils/id';

interface AppStore {
  workspace: Workspace | null;
  isLoading: boolean;
  editorState: EditorState;
  selectedLayerId: string | null;
  zoom: number;
  editingLayerId: string | null;

  init: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  selectProject: (projectId: string) => Promise<void>;
  createCard: (name: string, width?: number, height?: number) => Promise<void>;
  createCardFromTemplateId: (templateId: string, name?: string) => Promise<void>;
  selectCard: (cardId: string) => void;
  setEditorState: (state: EditorState) => void;
  setSelectedLayerId: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  setEditingLayerId: (id: string | null) => void;
  updateLayer: (cardId: string, layerId: string, updates: Partial<Layer>) => Promise<void>;
  updateLayerText: (cardId: string, layerId: string, text: string) => Promise<void>;
  updateLayerImage: (cardId: string, layerId: string, imageUrl: string) => Promise<void>;
  getCurrentCard: () => Card | null;
  getCurrentProject: () => Project | null;
}

export const useAppStore = create<AppStore>((set, get) => ({
  workspace: null,
  isLoading: true,
  editorState: 'idle',
  selectedLayerId: null,
  zoom: 60,
  editingLayerId: null,

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

  createCardFromTemplateId: async (templateId: string, name?: string) => {
    const { workspace } = get();
    if (!workspace?.currentProjectId) return;
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;

    const project = await projectManager.loadProject(workspace.currentProjectId);
    if (!project) return;

    const now = Date.now();
    const cardData = createCardFromTemplate(template);
    const card: Card = {
      id: generateId(),
      ...cardData,
      name: name || template.name,
      createdAt: now,
      updatedAt: now,
    };

    project.cards.push(card);
    await projectManager.updateProject(project);
    await workspaceManager.setCurrentCard(card.id);
    const ws = await workspaceManager.getWorkspace();
    const idx = ws.projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) ws.projects[idx] = project;
    set({ workspace: ws, selectedLayerId: null, editingLayerId: null });
  },

  selectCard: (cardId: string) => {
    workspaceManager.setCurrentCard(cardId);
    set({ selectedLayerId: null, editorState: 'idle', editingLayerId: null });
  },

  setEditorState: (state: EditorState) => set({ editorState: state }),
  setSelectedLayerId: (id: string | null) =>
    set({ selectedLayerId: id, editorState: id ? 'selected' : 'idle' }),
  setZoom: (zoom: number) => set({ zoom: Math.max(10, Math.min(200, zoom)) }),
  setEditingLayerId: (id: string | null) => set({ editingLayerId: id, editorState: id ? 'editing' : 'idle' }),

  getCurrentProject: () => {
    const { workspace } = get();
    if (!workspace?.currentProjectId) return null;
    return workspace.projects.find(p => p.id === workspace.currentProjectId) || null;
  },

  getCurrentCard: () => {
    const project = get().getCurrentProject();
    const { workspace } = get();
    if (!project || !workspace?.currentCardId) return null;
    return project.cards.find(c => c.id === workspace.currentCardId) || null;
  },

  updateLayer: async (cardId: string, layerId: string, updates: Partial<Layer>) => {
    const { workspace } = get();
    if (!workspace?.currentProjectId) return;
    const project = await projectManager.loadProject(workspace.currentProjectId);
    if (!project) return;
    const card = project.cards.find(c => c.id === cardId);
    if (!card) return;
    const layer = card.layers.find(l => l.id === layerId);
    if (!layer) return;
    Object.assign(layer, updates);
    card.updatedAt = Date.now();
    await projectManager.updateProject(project);
    const ws = await workspaceManager.getWorkspace();
    const idx = ws.projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) ws.projects[idx] = project;
    set({ workspace: ws });
  },

  updateLayerText: async (cardId: string, layerId: string, text: string) => {
    await get().updateLayer(cardId, layerId, { text });
  },

  updateLayerImage: async (cardId: string, layerId: string, imageUrl: string) => {
    await get().updateLayer(cardId, layerId, { imageUrl });
  },
}));
