/**
 * Modèles de données pour le portfolio
 * Tous les types et interfaces utilisés dans l'application
 */

// Interface pour les informations de profil
export interface Profile {
    id: string;
    fullName: string;
    role: string;
    introduction: string;
    about: string;
    journey: string;
    softSkills: string[];
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    avatar?: string;
    resumeUrl?: string;
}

// Interface pour les projets
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: ProjectCategory;
    githubUrl?: string;
    demoUrl?: string;
    imageUrl?: string;
    featured: boolean;
    startDate?: Date;
    endDate?: Date;
    status: ProjectStatus;
    order: number;
}

// Catégories de projets
export enum ProjectCategory {
    WEB = 'Web',
    MOBILE = 'Mobile',
    DESKTOP = 'Desktop',
    FULLSTACK = 'Full Stack',
    FRONTEND = 'Frontend',
    BACKEND = 'Backend',
    OTHER = 'Autre'
}

// Statut des projets
export enum ProjectStatus {
    COMPLETED = 'Terminé',
    IN_PROGRESS = 'En cours',
    PLANNED = 'Planifié',
    ARCHIVED = 'Archivé'
}

// Interface pour les compétences
export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number; // 0-100
    icon?: string;
    color?: string;
    order: number;
}

// Catégories de compétences
export enum SkillCategory {
    FRONTEND = 'Frontend',
    BACKEND = 'Backend',
    DATABASE = 'Base de données',
    LANGUAGES = 'Langages',
    TOOLS = 'Outils',
    DESIGN = 'Design',
    METHODOLOGIES = 'Methodologies',
    OTHER = 'Autre'
}

// Interface pour les expériences professionnelles
export interface Experience {
    id: string;
    company: string;
    position: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    location?: string;
    technologies: string[];
    achievements: string[];
    order: number;
}

// Interface pour l'éducation
export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
    location?: string;
    gpa?: string;
    order: number;
}

// Interface pour les messages de contact
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: Date;
    read: boolean;
}

// Interface pour les réseaux sociaux
export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    color?: string;
}

// Interface pour les certifications
export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: Date;
    expiryDate?: Date;
    credentialId?: string;
    credentialUrl?: string;
    imageUrl?: string;
    order: number;
}

// Interface pour les témoignages
export interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    message: string;
    avatar?: string;
    rating: number; // 1-5
    date: Date;
    featured: boolean;
    order: number;
}

// Type pour le thème
export type Theme = 'light' | 'dark';

// Interface pour les paramètres utilisateur
export interface UserSettings {
    theme: Theme;
    language: string;
    emailNotifications: boolean;
}

// Interface pour les statistiques du dashboard admin
export interface DashboardStats {
    totalProjects: number;
    totalSkills: number;
    totalMessages: number;
    unreadMessages: number;
    totalVisitors?: number;
}
