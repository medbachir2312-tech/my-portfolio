import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="project-detail-page">
      <section class="section" *ngIf="project as p">
        <div class="container">
          <a routerLink="/projects" class="back-link">
            <i class="fas fa-arrow-left"></i> Retour aux projets
          </a>
          
          <div class="project-header">
            <h1 class="project-title">{{ p.title }}</h1>
            <span class="project-category">{{ p.category }}</span>
          </div>

          <div class="project-image">
            <img [src]="p.imageUrl || '/assets/images/project-placeholder.jpg'" [alt]="p.title">
          </div>

          <div class="project-content">
            <div class="project-description">
              <h2>Description</h2>
              <p>{{ p.longDescription || p.description }}</p>
            </div>

            <div class="project-technologies">
              <h2>Technologies utilisées</h2>
              <div class="tech-list">
                <span *ngFor="let tech of p.technologies" class="tech-badge">{{ tech }}</span>
              </div>
            </div>

            <div class="project-links" *ngIf="p.githubUrl || p.demoUrl">
              <a *ngIf="p.githubUrl" [attr.href]="p.githubUrl" target="_blank" class="btn btn-outline">
                <i class="fab fa-github"></i> Voir le code
              </a>
              <a *ngIf="p.demoUrl" [attr.href]="p.demoUrl" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Voir la démo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .project-detail-page {
      min-height: calc(100vh - 70px);
      padding: var(--spacing-2xl) 0;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--color-text-secondary);
      font-weight: 500;
      margin-bottom: var(--spacing-xl);
      transition: all var(--transition-fast);

      &:hover {
        color: var(--color-primary);
        transform: translateX(-5px);
      }
    }

    .project-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
      flex-wrap: wrap;
    }

    .project-title {
      font-size: var(--font-size-4xl);
      font-weight: 800;
      margin: 0;
    }

    .project-category {
      padding: var(--spacing-sm) var(--spacing-lg);
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      border-radius: var(--radius-full);
      font-weight: 600;
    }

    .project-image {
      width: 100%;
      max-height: 500px;
      border-radius: var(--radius-xl);
      overflow: hidden;
      margin-bottom: var(--spacing-2xl);
      box-shadow: var(--shadow-xl);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .project-content {
      max-width: 800px;
      margin: 0 auto;

      h2 {
        font-size: var(--font-size-2xl);
        margin-bottom: var(--spacing-md);
      }

      p {
        font-size: var(--font-size-lg);
        line-height: 1.8;
        color: var(--color-text-secondary);
      }
    }

    .project-description,
    .project-technologies {
      margin-bottom: var(--spacing-2xl);
    }

    .tech-list {
      display: flex;
      gap: var(--spacing-md);
      flex-wrap: wrap;
    }

    .tech-badge {
      padding: var(--spacing-sm) var(--spacing-lg);
      background-color: var(--color-bg-secondary);
      color: var(--color-primary);
      border-radius: var(--radius-full);
      font-weight: 600;
    }

    .project-links {
      display: flex;
      gap: var(--spacing-md);
      flex-wrap: wrap;
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.project = this.projectService.getProjectById(id);
    }
  }
}
