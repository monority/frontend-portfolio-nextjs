import type { IconName } from '@shared-types/icons'

import { SVGAttributes } from 'react'

export interface IconProps extends SVGAttributes<SVGElement> {
    /**
     * Taille de l'icône en pixels (ignoré si sizeClass est fourni)
     * @default 24
     */
    size?: number | string

    /**
     * Classe CSS pour la taille de l'icône (remplace size)
     * Valeurs: 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl' | 'icon-2xl'
     */
    sizeClass?: 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl' | 'icon-2xl'

    /**
     * Classes CSS supplémentaires
     */
    className?: string

    /**
     * Titre pour l'accessibilité (rend l'icône accessible)
     */
    title?: string
}

export type { IconName }
