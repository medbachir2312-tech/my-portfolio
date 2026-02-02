import { Skill, SkillCategory } from '../models/portfolio.model';

/**
 * Liste des compétences techniques
 * Organisées par catégorie avec niveau de maîtrise (0-100)
 */
export const SKILLS_DATA: Skill[] = [
    // Frontend
    {
        id: '1',
        name: 'Angular',
        category: SkillCategory.FRONTEND,
        level: 75,
        icon: 'angular',
        color: '#DD0031',
        order: 1
    },
    {
        id: '2',
        name: 'React',
        category: SkillCategory.FRONTEND,
        level: 90,
        icon: 'react',
        color: '#61DAFB',
        order: 2
    },
    {
        id: '3',
        name: 'Flutter',
        category: SkillCategory.FRONTEND,
        level: 98,
        icon: 'flutter',
        color: '#02569B',
        order: 3
    },

    // Backend
    {
        id: '4',
        name: '.NET MVC',
        category: SkillCategory.BACKEND,
        level: 85,
        icon: 'net',
        color: '#512BD4',
        order: 4
    },
    {
        id: '5',
        name: 'Spring Boot',
        category: SkillCategory.BACKEND,
        level: 95,
        icon: 'spring',
        color: '#6DB33F',
        order: 5
    },
    {
        id: '6',
        name: 'PHP',
        category: SkillCategory.BACKEND,
        level: 75,
        icon: 'php',
        color: '#777BB4',
        order: 6
    },

    // Base de données
    {
        id: '7',
        name: 'PostgreSQL',
        category: SkillCategory.DATABASE,
        level: 78,
        icon: 'postgresql',
        color: '#336791',
        order: 7
    },
    {
        id: '8',
        name: 'MySQL',
        category: SkillCategory.DATABASE,
        level: 80,
        icon: 'mysql',
        color: '#4479A1',
        order: 8
    },
    {
        id: '9',
        name: 'Firebase',
        category: SkillCategory.DATABASE,
        level: 70,
        icon: 'firebase',
        color: '#FFCA28',
        order: 9
    },
    {
        id: '10',
        name: 'Supabase',
        category: SkillCategory.DATABASE,
        level: 70,
        icon: 'supabase',
        color: '#3ECF8E',
        order: 10
    },

    // Langages
    {
        id: '11',
        name: 'Java',
        category: SkillCategory.LANGUAGES,
        level: 90,
        icon: 'java',
        color: '#007396',
        order: 11
    },
    {
        id: '12',
        name: 'C',
        category: SkillCategory.LANGUAGES,
        level: 80,
        icon: 'c',
        color: '#A8B9CC',
        order: 12
    },
    {
        id: '13',
        name: 'C#',
        category: SkillCategory.LANGUAGES,
        level: 80,
        icon: 'csharp',
        color: '#239120',
        order: 13
    },
    {
        id: '14',
        name: 'Python',
        category: SkillCategory.LANGUAGES,
        level: 80,
        icon: 'python',
        color: '#3776AB',
        order: 14
    },
    {
        id: '15',
        name: 'JavaScript',
        category: SkillCategory.LANGUAGES,
        level: 70,
        icon: 'javascript',
        color: '#F7DF1E',
        order: 15
    },
    {
        id: '16',
        name: 'TypeScript',
        category: SkillCategory.LANGUAGES,
        level: 70,
        icon: 'typescript',
        color: '#3178C6',
        order: 16
    },
    {
        id: '17',
        name: 'HTML',
        category: SkillCategory.LANGUAGES,
        level: 70,
        icon: 'html',
        color: '#E34F26',
        order: 17
    },
    {
        id: '18',
        name: 'CSS',
        category: SkillCategory.LANGUAGES,
        level: 70,
        icon: 'css',
        color: '#1572B6',
        order: 18
    },
    {
        id: '19',
        name: 'Dart',
        category: SkillCategory.LANGUAGES,
        level: 90,
        icon: 'dart',
        color: '#0175C2',
        order: 19
    },

    // Outils
    {
        id: '20',
        name: 'Git',
        category: SkillCategory.TOOLS,
        level: 70,
        icon: 'git',
        color: '#32f0e3ff',
        order: 20
    },
    {
        id: '21',
        name: 'GitHub',
        category: SkillCategory.TOOLS,
        level: 70,
        icon: 'github',
        color: '#181717',
        order: 21
    },

    // Méthodologies
    {
        id: '22',
        name: 'Agile',
        category: SkillCategory.METHODOLOGIES,
        level: 70,
        icon: 'agile',
        color: '#0093d7',
        order: 22
    },
    {
        id: '23',
        name: 'Scrum',
        category: SkillCategory.METHODOLOGIES,
        level: 70,
        icon: 'scrum',
        color: '#0093D7',
        order: 23
    },

    // Design
    {
        id: '24',
        name: 'Figma',
        category: SkillCategory.DESIGN,
        level: 30,
        icon: 'figma',
        color: '#f24f1e',
        order: 24
    }
];

/**
 * Fonction utilitaire pour obtenir les compétences par catégorie
 */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
    return SKILLS_DATA.filter(skill => skill.category === category)
        .sort((a, b) => b.level - a.level);
}

/**
 * Fonction utilitaire pour obtenir les compétences principales (niveau > 80)
 */
export function getTopSkills(): Skill[] {
    return SKILLS_DATA.filter(skill => skill.level > 80)
        .sort((a, b) => b.level - a.level);
}

/**
 * Fonction utilitaire pour obtenir toutes les catégories
 */
export function getAllCategories(): SkillCategory[] {
    return Object.values(SkillCategory);
}