import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, ProjectCategory } from '../models/portfolio.model';
import { PROJECTS_DATA } from '../data/projects.data';

/**
 * Service de gestion des projets
 * Gère les opérations CRUD sur les projets avec LocalStorage
 */
@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private readonly STORAGE_KEY = 'portfolio_projects';
    private projectsSubject = new BehaviorSubject<Project[]>(this.loadProjects());
    public projects$ = this.projectsSubject.asObservable();

    constructor() {
        // Initialiser avec les données par défaut si le storage est vide
        if (this.loadProjects().length === 0) {
            this.saveProjects(PROJECTS_DATA);
        }
    }

    /**
     * Charger les projets depuis LocalStorage
     */
    private loadProjects(): Project[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des projets:', error);
        }
        return PROJECTS_DATA;
    }

    /**
     * Sauvegarder les projets dans LocalStorage
     */
    private saveProjects(projects: Project[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
            this.projectsSubject.next(projects);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des projets:', error);
        }
    }

    /**
     * Obtenir tous les projets
     */
    getAllProjects(): Observable<Project[]> {
        return this.projects$;
    }

    /**
     * Obtenir un projet par ID
     */
    getProjectById(id: string): Project | undefined {
        return this.projectsSubject.value.find(p => p.id === id);
    }

    /**
     * Obtenir les projets en vedette
     */
    getFeaturedProjects(): Project[] {
        return this.projectsSubject.value
            .filter(p => p.featured)
            .sort((a, b) => a.order - b.order);
    }

    /**
     * Obtenir les projets par catégorie
     */
    getProjectsByCategory(category: ProjectCategory): Project[] {
        return this.projectsSubject.value
            .filter(p => p.category === category)
            .sort((a, b) => a.order - b.order);
    }

    /**
     * Ajouter un nouveau projet
     */
    addProject(project: Omit<Project, 'id'>): void {
        const projects = this.projectsSubject.value;
        const newProject: Project = {
            ...project,
            id: this.generateId()
        };
        this.saveProjects([...projects, newProject]);
    }

    /**
     * Mettre à jour un projet existant
     */
    updateProject(id: string, updates: Partial<Project>): void {
        const projects = this.projectsSubject.value;
        const index = projects.findIndex(p => p.id === id);

        if (index !== -1) {
            projects[index] = { ...projects[index], ...updates };
            this.saveProjects([...projects]);
        }
    }

    /**
     * Supprimer un projet
     */
    deleteProject(id: string): void {
        const projects = this.projectsSubject.value.filter(p => p.id !== id);
        this.saveProjects(projects);
    }

    /**
     * Réinitialiser avec les données par défaut
     */
    resetToDefault(): void {
        this.saveProjects(PROJECTS_DATA);
    }

    /**
     * Générer un ID unique
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
