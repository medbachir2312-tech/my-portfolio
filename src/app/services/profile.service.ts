import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../models/portfolio.model';
import { PROFILE_DATA } from '../data/profile.data';

/**
 * Service de gestion du profil
 * Gère les informations personnelles avec LocalStorage
 */
@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly STORAGE_KEY = 'portfolio_profile';
    private profileSubject = new BehaviorSubject<Profile>(this.loadProfile());
    public profile$ = this.profileSubject.asObservable();

    constructor() {
        // Initialiser avec les données par défaut si le storage est vide
        const profile = this.loadProfile();
        if (!profile || !profile.id) {
            this.saveProfile(PROFILE_DATA);
        }
    }

    /**
     * Charger le profil depuis LocalStorage
     */
    private loadProfile(): Profile {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error);
        }
        return PROFILE_DATA;
    }

    /**
     * Sauvegarder le profil dans LocalStorage
     */
    private saveProfile(profile: Profile): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
            this.profileSubject.next(profile);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du profil:', error);
        }
    }

    /**
     * Obtenir le profil
     */
    getProfile(): Observable<Profile> {
        return this.profile$;
    }

    /**
     * Obtenir le profil actuel (valeur synchrone)
     */
    getCurrentProfile(): Profile {
        return this.profileSubject.value;
    }

    /**
     * Mettre à jour le profil
     */
    updateProfile(updates: Partial<Profile>): void {
        const currentProfile = this.profileSubject.value;
        const updatedProfile = { ...currentProfile, ...updates };
        this.saveProfile(updatedProfile);
    }

    /**
     * Réinitialiser avec les données par défaut
     */
    resetToDefault(): void {
        this.saveProfile(PROFILE_DATA);
    }
}
