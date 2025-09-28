import passport from 'passport';
import { googleStrategy } from './googleStrategy';
import type { CookieOptions } from 'express';
import { localStrategy } from './customStrategy';

export const cookieObj: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'lax'
}
passport.use(googleStrategy);
passport.use(localStrategy);

export default passport;