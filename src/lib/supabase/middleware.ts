import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // getUser(). A simple mistake can make it very hard to debug
    // issues with sessions being lost.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Define public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/login',
        '/auth',
        '/berita',
        '/profil',
        '/kontak',
        '/galeri',
        '/program',
        '/psb',
        '/donasi',
        '/dukungan',
        '/access-denied'
    ]

    // Check if current path is a public route or starts with a public route
    const isPublicRoute = publicRoutes.some(route =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + '/')
    )

    // Only redirect to login if:
    // 1. User is not authenticated
    // 2. Route is not public
    // 3. Route is not an API route or static file
    if (
        !user &&
        !isPublicRoute &&
        !request.nextUrl.pathname.startsWith('/api') &&
        !request.nextUrl.pathname.startsWith('/_next')
    ) {
        // Redirect to login page
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Permission Logic for authenticated users
    if (user) {
        // Module slug extraction
        const pathParts = request.nextUrl.pathname.split('/').filter(Boolean)
        const moduleSlug = pathParts[0]

        // Core modules that are always allowed if logged in
        const coreModules = ['dashboard', 'profile', 'users', 'website']

        if (moduleSlug && !coreModules.includes(moduleSlug)) {
            // Check roles and permissions
            // We can do this in the middleware, but better to do it in the layout or page
            // to avoid excessive DB calls in every request. 
            // For now, allow through and handle in layout.
        }
    }

    return supabaseResponse
}
