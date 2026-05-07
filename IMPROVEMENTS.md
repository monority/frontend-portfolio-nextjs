# Plan d'améliorations — Portfolio

## Hero

### 1. Headline
- [ ] Remplacer "Creative Developer" par une phrase à valeur claire
- [ ] Exemple : `"I build fast, clean interfaces"` ou tagline personnelle



### 3. CTA primaire
- [ ] Ajouter bouton visible above the fold
- [ ] Option A : `"See my work"` → `#projects`

### 4. Animation d'entrée (Framer Motion)
- [ ] Ajouter `staggerChildren` sur titre + description + CTA
- [ ] Cohérent avec les animations des sections About / Projects

### 5. Badges tech
- [ ] Supprimer ou repositionner — redondants avec section About
- [ ] Alternative : remplacer par tagline ou stat courte

### 6. Avatar
- [ ] Ajouter léger parallax au scroll ou `whileHover` scale sur l'image

---

## Navigation & UX

### 7. SideNav active state
- [ ] Highlighter la section active selon la position scroll (`IntersectionObserver`)

### 8. Skip-to-content
- [ ] Ajouter lien d'accessibilité avant `<Header>` (`<a href="#main-content">`)

---

## Contenu & SEO

### 9. Metadata SEO
- [ ] Vérifier export `metadata` dans `app/[locale]/layout.tsx`
- [ ] Ajouter `<title>` et `<meta name="description">` par locale

### 10. Open Graph
- [ ] Créer image OG (`public/og-image.png`, 1200×630)
- [ ] Configurer `og:title`, `og:description`, `og:image` dans metadata

---

## Sections

### 11. Section Profile
- [ ] Dossier `sections/profile/` semble vide — terminer ou retirer du layout `page.tsx`

### 12. Messaging / Contact
- [ ] Feature messaging existe (`features/messaging/`) mais peu visible


---

## Tech / Code

### 13. Hero — client boundary
- [ ] `Hero.tsx` marqué `"use client"` sans interactivité réelle
- [ ] Si `next-intl` server-side possible → retirer boundary, gain perf

### 14. CSS token hero
- [ ] `min-height: calc(100vh - var(--space) * 32)` → fragile
- [ ] Migrer vers token dédié `--hero-min-height`

---

## Priorité suggérée

1. Headline + CTA
2. Animation entrée hero
3. SEO metadata + Open Graph
4. SideNav active state
5. Section Profile (finir ou supprimer)
6. Messaging CTA visible
