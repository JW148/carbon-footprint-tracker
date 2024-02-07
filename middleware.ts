import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
//used to specify the routes that should be protected
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/events'],
};