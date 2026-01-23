import fs from 'fs';

// Create berita directory if it doesn't exist
if (!fs.existsSync('landing-page/src/pages/berita')) {
    fs.mkdirSync('landing-page/src/pages/berita', { recursive: true });
}

const blogPages = [
    { file: 'postarchive_page', route: 'berita/index' },
    { file: 'post_page', route: 'berita/[slug]' }
];

blogPages.forEach(({ file, route }) => {
    try {
        const html = fs.readFileSync(`theme_html/${file}`, 'utf8');
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'Al-Bisri';

        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
        if (!bodyMatch) {
            console.log(`❌ No body found in ${file}`);
            return;
        }

        let body = bodyMatch[1];
        body = body.replace(/<nav[\s\S]*?<\/nav>/g, '');
        body = body.replace(/<footer[\s\S]*?<\/footer>/g, '');
        body = body.replace(/index\.html/g, '/');
        body = body.replace(/psb\.html/g, '/psb');
        body = body.replace(/donation\.html/g, '/donasi');
        body = body.replace(/academy\.html/g, '/akademi');
        body = body.replace(/transparency\.html/g, '/transparansi');
        body = body.replace(/about\.html/g, '/tentang-kami');
        body = body.replace(/news_detail\.html/g, '/berita/example-post');

        const astro = `---
import Navigation from '../../components/Navigation.astro';
import Footer from '../../components/Footer.astro';
---

<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        royal: { 50: '#f0fdf4', 100: '#dcfce7', 800: '#166534', 900: '#14532d', 950: '#052e16' },
                        gold: { 100: '#fef9c3', 400: '#d4af37', 500: '#b4941f', 600: '#8c7318' },
                    },
                    fontFamily: {
                        serif: ['Cormorant Garamond', 'serif'],
                        display: ['Cinzel', 'serif'],
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <style>
        body { background-color: #FAFAF9; color: #1c1917; font-family: 'Plus Jakarta Sans', sans-serif; }
        .royal-pattern { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .article-content { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; line-height: 2; color: #44403c; }
        .article-content p { margin-bottom: 1.5rem; }
        .article-content h2 { font-family: 'Cinzel', serif; font-size: 1.8rem; color: #14532d; margin-top: 3rem; margin-bottom: 1rem; }
        .article-content blockquote { border-left: 4px solid #d4af37; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #1c1917; font-size: 1.4rem; }
        .article-content img { border-radius: 1rem; margin: 2rem 0; width: 100%; }
    </style>
</head>
<body class="antialiased royal-pattern">
    <Navigation />
${body}
    <Footer />
    <script>lucide.createIcons();</script>
</body>
</html>`;

        fs.writeFileSync(`landing-page/src/pages/${route}.astro`, astro);
        console.log(`✅ Created ${route}.astro`);

    } catch (error) {
        console.log(`❌ Error processing ${file}:`, error.message);
    }
});

console.log('\n✅ Blog pages converted!');
