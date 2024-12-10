// import { createServerClient } from '@supabase/ssr';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function updateSession(request: NextRequest) {
//   console.log("Middleware triggered for:", request.nextUrl.pathname);

//   let supabaseResponse = NextResponse.next();

//   // Normalize `/Profile` to `/profile`
//   const url = request.nextUrl.clone();
//   if (url.pathname === '/Profile') {
//     console.log("Redirecting /Profile to /profile");
//     url.pathname = '/profile';
//     return NextResponse.redirect(url);
//   }

//   // Create a Supabase client with cookies integration
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             console.log(`Setting cookie: ${name}=${value}`, options)
//           );
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           );
//         },
//       },
//     }
//   );

//   console.log("Middleware - Checking Supabase user session...");

//   // Fetch the current user session
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Allow public routes without redirection
//   const publicRoutes = ['/', '/login', '/signup', '/posts', '/profile'];
//   if (publicRoutes.includes(request.nextUrl.pathname)) {
//     console.log("Public route, skipping redirection.");
//     return supabaseResponse;
//   }

//   // Redirect unauthenticated users to /login
//   if (!user) {
//     url.pathname = '/login';
//     console.log('Redirecting unauthenticated user to /login');
//     return NextResponse.redirect(url);
//   }

//   console.log("Middleware - User found:", user.email);

//   return supabaseResponse;
// }

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|eot|css|js)$).*)',
//     '/private',
//     '/posts/:path*',
//     '/Profile', // Normalize `/Profile`
//     '/profile/:path*', // Handle `/profile` and its subpaths
//   ],
// };
