import passport from 'passport';
import { googleStrategy } from './googleStrategy';
import type { CookieOptions } from 'express';
import { localStrategy } from './customStrategy';

const cookieObj: CookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
}
if (process.env.NODE_ENV === 'production') {
    cookieObj.domain = ".himanshuk.in";
    cookieObj.path = '/';
}
export { cookieObj };
passport.use(googleStrategy);
passport.use(localStrategy);

export default passport;