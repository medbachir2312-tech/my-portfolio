import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

/**
 * Page 404 - Not Found
 */
@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
    template: `
    <app-navbar></app-navbar>
    <main class="not-found-page">
      <div class="container">
        <div class="not-found-content">
          <div class="error-code">404</div>
          <h1 class="error-title">Page non trouvée</h1>
          <p class="error-description">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div class="error-actions">
            <a routerLink="/" class="btn btn-primary btn-lg">
              <i class="fas fa-home"></i>
              <span>Retour à l'accueil</span>
            </a>
            <a routerLink="/contact" class="btn btn-outline btn-lg">
              <i class="fas fa-envelope"></i>
              <span>Contactez-moi</span>
            </a>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
  `,
    styles: [`
    .not-found-page {
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-3xl) 0;
    }

    .not-found-content {
      text-align: center;
      animation: fadeIn 0.6s ease-out;
    }

    .error-code {
      font-size: clamp(6rem, 15vw, 12rem);
      font-weight: 900;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: var(--spacing-lg);
    }

    .error-title {
      font-size: var(--font-size-4xl);
      font-weight: 800;
      margin-bottom: var(--spacing-md);
    }

    .error-description {
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto var(--spacing-2xl);
    }

    .error-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      flex-wrap: wrap;
    }
  `]
})
export class NotFoundComponent { }
