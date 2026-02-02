import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interface pour les informations d'authentification
 */
interface AuthCredentials {
    username: string;
    password: string;
}

/**
 * Service d'authentification simple (frontend uniquement)
 * ATTENTION: Ceci est une authentification basique pour démonstration
 * En production, utilisez un vrai système d'authentification backend
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly STORAGE_KEY = 'portfolio_auth';
    private readonly SESSION_KEY = 'portfolio_session';

    // Credentials par défaut (À MODIFIER pour votre usage)
    private readonly DEFAULT_CREDENTIALS: AuthCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkSession());
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {
        // Initialiser les credentials par défaut si non définis
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            this.saveCredentials(this.DEFAULT_CREDENTIALS);
        }
    }

    /**
     * Vérifier si une session existe
     */
    private checkSession(): boolean {
        try {
            const session = sessionStorage.getItem(this.SESSION_KEY);
            return session === 'true';
        } catch {
            return false;
        }
    }

    /**
     * Sauvegarder les credentials (hashés en production!)
     */
    private saveCredentials(credentials: AuthCredentials): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(credentials));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des credentials:', error);
        }
    }

    /**
     * Obtenir les credentials stockés
     */
    private getStoredCredentials(): AuthCredentials | null {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des credentials:', error);
        }
        return null;
    }

    /**
     * Connexion
     */
    login(username: string, password: string): boolean {
        const stored = this.getStoredCredentials();

        if (stored && stored.username === username && stored.password === password) {
            sessionStorage.setItem(this.SESSION_KEY, 'true');
            this.isAuthenticatedSubject.next(true);
            return true;
        }

        return false;
    }

    /**
     * Déconnexion
     */
    logout(): void {
        sessionStorage.removeItem(this.SESSION_KEY);
        this.isAuthenticatedSubject.next(false);
    }

    /**
     * Vérifier si l'utilisateur est authentifié
     */
    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    /**
     * Changer le mot de passe
     */
    changePassword(oldPassword: string, newPassword: string): boolean {
        const stored = this.getStoredCredentials();

        if (stored && stored.password === oldPassword) {
            this.saveCredentials({
                ...stored,
                password: newPassword
            });
            return true;
        }

        return false;
    }

    /**
     * Réinitialiser les credentials par défaut
     */
    resetCredentials(): void {
        this.saveCredentials(this.DEFAULT_CREDENTIALS);
    }
}
