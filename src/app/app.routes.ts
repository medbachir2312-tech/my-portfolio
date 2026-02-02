import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Configuration des routes de l'application
 * Routes publiques et routes admin protégées
 */
export const routes: Routes = [
    // Routes publiques
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Accueil - Portfolio'
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
        title: 'À propos - Portfolio'
    },
    {
        path: 'projects',
        loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
        title: 'Projets - Portfolio'
    },
    {
        path: 'projects/:id',
        loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
        title: 'Détail du projet - Portfolio'
    },
    {
        path: 'skills',
        loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent),
        title: 'Compétences - Portfolio'
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact - Portfolio'
    },

    // Routes admin
    {
        path: 'admin/login',
        loadComponent: () => import('./pages/admin/login/login.component').then(m => m.LoginComponent),
        title: 'Connexion Admin - Portfolio'
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: 'Dashboard Admin - Portfolio'
            },
            {
                path: 'projects',
                loadComponent: () => import('./pages/admin/projects-admin/projects-admin.component').then(m => m.ProjectsAdminComponent),
                title: 'Gestion des projets - Admin'
            },
            {
                path: 'skills',
                loadComponent: () => import('./pages/admin/skills-admin/skills-admin.component').then(m => m.SkillsAdminComponent),
                title: 'Gestion des compétences - Admin'
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/admin/profile-admin/profile-admin.component').then(m => m.ProfileAdminComponent),
                title: 'Gestion du profil - Admin'
            },
            {
                path: 'messages',
                loadComponent: () => import('./pages/admin/messages/messages.component').then(m => m.MessagesComponent),
                title: 'Messages - Admin'
            }
        ]
    },

    // Route 404
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: 'Page non trouvée - Portfolio'
    }
];
