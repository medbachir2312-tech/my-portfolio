import { Project, ProjectCategory, ProjectStatus } from '../models/portfolio.model';

/**
 * Liste des projets du portfolio
 * Ajoutez, modifiez ou supprimez des projets selon vos besoins
 */
export const PROJECTS_DATA: Project[] = [
    {
        id: '1',
        title: 'Délivre Médecine',
        description: 'Application web pour la gestion et la livraison de médicaments entre pharmacies et patients',
        longDescription: `Délivre Médecine est une application web développée avec ASP.NET MVC
permettant de connecter les pharmacies aux patients. 
Elle offre aux patients la possibilité de consulter les médicaments disponibles,
de passer des commandes en ligne et de suivre l’état de livraison.
Du côté des pharmacies, la plateforme permet la gestion des stocks,
le traitement des commandes et l’organisation des livraisons,
améliorant ainsi la rapidité, la fiabilité et la traçabilité du service.`,
        technologies: [
            'ASP.NET MVC',
            'C#',
            'Entity Framework',
            'SQL Server',
            'HTML5',
            'CSS3',
            'Bootstrap',
            'JavaScript'
        ],
        category: ProjectCategory.FULLSTACK,
        githubUrl: 'https://github.com/username/delivre-medecine',
        demoUrl: 'https://delivre-medecine.demo',
        imageUrl: 'assets/projects/delivre-medecine.png',
        featured: true,
        status: ProjectStatus.COMPLETED,
        order: 1

    },
    {
        id: '2',
        title: 'Gestion de factures',
        description: 'Application web pour la gestion et le suivi des factures de distribution',
        longDescription: `Gestion de factures est une application web développée avec Spring Boot
permettant d’automatiser la création, le suivi et la gestion des factures
dans un contexte de distribution.
Elle offre des fonctionnalités telles que l’enregistrement des factures,
le suivi des paiements, la consultation de l’historique et la gestion des clients.
L’application vise à améliorer l’organisation, réduire les erreurs manuelles
et faciliter le contrôle financier.`,
        technologies: [
            'Spring Boot',
            'Java',
            'HTML5',
            'CSS3',
            'Bootstrap',
            'JPA / Hibernate',
            'MySQL'
        ],
        category: ProjectCategory.FULLSTACK,
        githubUrl: 'https://github.com/username/gestion-factures',
        demoUrl: 'https://gestion-factures.demo',
        imageUrl: 'assets/projects/gestion-factures.png',
        featured: false,
        status: ProjectStatus.COMPLETED,
        order: 2
    },
    {
        id: '3',
        title: 'Livraison de vêtements',
        description: 'Application complète pour la gestion et le suivi des livraisons de vêtements',
        longDescription: `Livraison de vêtements est une application complète développée
avec Spring Boot pour le backend et Flutter pour le frontend.
Elle permet de gérer l’ensemble du processus de livraison, depuis la création
des commandes jusqu’au suivi en temps réel des colis.
L’application offre des fonctionnalités dédiées aux administrateurs,
aux livreurs et aux clients, incluant la gestion des commandes,
le suivi des livraisons, la mise à jour des statuts et l’historique des livraisons.
Cette solution vise à améliorer l’efficacité logistique et la satisfaction client.`,
        technologies: [
            'Spring Boot',
            'Java',
            'Flutter',
            'REST API',
            'JWT Authentication',
            'MySQL'
        ],
        category: ProjectCategory.FULLSTACK,
        githubUrl: 'https://github.com/username/livraison-vetements',
        demoUrl: 'https://livraison-vetements.demo',
        imageUrl: 'assets/projects/livraison-vetements.png',
        featured: true,
        status: ProjectStatus.COMPLETED,
        order: 3

    },
    {
        id: '4',
        title: 'Application de Gestion des Tâches',
        description: 'Application mobile pour organiser les tâches quotidiennes avec rappels et statuts',
        longDescription: `L’Application de Gestion des Tâches (To-Do App) est une application mobile
conçue pour aider les utilisateurs à organiser efficacement leurs tâches quotidiennes.
Elle permet de créer, modifier et supprimer des tâches, de définir des rappels
et de gérer les statuts (à faire / terminé).
L’application offre une interface simple et intuitive afin d’améliorer
la productivité, la gestion du temps et le suivi des activités personnelles.`,
        technologies: [
            'Flutter',
            'Dart',
            'Local Storage',
            'Notifications',
            'Material UI'
        ],
        category: ProjectCategory.MOBILE,
        githubUrl: 'https://github.com/username/todo-app',
        demoUrl: 'https://todo-app.demo',
        imageUrl: 'assets/projects/todo-app.png',
        featured: false,
        status: ProjectStatus.COMPLETED,
        order: 4
    }
];

/**
 * Fonction utilitaire pour obtenir les projets en vedette
 */
export function getFeaturedProjects(): Project[] {
    return PROJECTS_DATA.filter(project => project.featured)
        .sort((a, b) => a.order - b.order);
}

/**
 * Fonction utilitaire pour obtenir les projets par catégorie
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
    return PROJECTS_DATA.filter(project => project.category === category)
        .sort((a, b) => a.order - b.order);
}

/**
 * Fonction utilitaire pour obtenir un projet par ID
 */
export function getProjectById(id: string): Project | undefined {
    return PROJECTS_DATA.find(project => project.id === id);
}
