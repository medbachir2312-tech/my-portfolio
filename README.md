# 🎨 Portfolio Angular - Moderne & Professionnel

Portfolio personnel moderne et professionnel développé avec **Angular 18** (dernière version), 100% frontend, sans backend.

## ✨ Fonctionnalités

### 🌐 Pages Publiques

- **🏠 Accueil** : Section hero avec présentation, projets en vedette et compétences principales
- **👤 À propos** : Présentation détaillée, parcours et soft skills
- **💼 Projets** : Galerie de projets avec filtres par catégorie
- **🛠️ Compétences** : Compétences techniques organisées par catégorie avec niveaux
- **📩 Contact** : Formulaire de contact avec validation

### 🔐 Partie Admin

- **🔑 Authentification** : Login simple (frontend uniquement)
- **📊 Dashboard** : Vue d'ensemble avec statistiques
- **✏️ Gestion des projets** : CRUD complet (Créer, Lire, Modifier, Supprimer)
- **🎯 Gestion des compétences** : CRUD complet
- **👨‍💼 Gestion du profil** : Modification des informations personnelles
- **💬 Messages** : Consultation des messages de contact

### 🎨 Fonctionnalités UX/UI

- ✅ Design moderne et professionnel
- ✅ Mode clair / Mode sombre (Dark/Light toggle)
- ✅ Responsive design (Desktop, Tablette, Mobile)
- ✅ Animations fluides et légères
- ✅ Smooth scroll entre les sections
- ✅ Typographie propre (Google Fonts - Inter)
- ✅ Palette de couleurs professionnelle
- ✅ Icons Font Awesome 6

## 🚀 Technologies

- **Framework** : Angular 18 (dernière version)
- **Language** : TypeScript 5.4
- **Styling** : SCSS avec variables CSS
- **Routing** : Angular Router avec lazy loading
- **Forms** : Reactive Forms
- **State Management** : RxJS (BehaviorSubject)
- **Storage** : LocalStorage (simulation backend)
- **Icons** : Font Awesome 6.4
- **Fonts** : Google Fonts (Inter)

## 📁 Structure du Projet

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/          # Composants réutilisables
│   │   │   ├── navbar/
│   │   │   └── footer/
│   │   ├── pages/               # Pages de l'application
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   ├── contact/
│   │   │   ├── not-found/
│   │   │   └── admin/
│   │   │       ├── login/
│   │   │       ├── dashboard/
│   │   │       ├── projects-admin/
│   │   │       ├── skills-admin/
│   │   │       ├── profile-admin/
│   │   │       └── messages/
│   │   ├── services/            # Services Angular
│   │   │   ├── auth.service.ts
│   │   │   ├── project.service.ts
│   │   │   ├── skill.service.ts
│   │   │   ├── profile.service.ts
│   │   │   ├── contact.service.ts
│   │   │   └── theme.service.ts
│   │   ├── guards/              # Route guards
│   │   │   └── auth.guard.ts
│   │   ├── models/              # Interfaces TypeScript
│   │   │   └── portfolio.model.ts
│   │   ├── data/                # Données statiques
│   │   │   ├── profile.data.ts
│   │   │   ├── projects.data.ts
│   │   │   └── skills.data.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/                  # Images et ressources
│   ├── styles.scss              # Styles globaux
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)

### Étapes d'installation

1. **Cloner le projet** (ou télécharger les fichiers)

```bash
cd c:\Users\Admin\Desktop\angular\portfolio
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer le serveur de développement**

```bash
npm start
```

4. **Ouvrir dans le navigateur**

```
http://localhost:4200
```

## 🎯 Utilisation

### Personnalisation du contenu

#### 1. Modifier les informations de profil

Éditez le fichier `src/app/data/profile.data.ts` :

```typescript
export const PROFILE_DATA: Profile = {
  fullName: 'Votre Nom',
  role: 'Votre Titre',
  introduction: 'Votre introduction...',
  email: 'votre.email@example.com',
  // ... autres informations
};
```

#### 2. Ajouter/Modifier des projets

Éditez le fichier `src/app/data/projects.data.ts` :

```typescript
export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Mon Projet',
    description: 'Description du projet',
    technologies: ['Angular', 'TypeScript'],
    // ... autres propriétés
  }
];
```

#### 3. Ajouter/Modifier des compétences

Éditez le fichier `src/app/data/skills.data.ts` :

```typescript
export const SKILLS_DATA: Skill[] = [
  {
    id: '1',
    name: 'Angular',
    category: SkillCategory.FRONTEND,
    level: 90,
    // ... autres propriétés
  }
];
```

### Accès à l'administration

1. Accédez à `/admin/login`
2. Utilisez les identifiants par défaut :
   - **Username** : `admin`
   - **Password** : `admin123`

⚠️ **Important** : Changez ces identifiants dans `src/app/services/auth.service.ts` pour la production !

### Changer le thème

Le toggle de thème est disponible dans la navbar. Le choix est sauvegardé dans le LocalStorage.

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/angular-portfolio/`.

## 🚀 Déploiement

### Déploiement sur Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Connectez votre repository GitHub
3. Configurez le build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist/angular-portfolio/browser`

### Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com/)
2. Importez votre projet
3. Vercel détectera automatiquement Angular

### Déploiement sur GitHub Pages

```bash
npm install -g angular-cli-ghpages
ng build --configuration production --base-href "/nom-du-repo/"
npx angular-cli-ghpages --dir=dist/angular-portfolio/browser
```

## 🎨 Personnalisation du design

### Modifier les couleurs

Éditez les variables CSS dans `src/styles.scss` :

```scss
:root {
  --color-primary: #6366f1;
  --color-secondary: #ec4899;
  --color-accent: #14b8a6;
  // ... autres couleurs
}
```

### Ajouter des animations

Utilisez les classes utilitaires :
- `.fade-in` : Animation de fondu
- `.slide-in-left` : Glissement depuis la gauche
- `.slide-in-right` : Glissement depuis la droite

## 📝 Données stockées

Toutes les données sont stockées dans le **LocalStorage** du navigateur :

- `portfolio_profile` : Informations du profil
- `portfolio_projects` : Liste des projets
- `portfolio_skills` : Liste des compétences
- `portfolio_messages` : Messages de contact
- `portfolio_theme` : Thème actif (light/dark)
- `portfolio_auth` : Credentials admin
- `portfolio_session` : Session admin

## 🔒 Sécurité

⚠️ **ATTENTION** : Ce portfolio utilise une authentification frontend basique pour la démonstration.

**Pour un usage en production** :
- Implémentez un vrai backend avec authentification sécurisée
- Utilisez JWT ou OAuth2
- Hashez les mots de passe
- Utilisez HTTPS
- Ajoutez une protection CSRF

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📄 Licence

Ce projet est libre d'utilisation pour vos portfolios personnels.

## 🙏 Remerciements

- Angular Team
- Font Awesome
- Google Fonts
- Communauté open source

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter via le formulaire de contact du portfolio.

---

**Fait avec ❤️ et Angular**
