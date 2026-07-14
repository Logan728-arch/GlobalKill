import localforage from 'localforage';
import type { Project, Workspace } from '../models/types';

// Configure localforage instances for different data types
const projectStore = localforage.createInstance({
  name: 'GlobalKillEditor',
  storeName: 'projects',
});

const workspaceStore = localforage.createInstance({
  name: 'GlobalKillEditor',
  storeName: 'workspace',
});

const assetStore = localforage.createInstance({
  name: 'GlobalKillEditor',
  storeName: 'assets',
});

// Workspace operations
export async function saveWorkspace(workspace: Workspace): Promise<void> {
  await workspaceStore.setItem('workspace', workspace);
}

export async function loadWorkspace(): Promise<Workspace | null> {
  return await workspaceStore.getItem<Workspace>('workspace');
}

// Project operations
export async function saveProject(project: Project): Promise<void> {
  await projectStore.setItem(project.id, project);
}

export async function loadProject(projectId: string): Promise<Project | null> {
  return await projectStore.getItem<Project>(projectId);
}

export async function deleteProject(projectId: string): Promise<void> {
  await projectStore.removeItem(projectId);
}

export async function loadAllProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  await projectStore.iterate<Project, void>((value) => {
    projects.push(value);
  });
  return projects;
}

// Asset operations (binary data)
export async function saveAsset(id: string, data: Blob): Promise<string> {
  await assetStore.setItem(id, data);
  return id;
}

export async function loadAsset(id: string): Promise<Blob | null> {
  return await assetStore.getItem<Blob>(id);
}

export async function deleteAsset(id: string): Promise<void> {
  await assetStore.removeItem(id);
}

// Initialize default workspace
export async function initializeWorkspace(): Promise<Workspace> {
  const existing = await loadWorkspace();
  if (existing) {
    return existing;
  }

  const defaultWorkspace: Workspace = {
    projects: [],
    currentProjectId: null,
    currentCardId: null,
  };

  await saveWorkspace(defaultWorkspace);
  return defaultWorkspace;
}
