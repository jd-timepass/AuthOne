import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
//IMPORTANT DOUBT AND ERROR : https://chatgpt.com/share/694652f4-6dd4-8006-a1b4-301cb07f56d3

export function sessionMiddleware() {
    return session({
        //Name of the session ID cookie sent to the client
        name: 'sid',
        //Secret-key used to sign the session ID cookie (from environment variables for security)
        secret: process.env.SESSION_SECRET,
        //Forces session to be saved even if unmodified; set to false to reduce server load
        resave: false,
        //Forces uninitialized session to be saved; set to false for login sessions and legal reasons for cookies without consent
        saveUninitialized: false,
        cookie: {
            // blocks js access to cookies --> saves from XSS Attack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Prevents client-side JS from accessing the cookie, protecting against XSS attacks
            httpOnly: true,
            //Ensures cookie is only sent over HTTPS, protecting against man-in-the-middle attacks
            secure: false,
            //CSRF protection by restricting cross-site cookie sending; 'lax' allows top-level navigations
            sameSite: 'lax',
            //Session expiration time in milliseconds (1 hour); after this time, session is cleared
            maxAge: 1000 * 60 * 60
        }
    });
} 