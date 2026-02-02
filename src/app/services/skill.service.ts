import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Skill, SkillCategory } from '../models/portfolio.model';
import { SKILLS_DATA } from '../data/skills.data';

/**
 * Service de gestion des compétences
 * Gère les opérations CRUD sur les compétences avec LocalStorage
 */
@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private readonly STORAGE_KEY = 'portfolio_skills';
    private skillsSubject = new BehaviorSubject<Skill[]>(this.loadSkills());
    public skills$ = this.skillsSubject.asObservable();

    constructor() {
        // Initialiser avec les données par défaut si le storage est vide
        if (this.loadSkills().length === 0) {
            this.saveSkills(SKILLS_DATA);
        }
    }

    /**
     * Charger les compétences depuis LocalStorage
     */
    private loadSkills(): Skill[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des compétences:', error);
        }
        return SKILLS_DATA;
    }

    /**
     * Sauvegarder les compétences dans LocalStorage
     */
    private saveSkills(skills: Skill[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(skills));
            this.skillsSubject.next(skills);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des compétences:', error);
        }
    }

    /**
     * Obtenir toutes les compétences
     */
    getAllSkills(): Observable<Skill[]> {
        return this.skills$;
    }

    /**
     * Obtenir une compétence par ID
     */
    getSkillById(id: string): Skill | undefined {
        return this.skillsSubject.value.find(s => s.id === id);
    }

    /**
     * Obtenir les compétences par catégorie
     */
    getSkillsByCategory(category: SkillCategory): Skill[] {
        return this.skillsSubject.value
            .filter(s => s.category === category)
            .sort((a, b) => b.level - a.level);
    }

    /**
     * Obtenir les compétences principales (niveau > 80)
     */
    getTopSkills(): Skill[] {
        return this.skillsSubject.value
            .filter(s => s.level > 80)
            .sort((a, b) => b.level - a.level);
    }

    /**
     * Obtenir toutes les catégories
     */
    getAllCategories(): SkillCategory[] {
        return Object.values(SkillCategory);
    }

    /**
     * Ajouter une nouvelle compétence
     */
    addSkill(skill: Omit<Skill, 'id'>): void {
        const skills = this.skillsSubject.value;
        const newSkill: Skill = {
            ...skill,
            id: this.generateId()
        };
        this.saveSkills([...skills, newSkill]);
    }

    /**
     * Mettre à jour une compétence existante
     */
    updateSkill(id: string, updates: Partial<Skill>): void {
        const skills = this.skillsSubject.value;
        const index = skills.findIndex(s => s.id === id);

        if (index !== -1) {
            skills[index] = { ...skills[index], ...updates };
            this.saveSkills([...skills]);
        }
    }

    /**
     * Supprimer une compétence
     */
    deleteSkill(id: string): void {
        const skills = this.skillsSubject.value.filter(s => s.id !== id);
        this.saveSkills(skills);
    }

    /**
     * Réinitialiser avec les données par défaut
     */
    resetToDefault(): void {
        this.saveSkills(SKILLS_DATA);
    }

    /**
     * Générer un ID unique
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
