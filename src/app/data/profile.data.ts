import { Profile } from '../models/portfolio.model';

/**
 * Données du profil personnel
 * Modifiez ces informations pour personnaliser votre portfolio
 */
export const PROFILE_DATA: Profile = {
  id: '1',
  fullName: 'Mohamed Bechir Elleuch',
  role: 'Développeur Full Stack',
  introduction: 'Passionné par le développement web moderne et les technologies innovantes. Je crée des applications web performantes et élégantes.',
  about: `Je suis un développeur full stack passionné avec une expertise dans les technologies modernes du web. 
  Mon objectif est de créer des applications web performantes, accessibles et esthétiques qui offrent une excellente expérience utilisateur.`,
  journey: `Mon parcours dans le développement web a commencé il y a plusieurs années. 
  J'ai acquis une solide expérience en travaillant sur divers projets, allant des sites web statiques aux applications web complexes.
  Je suis constamment à la recherche de nouvelles technologies et de meilleures pratiques pour améliorer mes compétences.`,
  softSkills: [
    'Résolution de problèmes',
    'Travail d\'équipe',
    'Communication',
    'Gestion du temps',
    'Adaptabilité',
    'Créativité',
    'Pensée critique',
    'Leadership'
  ],
  email: 'elleuchmohamedbechir@gmail.com',
  phone: '+216 99 573 034',
  location: 'Sfax, Tunisie',
  linkedin: 'https://www.linkedin.com/in/mohamed-bechir-elleuch-4821b0384/',
  github: 'https://github.com/votre-username',
  twitter: '',
  website: '',
  avatar: 'assets/images/avatar.png',
  resumeUrl: 'assets/cv.pdf'
};
