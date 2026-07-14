import type { Project, Card } from '../models/types';
import { generateId } from '../utils/id';
import {
  saveProject,
  loadProject,
  deleteProject,
} from '../utils/persistence';
import { workspaceManager } from './workspaceManager';

class ProjectManager {
  async createProject(name: string): Promise<Project> {
    const now = Date.now();
    const project: Project = {
      id: generateId(),
      name,
      cards: [],
      assets: [],
      createdAt: now,
      updatedAt: now,
    };

    await saveProject(project);
    await workspaceManager.addProject(project);
    return project;
  }

  async loadProject(projectId: string): Promise<Project | null> {
    return await loadProject(projectId);
  }

  async deleteProject(projectId: string): Promise<void> {
    await deleteProject(projectId);
    await workspaceManager.removeProject(projectId);
  }

  async updateProject(project: Project): Promise<void> {
    project.updatedAt = Date.now();
    await saveProject(project);
  }

  async createCard(
    projectId: string,
    name: string,
    canvasWidth: number = 600,
    canvasHeight: number = 800
  ): Promise<Card> {
    const project = await this.loadProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const card: Card = {
      id: generateId(),
      name,
      canvasWidth,
      canvasHeight,
      layers: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    project.cards.push(card);
    await this.updateProject(project);
    return card;
  }

  async deleteCard(projectId: string, cardId: string): Promise<void> {
    const project = await this.loadProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    project.cards = project.cards.filter((c) => c.id !== cardId);
    await this.updateProject(project);
  }
}

export const projectManager = new ProjectManager();
