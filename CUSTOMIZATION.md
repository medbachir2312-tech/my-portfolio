# Guide de Personnalisation du Portfolio

Ce document vous guide pour personnaliser votre portfolio Angular.

## 📝 Modifier les Informations Personnelles

### 1. Profil Principal

Éditez `src/app/data/profile.data.ts` :

```typescript
export const PROFILE_DATA: Profile = {
  id: '1',
  fullName: 'Votre Nom Complet',
  role: 'Votre Titre Professionnel',
  introduction: 'Votre phrase d\'accroche...',
  about: 'Votre présentation détaillée...',
  journey: 'Votre parcours professionnel...',
  softSkills: [
    'Compétence 1',
    'Compétence 2',
    // ...
  ],
  email: 'votre.email@example.com',
  phone: '+33 X XX XX XX XX',
  location: 'Votre Ville, Pays',
  linkedin: 'https://linkedin.com/in/votre-profil',
  github: 'https://github.com/votre-username',
  twitter: 'https://twitter.com/votre-username',
  website: 'https://votre-site.com',
  avatar: '/assets/images/votre-photo.jpg',
  resumeUrl: '/assets/votre-cv.pdf'
};
```

### 2. Projets

Éditez `src/app/data/projects.data.ts` :

```typescript
export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Nom du Projet',
    description: 'Description courte',
    longDescription: 'Description détaillée...',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    category: ProjectCategory.FULLSTACK,
    githubUrl: 'https://github.com/...',
    demoUrl: 'https://demo.com',
    imageUrl: '/assets/projects/image.jpg',
    featured: true,
    status: ProjectStatus.COMPLETED,
    order: 1
  },
  // Ajoutez d'autres projets...
];
```

### 3. Compétences

Éditez `src/app/data/skills.data.ts` :

```typescript
export const SKILLS_DATA: Skill[] = [
  {
    id: '1',
    name: 'Nom de la compétence',
    category: SkillCategory.FRONTEND,
    level: 90, // 0-100
    icon: 'nom-icon',
    color: '#couleur-hex',
    order: 1
  },
  // Ajoutez d'autres compétences...
];
```

## 🎨 Personnaliser le Design

### Modifier les Couleurs

Éditez `src/styles.scss` :

```scss
:root {
  /* Couleurs principales */
  --color-primary: #6366f1;      // Couleur primaire
  --color-secondary: #ec4899;    // Couleur secondaire
  --color-accent: #14b8a6;       // Couleur d'accent
  
  /* Personnalisez selon vos préférences */
}
```

### Modifier les Polices

Dans `src/index.html`, changez l'import Google Fonts :

```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Puis dans `src/styles.scss` :

```scss
:root {
  --font-sans: 'VotrePolice', sans-serif;
}
```

## 🖼️ Ajouter des Images

1. Placez vos images dans `src/assets/images/`
2. Pour les projets : `src/assets/projects/`
3. Référencez-les dans vos données :

```typescript
imageUrl: '/assets/images/mon-image.jpg'
```

## 🔐 Changer les Identifiants Admin

Éditez `src/app/services/auth.service.ts` :

```typescript
private readonly DEFAULT_CREDENTIALS: AuthCredentials = {
  username: 'votre-username',
  password: 'votre-mot-de-passe-securise'
};
```

⚠️ **Important** : Pour la production, implémentez un vrai système d'authentification backend !

## 🌐 SEO et Meta Tags

Éditez `src/index.html` :

```html
<title>Votre Titre - Portfolio</title>
<meta name="description" content="Votre description...">
<meta name="keywords" content="vos, mots, clés">
<meta name="author" content="Votre Nom">
```

## 📱 Favicon

Remplacez `src/favicon.ico` par votre propre favicon.

## 🚀 Déploiement

### Préparer pour la Production

1. Vérifiez toutes vos données
2. Testez localement : `npm start`
3. Build production : `npm run build`

### Netlify

1. Créez un fichier `netlify.toml` :

```toml
[build]
  command = "npm run build"
  publish = "dist/angular-portfolio/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Déployez via l'interface Netlify

### Vercel

Vercel détecte automatiquement Angular. Assurez-vous juste que :
- Build Command: `npm run build`
- Output Directory: `dist/angular-portfolio/browser`

## 📊 Analytics (Optionnel)

Pour ajouter Google Analytics :

1. Dans `src/index.html`, ajoutez avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Conseils

1. **Images** : Optimisez vos images (max 500KB par image)
2. **Contenu** : Soyez concis et professionnel
3. **Tests** : Testez sur mobile, tablette et desktop
4. **Performance** : Utilisez Lighthouse pour vérifier les performances
5. **Accessibilité** : Vérifiez que votre site est accessible

## 🆘 Problèmes Courants

### Le site ne se lance pas

```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
npm start
```

### Erreurs de build

```bash
# Nettoyez le cache Angular
rm -rf .angular
npm run build
```

### Les données ne s'affichent pas

Vérifiez que :
1. Les services sont bien injectés
2. Les données dans `/data` sont correctes
3. Le LocalStorage n'est pas plein

## 📞 Support

Pour toute question, consultez :
- [Documentation Angular](https://angular.io/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/angular)

---

**Bon développement ! 🚀**
