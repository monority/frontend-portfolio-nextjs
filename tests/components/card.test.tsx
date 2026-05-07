import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill: _fill,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; fill?: boolean }) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

vi.mock('framer-motion', () => ({
  motion: {
    article: React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & {
      whileHover?: unknown
      transition?: unknown
    }>(
      ({ children, whileHover: _whileHover, transition: _transition, ...props }, ref) => (
        <article ref={ref} {...props}>
          {children}
        </article>
      )
    ),
  },
}))

import Card from '@/components/ui/card/Card'

describe('Card', () => {
  it('renders a linked stack card with content metadata', () => {
    render(
      <Card
        title="Human Work Force"
        description="Concept SaaS satirique"
        category="SaaS"
        year="2024"
        tags={['React', 'TypeScript']}
        href="/projects/human-work-force"
      />
    )

    expect(screen.getByRole('link', { name: /human work force/i })).toHaveAttribute(
      'href',
      '/projects/human-work-force'
    )
    expect(screen.getByText('Concept SaaS satirique')).toBeInTheDocument()
    expect(screen.getByText('SaaS')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders an overlay link and project image when configured', () => {
    render(
      <Card
        title="SkillSwap"
        layout="overlay"
        href="/projects/skillswap"
        image={{ src: '/skillswap.webp', alt: 'Apercu SkillSwap' }}
      />
    )

    expect(screen.getByRole('link', { name: 'SkillSwap' })).toHaveAttribute(
      'href',
      '/projects/skillswap'
    )
    expect(screen.getByAltText('Apercu SkillSwap')).toHaveAttribute('src', '/skillswap.webp')
  })
})
