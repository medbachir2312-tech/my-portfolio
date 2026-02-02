import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../models/portfolio.model';

/**
 * Service de gestion du thème (Dark/Light mode)
 * Persiste le choix de l'utilisateur dans LocalStorage
 */
@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly STORAGE_KEY = 'portfolio_theme';
    private themeSubject = new BehaviorSubject<Theme>(this.loadTheme());
    public theme$ = this.themeSubject.asObservable();

    constructor() {
        // Appliquer le thème au chargement
        this.applyTheme(this.themeSubject.value);
    }

    /**
     * Charger le thème depuis LocalStorage ou détecter la préférence système
     */
    private loadTheme(): Theme {
        try {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
            if (savedTheme === 'light' || savedTheme === 'dark') {
                return savedTheme;
            }
        } catch (error) {
            console.error('Erreur lors du chargement du thème:', error);
        }

        // Détecter la préférence système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Appliquer le thème au document
     */
    private applyTheme(theme: Theme): void {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);

        // Ajouter/retirer la classe dark pour compatibilité
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }

    /**
     * Obtenir le thème actuel
     */
    getCurrentTheme(): Theme {
        return this.themeSubject.value;
    }

    /**
     * Obtenir le thème comme Observable
     */
    getTheme(): Observable<Theme> {
        return this.theme$;
    }

    /**
     * Définir le thème
     */
    setTheme(theme: Theme): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, theme);
            this.themeSubject.next(theme);
            this.applyTheme(theme);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du thème:', error);
        }
    }

    /**
     * Basculer entre les thèmes
     */
    toggleTheme(): void {
        const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Vérifier si le thème est sombre
     */
    isDarkTheme(): boolean {
        return this.themeSubject.value === 'dark';
    }
}
