import { Helmet } from 'react-helmet-async';

interface SeoProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export function SeoHead({
    title = "Uganda Elections 2026 Dashboard",
    description = "Real-time visualization and analytics for the 2026 Uganda Presidential and Parliamentary elections. Explore interactive maps, region-wise data, and live results.",
    image = "/uganda-flag.svg",
    url = "https://uganda-elections-2026.app"
}: SeoProps) {
    const siteTitle = "Uganda Elections 2026";
    const fullTitle = title === siteTitle || title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Basic */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="Uganda Elections 2026, Uganda Politics, Election Results, Presidential Election, Parliamentary Election, Uganda Map, Voting Statistics" />
            <meta name="author" content="Uganda Elections 2026 Dashboard" />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
