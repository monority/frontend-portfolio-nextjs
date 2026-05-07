import Link from 'next/link'
import { memo } from 'react'
import { Icon } from '@/components/ui/icon'
import type { IconName } from '@shared-types/icons'
import './action-link.css'

type ActionLinkVariant = 'solid' | 'ghost'
type ActionLinkSize = 'sm' | 'md'

export interface ActionLinkProps {
  href: string
  label: string
  ariaLabel?: string
  icon?: IconName
  variant?: ActionLinkVariant
  size?: ActionLinkSize
  className?: string
  external?: boolean
}

function ActionLink({
  href,
  label,
  ariaLabel,
  icon,
  variant = 'solid',
  size = 'sm',
  className = '',
  external,
}: ActionLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href)
  const classes = ['action-link', `action-link--${variant}`, `action-link--${size}`, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon ? <Icon name={icon} sizeClass="icon-xs" aria-hidden="true" className="action-link__icon" /> : null}
      <span>{label}</span>
    </>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  )
}

export default memo(ActionLink)
