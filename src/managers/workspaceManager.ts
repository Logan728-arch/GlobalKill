import type { Workspace, Project } from '../models/types';
import {
  saveWorkspace,
  loadWorkspace,
  initializeWorkspace,
  loadAllProjects,
} from '../utils/persistence';

class WorkspaceManager {
  private workspace: Workspace | null = null;

  async init(): Promise<Workspace> {
    this.workspace = await initializeWorkspace();
    // Sync projects list from project store
    const allProjects = await loadAllProjects();
    this.workspace.projects = allProjects;
    await saveWorkspace(this.workspace);
    return this.workspace;
  }

  async getWorkspace(): Promise<Workspace> {
    if (!this.workspace) {
      return await this.init();
    }
    return this.workspace;
  }

  async addProject(project: Project): Promise<void> {
    const ws = await this.getWorkspace();
    ws.projects.push(project);
    ws.currentProjectId = project.id;
    await saveWorkspace(ws);
  }

  async removeProject(projectId: string): Promise<void> {
    const ws = await this.getWorkspace();
    ws.projects = ws.projects.filter((p) => p.id !== projectId);
    if (ws.currentProjectId === projectId) {
      ws.currentProjectId = ws.projects.length > 0 ? ws.projects[0].id : null;
    }
    await saveWorkspace(ws);
  }

  async setCurrentProject(projectId: string | null): Promise<void> {
    const ws = await this.getWorkspace();
    ws.currentProjectId = projectId;
    ws.currentCardId = null;
    await saveWorkspace(ws);
  }

  async setCurrentCard(cardId: string | null): Promise<void> {
    const ws = await this.getWorkspace();
    ws.currentCardId = cardId;
    await saveWorkspace(ws);
  }
}

export const workspaceManager = new WorkspaceManager();
