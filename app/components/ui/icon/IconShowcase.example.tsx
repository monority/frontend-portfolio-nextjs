'use client'

import React from 'react'
import { Icon } from '@/components/ui/icon'
export function IconShowcase() {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-lg font-semibold mb-4">Tailles standard (24px)</h2>
                <div className="flex flex-wrap gap-4">
                    <Icon name="github" size={24} title="GitHub" className="text-gray-700" />
                    <Icon name="linkedin" size={24} title="LinkedIn" className="text-blue-600" />
                    <Icon name="email" size={24} title="Email" className="text-red-500" />
                    <Icon name="location" size={24} title="Location" className="text-purple-500" />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-4">
                    <Icon name="react" size={32} title="React" />
                    <Icon name="nextjs" size={32} title="Next.js" />
                    <Icon name="typescript" size={32} title="TypeScript" />
                    <Icon name="node" size={32} title="Node.js" />
                    <Icon name="docker" size={32} title="Docker" />
                    <Icon name="sql" size={32} title="SQL" />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Autres icônes</h2>
                <div className="flex flex-wrap gap-4">
                    <Icon name="figma" size={28} />
                    <Icon name="firebase" size={28} />
                    <Icon name="vercel" size={28} />
                    <Icon name="supabase" size={28} />
                    <Icon name="theme" size={28} />
                    <Icon name="time" size={28} />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Tailles personnalisées</h2>
                <div className="flex items-center gap-8">
                    <Icon name="ai" size={16} title="Petite" />
                    <Icon name="ai" size={24} title="Moyenne" />
                    <Icon name="ai" size={40} title="Grande" />
                    <Icon name="ai" size={56} title="Très grande" />
                </div>
            </section>

            {/* Section: Tailles via classes CSS */}
            <section>
                <h2 className="text-lg font-semibold mb-4">Tailles via classes CSS</h2>
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <Icon name="ai" sizeClass="icon-xs" title="Extra small" className="text-blue-500" />
                        <p className="text-xs mt-1">icon-xs (16px)</p>
                    </div>
                    <div className="text-center">
                        <Icon name="ai" sizeClass="icon-sm" title="Small" className="text-blue-500" />
                        <p className="text-xs mt-1">icon-sm (20px)</p>
                    </div>
                    <div className="text-center">
                        <Icon name="ai" sizeClass="icon-md" title="Medium" className="text-blue-500" />
                        <p className="text-xs mt-1">icon-md (24px)</p>
                    </div>
                    <div className="text-center">
                        <Icon name="ai" sizeClass="icon-lg" title="Large" className="text-blue-500" />
                        <p className="text-xs mt-1">icon-lg (32px)</p>
                    </div>
                    <div className="text-center">
                        <Icon name="ai" sizeClass="icon-xl" title="Extra large" className="text-blue-500" />
                        <p className="text-xs mt-1">icon-xl (40px)</p>
                    </div>
                </div>
            </section>

            {/* Section: Couleurs prédéfinies */}
            <section>
                <h2 className="text-lg font-semibold mb-4">Couleurs prédéfinies</h2>
                <div className="flex gap-4">
                    <Icon name="github" sizeClass="icon-lg" className="icon-primary" title="Primary" />
                    <Icon name="linkedin" sizeClass="icon-lg" className="icon-secondary" title="Secondary" />
                    <Icon name="email" sizeClass="icon-lg" className="icon-success" title="Success" />
                    <Icon name="location" sizeClass="icon-lg" className="icon-error" title="Error" />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Avec styles Tailwind</h2>
                <div className="flex gap-4">
                    <Icon
                        name="github"
                        size={32}
                        className="text-white bg-gray-900 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        title="GitHub Profile"
                    />
                    <Icon
                        name="linkedin"
                        size={32}
                        className="text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        title="LinkedIn Profile"
                    />
                </div>
            </section>
        </div>
    )
}
