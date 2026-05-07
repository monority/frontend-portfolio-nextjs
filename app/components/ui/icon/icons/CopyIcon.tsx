'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const CopyIcon = React.memo(({
    size = 24,
    className = '',
    title,
    ...props
}: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            {...props}
        >
            {title && <title>{title}</title>}
            <path
                d="M8 7.5C8 6.11929 9.11929 5 10.5 5H18.5C19.8807 5 21 6.11929 21 7.5V15.5C21 16.8807 19.8807 18 18.5 18H10.5C9.11929 18 8 16.8807 8 15.5V7.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.75 15.75C3.7835 15.75 3 14.9665 3 14V5.5C3 4.11929 4.11929 3 5.5 3H14C14.9665 3 15.75 3.7835 15.75 4.75"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
})

CopyIcon.displayName = 'CopyIcon'

export default CopyIcon
