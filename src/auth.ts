import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { config } from "dotenv";
import { VerifyCallback } from 'passport-oauth2';

config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/google/callback",
  },
  function(accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
    return cb(null, profile);
  }
));

type User = Express.User;

passport.serializeUser((user: User, done: (err: any, id?: unknown) => void) => {
    done(null, user);
});

passport.deserializeUser((user: User, done: (err: any, user?: Express.User | false | null) => void) => {
    done(null, user);
});
