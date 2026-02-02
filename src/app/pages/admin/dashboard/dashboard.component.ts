import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { SkillService } from '../../../services/skill.service';
import { ContactService } from '../../../services/contact.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="admin-page">
      <div class="admin-header">
        <h1>Dashboard Admin</h1>
        <p>Bienvenue dans votre panneau d'administration</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5);">
            <i class="fas fa-briefcase"></i>
          </div>
          <div class="stat-content">
            <h3>{{ totalProjects }}</h3>
            <p>Projets</p>
          </div>
        </div>

        <div class="stat-card card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #ec4899, #db2777);">
            <i class="fas fa-code"></i>
          </div>
          <div class="stat-content">
            <h3>{{ totalSkills }}</h3>
            <p>Compétences</p>
          </div>
        </div>

        <div class="stat-card card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488);">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="stat-content">
            <h3>{{ totalMessages }}</h3>
            <p>Messages</p>
          </div>
        </div>

        <div class="stat-card card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
            <i class="fas fa-bell"></i>
          </div>
          <div class="stat-content">
            <h3>{{ unreadMessages }}</h3>
            <p>Non lus</p>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Actions rapides</h2>
        <div class="actions-grid">
          <a routerLink="/admin/projects" class="action-card card">
            <i class="fas fa-briefcase"></i>
            <span>Gérer les projets</span>
          </a>
          <a routerLink="/admin/skills" class="action-card card">
            <i class="fas fa-code"></i>
            <span>Gérer les compétences</span>
          </a>
          <a routerLink="/admin/profile" class="action-card card">
            <i class="fas fa-user"></i>
            <span>Modifier le profil</span>
          </a>
          <a routerLink="/admin/messages" class="action-card card">
            <i class="fas fa-envelope"></i>
            <span>Voir les messages</span>
          </a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .admin-page {
      padding: var(--spacing-2xl);
    }

    .admin-header {
      margin-bottom: var(--spacing-2xl);

      h1 {
        font-size: var(--font-size-3xl);
        font-weight: 800;
        margin-bottom: var(--spacing-sm);
      }

      p {
        color: var(--color-text-secondary);
        font-size: var(--font-size-lg);
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-3xl);
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      padding: var(--spacing-xl);
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      border-radius: var(--radius-xl);
      color: white;
      font-size: 2rem;
    }

    .stat-content {
      h3 {
        font-size: var(--font-size-3xl);
        font-weight: 800;
        margin: 0;
      }

      p {
        color: var(--color-text-secondary);
        margin: 0;
        font-weight: 500;
      }
    }

    .quick-actions {
      h2 {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        margin-bottom: var(--spacing-xl);
      }
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-lg);
    }

    .action-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-xl);
      text-align: center;
      transition: all var(--transition-base);

      i {
        font-size: 2.5rem;
        color: var(--color-primary);
      }

      span {
        font-weight: 600;
        color: var(--color-text-primary);
      }

      &:hover {
        transform: translateY(-5px);
        
        i {
          transform: scale(1.1);
        }
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
    totalProjects = 0;
    totalSkills = 0;
    totalMessages = 0;
    unreadMessages = 0;

    constructor(
        private projectService: ProjectService,
        private skillService: SkillService,
        private contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.projectService.projects$.subscribe(projects => {
            this.totalProjects = projects.length;
        });

        this.skillService.skills$.subscribe(skills => {
            this.totalSkills = skills.length;
        });

        this.contactService.messages$.subscribe(messages => {
            this.totalMessages = messages.length;
            this.unreadMessages = messages.filter(m => !m.read).length;
        });
    }
}
