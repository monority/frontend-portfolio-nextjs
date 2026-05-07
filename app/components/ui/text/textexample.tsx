import Text from '@/components/ui/text'

// Variants

function TextExample() {
    return (
        <>
            <Text variant="display">Big title</Text>
            <Text variant="eyebrow">03 — Projects</Text>
            <Text variant="lead">Intro paragraph, larger and muted.</Text>
            <Text variant="heading" as="h2">Section heading</Text>
            <Text variant="subheading" as="h3">Sub-section</Text>
            <Text variant="body">Normal paragraph copy.</Text>
            <Text variant="small" color="secondary">Meta info</Text>
            <Text variant="caption">Timestamp · Label</Text>
            <Text variant="mono">console.log(&quot;code feel&quot;)</Text>

            <Text variant="heading" weight="semibold" align="balance" color="secondary">
                Balanced muted heading
            </Text>

            <Text variant="body" truncate>Long string that must not wrap…</Text>
            <Text variant="body" clamp={3}>Multi-line clamped at 3 rows text...</Text>

            <Text variant="eyebrow" srOnly>Section: Projects</Text>

            <Text variant="body" as="span">Inline context</Text>
        </>

    )
}