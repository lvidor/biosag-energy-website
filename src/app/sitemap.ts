import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://biosag-energy.rs'
    const locales = ['hu', 'sr']

    // Fetch projects from Sanity to include them in the sitemap
    let projects: { slug: string; lastModified: string }[] = []
    try {
        projects = await client.fetch(`*[_type == "project"] {
            "slug": slug.current,
            "lastModified": _updatedAt
        }`)
    } catch (error) {
        console.error('Error fetching projects for sitemap:', error)
    }

    const staticRoutes = ['', '#o-nama', '#usluge', '#projekti', '#kontakt', 'shop']

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Add static routes for each locale
    locales.forEach((locale) => {
        staticRoutes.forEach((route) => {
            const isHome = route === ''
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${isHome ? '' : `/${route}`}`,
                lastModified: new Date(),
                changeFrequency: isHome ? 'weekly' : 'monthly',
                priority: isHome ? 1 : 0.8,
            })
        })
    })

    // Add individual project pages
    projects.forEach((project) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/projekti/${project.slug}`,
                lastModified: new Date(project.lastModified),
                changeFrequency: 'monthly',
                priority: 0.6,
            })
        })
    })

    // Add individual product pages
    try {
        const products = await client.fetch(`*[_type == "product"] { "slug": slug.current, "lastModified": _updatedAt }`)
        products.forEach((product: any) => {
            locales.forEach((locale) => {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/shop/${product.slug}`,
                    lastModified: new Date(product.lastModified),
                    changeFrequency: 'monthly',
                    priority: 0.7,
                })
            })
        })
    } catch (error) {
        console.error('Error fetching products for sitemap:', error)
    }

    // Add individual blog posts
    try {
        const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current, "lastModified": _updatedAt }`)
        posts.forEach((post: any) => {
            locales.forEach((locale) => {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/blog/${post.slug}`,
                    lastModified: new Date(post.lastModified),
                    changeFrequency: 'monthly',
                    priority: 0.5,
                })
            })
        })
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error)
    }

    return sitemapEntries
}
