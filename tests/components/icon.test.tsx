import { render, screen } from '@testing-library/react'

import Icon from '@/components/ui/icon/Icon'
import type { IconName } from '@shared-types/icons'

describe('Icon', () => {
  it('renders the requested icon with accessibility metadata', () => {
    render(<Icon name="github" title="GitHub" size={32} className="custom-icon" />)

    const icon = screen.getByRole('img', { name: 'GitHub' })

    expect(icon).toHaveClass('icon', 'custom-icon')
    expect(icon).toHaveStyle({ width: '32px', height: '32px' })
  })

  it('prefers sizeClass over inline dimensions', () => {
    render(<Icon name="message" title="Message" size={40} sizeClass="icon-lg" />)

    expect(screen.getByRole('img', { name: 'Message' })).toHaveClass('icon', 'icon-lg')
  })

  it('returns nothing when the icon name is missing from the registry', () => {
    const { container } = render(<Icon name={'missing' as IconName} title="Missing" />)

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByRole('img', { name: 'Missing' })).not.toBeInTheDocument()
  })
})
