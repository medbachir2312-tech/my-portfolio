import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { ContactMessage } from '../../../models/portfolio.model';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="admin-page">
      <div class="admin-header">
        <h1>Messages de Contact</h1>
        <div class="header-actions">
          <span class="badge">{{ unreadCount }} non lus</span>
          <button class="btn btn-outline btn-sm" (click)="markAllAsRead()">
            <i class="fas fa-check-double"></i> Tout marquer comme lu
          </button>
        </div>
      </div>

      <div class="messages-list">
        <div *ngFor="let message of messages" class="message-card card" [class.unread]="!message.read">
          <div class="message-header">
            <div class="message-info">
              <h3>{{ message.name }}</h3>
              <span class="message-email">{{ message.email }}</span>
            </div>
            <div class="message-meta">
              <span class="message-date">{{ message.date | date:'short' }}</span>
              <span *ngIf="!message.read" class="unread-badge">Nouveau</span>
            </div>
          </div>
          <div class="message-subject">
            <strong>{{ message.subject }}</strong>
          </div>
          <div class="message-content">
            <p>{{ message.message }}</p>
          </div>
          <div class="message-actions">
            <button *ngIf="!message.read" class="btn btn-sm btn-outline" (click)="markAsRead(message.id)">
              <i class="fas fa-check"></i> Marquer comme lu
            </button>
            <button class="btn btn-sm btn-outline" (click)="deleteMessage(message.id)">
              <i class="fas fa-trash"></i> Supprimer
            </button>
          </div>
        </div>

        <div *ngIf="messages.length === 0" class="no-messages">
          <i class="fas fa-inbox"></i>
          <p>Aucun message pour le moment</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .admin-page { padding: var(--spacing-2xl); }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-2xl);
      flex-wrap: wrap;
      gap: var(--spacing-md);
    }
    .admin-header h1 {
      font-size: var(--font-size-3xl);
      font-weight: 800;
      margin: 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
    .badge {
      padding: var(--spacing-xs) var(--spacing-md);
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: var(--font-size-sm);
    }
    .messages-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }
    .message-card {
      padding: var(--spacing-xl);
      &.unread {
        border-left: 4px solid var(--color-primary);
        background-color: rgba(99, 102, 241, 0.05);
      }
    }
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-md);
      gap: var(--spacing-md);
    }
    .message-info h3 {
      font-size: var(--font-size-lg);
      font-weight: 700;
      margin: 0 0 var(--spacing-xs) 0;
    }
    .message-email {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }
    .message-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-xs);
    }
    .message-date {
      color: var(--color-text-tertiary);
      font-size: var(--font-size-sm);
    }
    .unread-badge {
      padding: var(--spacing-xs) var(--spacing-sm);
      background-color: var(--color-primary);
      color: white;
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      font-weight: 600;
    }
    .message-subject {
      margin-bottom: var(--spacing-md);
      font-size: var(--font-size-base);
    }
    .message-content {
      padding: var(--spacing-md);
      background-color: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
      p {
        margin: 0;
        color: var(--color-text-secondary);
        line-height: 1.6;
      }
    }
    .message-actions {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }
    .no-messages {
      text-align: center;
      padding: var(--spacing-3xl);
      color: var(--color-text-tertiary);
      i {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
      }
      p {
        font-size: var(--font-size-lg);
      }
    }
  `]
})
export class MessagesComponent implements OnInit {
    messages: ContactMessage[] = [];
    unreadCount = 0;

    constructor(private contactService: ContactService) { }

    ngOnInit(): void {
        this.contactService.messages$.subscribe(messages => {
            this.messages = messages.sort((a, b) => b.date.getTime() - a.date.getTime());
            this.unreadCount = messages.filter(m => !m.read).length;
        });
    }

    markAsRead(id: string): void {
        this.contactService.markAsRead(id);
    }

    markAllAsRead(): void {
        this.contactService.markAllAsRead();
    }

    deleteMessage(id: string): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
            this.contactService.deleteMessage(id);
        }
    }
}
