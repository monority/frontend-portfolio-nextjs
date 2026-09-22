'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const LuaIcon = React.memo(({ size = 24, className = '', title, ...props }: IconProps) => (
    <svg
        {...(size !== undefined && { width: size, height: size })}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden={title ? undefined : true}
        role={title ? 'img' : undefined}
        {...props}
    >
        {title && <title>{title}</title>}
        <circle cx="12" cy="12" r="10" fill="#6b4fa1" />
        <path d="M7.2 15.8h5.2v1.4H5.8V6.8h1.4v9Z" fill="#fff" />
        <path d="M15.8 6.8a3.2 3.2 0 1 0 0 6.4h1v4h1.4v-4h.8v-1.4h-.8v-1.8h-1.4v1.8h-1a1.8 1.8 0 1 1 0-3.6h2V6.8h-2Z" fill="#fff" />
    </svg>
))

LuaIcon.displayName = 'LuaIcon'

export default LuaIcon
