import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnEvents = nextUrl.pathname.startsWith('/events');
      // if (isOnEvents) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/events', nextUrl));
      // }
      if(isLoggedIn) return true;
      return false
    },
    redirect({url, baseUrl}){
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;