import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../prisma/prisma';

export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}/auth/google/callback`
},
    async function (accessToken: string, refreshToken: string, profile: any, cb: any) {
        // check if the user with same email is there
        // if not then create new user
        console.log("HERE-", profile)
        try {
            const userExist = await db.user.findUnique({
                where: {
                    email: profile.emails[0].value
                }
            })

            if (userExist && userExist.google_id === profile.id) {
                return cb(null, { profile: profile, userId: userExist.id });
            }

            let user;
            if (userExist) {
                user = await db.user.update({
                    where: {
                        email: profile.emails[0].value
                    },
                    data: {
                        google_id: profile.id
                    }
                })
            }
            else {
                user = await db.user.create({
                    data: {
                        email: profile.emails[0].value,
                        google_id: profile.id
                    }
                })
            }
            return cb(null, { profile: profile, userId: user.id });
        } catch (error) {
            console.log(error);
            return cb(error);
        }
    }
);

