import type { Quality } from '@shared-types'

export const QUALITIES: Quality[] = [
  {
    id: 'screens',
    number: '01',
    title: { fr: 'Écrans & parcours', en: 'Screens & flows' },
    description: { fr: 'Interfaces qui tiennent dans le temps.', en: 'Interfaces built to last.' },
  },
  {
    id: 'components',
    number: '02',
    title: { fr: 'Composants', en: 'Components' },
    description: { fr: 'Briques réutilisables, cohérentes.', en: 'Reusable, consistent building blocks.' },
  },
  {
    id: 'backend',
    number: '03',
    title: { fr: 'Branchement', en: 'Integration' },
    description: { fr: 'APIs et logique métier.', en: 'APIs and business logic.' },
  },
  {
    id: 'finish',
    number: '04',
    title: { fr: 'Finition', en: 'Polish' },
    description: { fr: 'Responsive, accessibilité, détails.', en: 'Responsive, a11y, details.' },
  },
]