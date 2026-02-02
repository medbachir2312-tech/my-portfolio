import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-profile-admin',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="admin-page">
      <div class="admin-header">
        <h1>Gestion du Profil</h1>
        <button class="btn btn-primary">
          <i class="fas fa-save"></i> Sauvegarder
        </button>
      </div>
      <div class="card">
        <p class="info-text">
          <i class="fas fa-info-circle"></i>
          Formulaire de modification du profil à implémenter.
          Les données sont stockées dans LocalStorage via le ProfileService.
        </p>
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
    .info-text {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      color: var(--color-text-secondary);
      font-size: var(--font-size-lg);
      i { color: var(--color-info); font-size: var(--font-size-xl); }
    }
  `]
})
export class ProfileAdminComponent { }
