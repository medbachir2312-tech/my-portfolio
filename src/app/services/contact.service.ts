import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContactMessage } from '../models/portfolio.model';

/**
 * Service de gestion des messages de contact
 * Stocke les messages dans LocalStorage (simulation backend)
 */
@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private readonly STORAGE_KEY = 'portfolio_messages';
    private messagesSubject = new BehaviorSubject<ContactMessage[]>(this.loadMessages());
    public messages$ = this.messagesSubject.asObservable();

    constructor() { }

    /**
     * Charger les messages depuis LocalStorage
     */
    private loadMessages(): ContactMessage[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const messages = JSON.parse(data);
                // Convertir les dates string en objets Date
                return messages.map((msg: any) => ({
                    ...msg,
                    date: new Date(msg.date)
                }));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des messages:', error);
        }
        return [];
    }

    /**
     * Sauvegarder les messages dans LocalStorage
     */
    private saveMessages(messages: ContactMessage[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
            this.messagesSubject.next(messages);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des messages:', error);
        }
    }

    /**
     * Obtenir tous les messages
     */
    getAllMessages(): Observable<ContactMessage[]> {
        return this.messages$;
    }

    /**
     * Obtenir les messages non lus
     */
    getUnreadMessages(): ContactMessage[] {
        return this.messagesSubject.value.filter(msg => !msg.read);
    }

    /**
     * Obtenir le nombre de messages non lus
     */
    getUnreadCount(): number {
        return this.getUnreadMessages().length;
    }

    /**
     * Ajouter un nouveau message
     */
    addMessage(message: Omit<ContactMessage, 'id' | 'date' | 'read'>): void {
        const messages = this.messagesSubject.value;
        const newMessage: ContactMessage = {
            ...message,
            id: this.generateId(),
            date: new Date(),
            read: false
        };
        this.saveMessages([newMessage, ...messages]);
    }

    /**
     * Marquer un message comme lu
     */
    markAsRead(id: string): void {
        const messages = this.messagesSubject.value;
        const index = messages.findIndex(msg => msg.id === id);

        if (index !== -1) {
            messages[index].read = true;
            this.saveMessages([...messages]);
        }
    }

    /**
     * Marquer tous les messages comme lus
     */
    markAllAsRead(): void {
        const messages = this.messagesSubject.value.map(msg => ({
            ...msg,
            read: true
        }));
        this.saveMessages(messages);
    }

    /**
     * Supprimer un message
     */
    deleteMessage(id: string): void {
        const messages = this.messagesSubject.value.filter(msg => msg.id !== id);
        this.saveMessages(messages);
    }

    /**
     * Supprimer tous les messages
     */
    deleteAllMessages(): void {
        this.saveMessages([]);
    }

    /**
     * Générer un ID unique
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
