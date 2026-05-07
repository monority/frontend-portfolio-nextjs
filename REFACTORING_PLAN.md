# Plan de Refactorisation - Portfolio Next.js

> Statut : archive historique.
> Référence actuelle : `refactor-structure.md`.
> Ce document garde ancien déroulé de travail, mais baseline structurelle 2026 vit dans `refactor-structure.md`.

## Vue d'ensemble

Projet : Portfolio Ronan Chenu (Creative Developer)
Tech stack : Next.js 16, React 19, Framer Motion, CSS Modules (PostCSS)

---

## 1. CSS / Design Tokens

### 1.1 Fixes critiques

| # | Action | Fichier | Status |
|---|--------|--------|--------|
| 1.1.1 | Ajouter `--line-height-base` manquant (utilisé dans hero.css) | `tokens.css` | ✅ |
| 1.1.2 | Ajouter `--bp-sm`, `--bp-md`, `--bp-lg`, `--bp-xl` breakpoints | `tokens.css` | ✅ |
| 1.1.3 | Ajouter `--dot-size` pour les indicateurs (0.625rem, 0.45rem) | `tokens.css` | ✅ |

### 1.2 Layout - Classes utilitaires

| # | Action | Fichier | Status |
|---|--------|--------|--------|
| 1.2.1 | Créer `.shell` - wrapper de section générique | `layout.css` | ✅ |
| 1.2.2 | Créer `.font-mono` - typo mono partagée | `layout.css` | ✅ |
| 1.2.3 | Créer `.interactive` - hover/border/transform | `layout.css` | ✅ |

**Structure proposée :**
```css
.shell { display: grid; gap: var(--space-xl); padding-block: var(--space-xl); }
.font-mono { font-family: var(--font-family-mono); }
.interactive { transition: border-color var(--transition-base), transform 200ms ease; }
.interactive:hover { border-color: var(--foreground); transform: translateY(-2px); }
```

### 1.3 Nettoyage CSS

| # | Action | Fichier | Status |
|---|--------|--------|--------|
| 1.3.1 | Supprimer `.hero-header__skills` (jamais utilisé) | `hero.css` | ✅ |
| 1.3.2 | Supprimer sélecteurs span/h2/p génériques (hero.css:57-61) | `hero.css` | ✅ |

---

## 2. Composants JSX

### 2.1 Animations centralisées

| # | Action | Fichier | Status |
|---|--------|--------|--------|
| 2.1.1 | Créer hook `useSectionAnimations()` | `hooks/useSectionAnimations.ts` | ✅ |
| 2.1.2 | Mettre à jour Hero.tsx | `Hero.tsx` | ✅ |
| 2.1.3 | Mettre à jour About.tsx | `About.tsx` | ✅ |
| 2.1.4 | Mettre à jour Profile.tsx | `Profile.tsx` | ✅ |
| 2.1.5 | Mettre à jour Projects.tsx | `Projects.tsx` | ✅ |

### 2.2 Données externalisées

| # | Action | Fichier | Status |
|---|--------|--------|--------|
| 2.2.1 | Déplacer `marqueeItems` près section About | `app/[locale]/sections/about/data.ts` | ✅ |
| 2.2.2 | Mettre à jour About.tsx | `About.tsx` | ✅ |

### 2.3 Optimisations

| # | Action | Fichier | Status |
|---|--------|--------|--------|
| 2.3.1 | Supprimer `capitalizeFirstLetter` composant | supprimé | ✅ |
| 2.3.2 | Ajouter `React.memo` à ActionLink | `ActionLink.tsx` | ✅ |
| 2.3.3 | Renforcer types ButtonProps | `button.tsx` | ✅ |

---

## 3. Structure

### 3.1 Réorganisation fichiers

| # | Action | Status |
|---|--------|--------|
| 3.1.1 | Créer dossier `hooks/` | ✅ |
| 3.1.2 | Renommer `layout.css` → `layout.css` (remplir le fichier) | ✅ |

---

## 4. Application progressive

Les changements seront aplicados composant par composant :

1. **Hero** → `.shell`, `useSectionAnimations()`
2. **About** → `.shell`, `useSectionAnimations()`, `marqueeItems` externalisé
3. **Profile** → `.shell`, `useSectionAnimations()`
4. **Projects** → `.shell`, `useSectionAnimations()`
5. **Header** → `.shell` (optionnel)

---

## 5. Non-intrusif - Design préservé

⚠️ **Règles :**
- Ne jamais modifier les couleurs, espacements ou typhographie
- Utiliser uniquement les tokens existants
- Tester visuellement après chaque changement

---

## Historique

- **2025-04-24** : Plan initial créé
- **2025-04-24** : Phase 1 complète - Build OK
- **2025-04-24** : Breakpoints CSS via @custom-media - Build OK

---

## Résumé des changements

### CSS / Tokens
- ✅ `tokens.css` - ajout `--line-height-base`, breakpoints (`--bp-*`), `--dot-size-*`
- ✅ `layout.css` - nouvelles classes `.shell`, `.font-mono`, `.interactive`, `.sr-only`
- ✅ `hero.css` - supprimé `.hero-header__skills` + sélecteurs génériques `span/h2/p`
- ✅ **Breakpoints** - Remplacé tous les `(min-width: 768px)` etc par `@custom-media --bp-*`

### Composants
- ✅Nouveau hook `useSectionAnimations()` dans `app/hooks/useSectionAnimations.ts`
- ✅ `app/[locale]/sections/about/data.ts` - `MARQUEE_ITEMS` now colocated with About section
- ✅ `About.tsx` - utilise `MARQUEE_ITEMS` depuis constants
- ✅ `ActionLink` - ajouté `React.memo`
- ✅ `button.css` - `.btn-tech` + `font-family-mono`

### Build
- ✅ `npm run build` successful