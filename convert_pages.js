```javascript
import fs from 'fs';

const pages = [
    { file: 'AboutUs_page', route: 'tentang-kami' },
    { file: 'Donasi_page', route: 'donasi' },
    { file: 'PSB_page', route: 'psb' },
    { file: 'Transparansi_page', route: 'transparansi' },
    { file: 'postarchive_page', route: 'berita/index' },
    { file: 'post_page', route: 'berita/[slug]' }
];

pages.forEach(({ file, route }) => {
    try {
        // Read original HTML
        const html = fs.readFileSync(`theme_html / ${ file } `, 'utf8');

        // Extract title
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'Al-Bisri';

        // Extract body content
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
        if (!bodyMatch) {
            console.log(`❌ No body found in ${ file } `);
            return;
        }

        let body = bodyMatch[1];

        // Remove nav and footer
        body = body.replace(/<nav[\s\S]*?<\/nav>/g, '');
        body = body.replace(/<footer[\s\S]*?<\/footer>/g, '');

        // Replace all .html links with Astro routes
        body = body.replace(/index\.html/g, '/');
        body = body.replace(/psb\.html/g, '/psb');
        body = body.replace(/donation\.html/g, '/donasi');
        body = body.replace(/academy\.html/g, '/akademi');
        body = body.replace(/transparency\.html/g, '/transparansi');
        body = body.replace(/about\.html/g, '/tentang-kami');

        // Create Astro file
        const astro = `-- -
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';
---

< !DOCTYPE html >
    <html lang="id" class="scroll-smooth">

        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script src="https://unpkg.com/lucide@latest"></script>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700;800&display=swap"
                        rel="stylesheet">

                        <script>
                            tailwind.config = {
                                theme: {
                                extend: {
                                colors: {
                                royal: {50: '#f0fdf4', 100: '#dcfce7', 800: '#166534', 900: '#14532d', 950: '#052e16' },
                            gold: {100: '#fef9c3', 400: '#d4af37', 500: '#b4941f', 600: '#8c7318' },
                            paper: '#FAFAF9',
                    },
                            fontFamily: {
                                sans: ['Cormorant Garamond', 'serif'],
                            display: ['Cinzel', 'serif'],
                    },
                            borderRadius: {'4xl': '2.5rem', '5xl': '3rem' }
                }
            }
        }
                        </script>

                        <style>
                            body {
                                background - color: #FAFAF9;
                            color: #1c1917;
                            font-family: 'Cormorant Garamond', serif;
                            font-size: 1.15rem;
                            overflow-x: hidden;
        }

                            h1,
                            h2,
                            h3,
                            .font-display {
                                font - family: 'Cinzel', serif;
        }

                            .royal-pattern {
                                background - color: #FAFAF9;
                            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

                            .fade-up {
                                animation: fadeUp 1s ease-out forwards;
                            opacity: 0;
                            transform: translateY(30px);
        }

                            .delay-100 {
                                animation - delay: 0.1s;
        }

                            .delay-200 {
                                animation - delay: 0.2s;
        }

                            .delay-300 {
                                animation - delay: 0.3s;
        }

                            @keyframes fadeUp {
                                to {
                                opacity: 1;
                            transform: translateY(0);
            }
        }

                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
        }

                            .no-scrollbar {
                                -ms - overflow - style: none;
                            scrollbar-width: none;
        }

                            @keyframes float {
                                0 %, 100 % {
                                    transform: translateY(0px);
                                }
            50% {
                                transform: translateY(-10px);
            }
        }

                            .animate-float {
                                animation: float 3s ease-in-out infinite;
        }
                        </style>
                    </head>

                    <body class="antialiased royal-pattern">

                        <Navigation />

                        ${body}

                        <Footer />

                        <script>
                            lucide.createIcons();
                        </script>
                    </body>

                </html>`;

                // Write Astro file
                fs.writeFileSync(`landing-page/src/pages/${route}.astro`, astro);
                console.log(`✅ Created ${route}.astro`);

    } catch (error) {
                    console.log(`❌ Error processing ${file}:`, error.message);
    }
});

                console.log('\n✅ All pages converted!');
