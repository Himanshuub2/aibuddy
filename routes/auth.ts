import { Router } from "express";
import { CreateUser, VerifyUser } from "../types";
import sendEmail from "../twilio";
import jwt from 'jsonwebtoken';
import { OTP } from "../otp";
import { db } from "../prisma/prisma";
import passportInstance, { cookieObj } from "../passport/init";
import bcrypt from 'bcrypt';

type GoogleUser = {
    profile: any;
    userId: string;
}
type User = {
    id: string;
    email: string;
    password: string;
}

const authRouter = Router();

// TODO : Rate limit this
authRouter.get('/verify', (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        res.status(401).json({
            error: "Unauthorized",
            loggedIn: false
        })
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded === 'object') {
            res.status(200).json({
                loggedIn: true,
                user: decoded
            })
            return;
        }
    }
    catch (err) {
        res.status(401).json({
            error: "Unauthorized",
            loggedIn: false
        })
        return;
    }


})
authRouter.post('/initiate_signin', async (req, res) => {
    const { success, data } = CreateUser.safeParse(req.body);
    try {
        if (!success) {
            res.status(411).json({
                error: "Invalid Input"
            })
            return;
        }

        // see if the user exists
        //if not send otp email
        const otp = OTP.generateOTP(data.email);
        const emailBody = `Your aibuddy OTP - ${otp}`
        const subject = 'Your aibuddy OTP'
        if (process.env.NODE_ENV !== 'development') {
            await sendEmail(data.email, subject, emailBody);

            res.status(200).json({
                message: 'OTP sent successfully, please check your email'
            })
        }

        res.status(200).json({
            message: 'DEVELOPMENT MODE ',
            otp
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
})

authRouter.post('/signin', async (req, res) => {
    // type check with zod
    const { data, error } = VerifyUser.safeParse(req.body);
    // get the email and otp 
    if (!data || error) {
        res.status(411).json({
            message: "Invalid Input",
            error: error
        })
        return;
    }
    // check if the otp is correct /verify
    const isValidOTP = OTP.verifyOTP(data.otp, data.email);
    if (!isValidOTP) {
        res.status(401).json({
            error: "OTP verification failed"
        })
        return;
    }

    // const userId = '123Id'
    const user = await db.user.create({
        data: {
            email: data.email,
        }
    });

    if (!user) {
        res.status(401).json({
            error: "User Creation Failed"
        })
        return;
    }

    const token = jwt.sign({
        userId: user.id
    }, process.env.JWT_SECRET!)

    res.status(200).json({
        message: "User verified successfully",
        token
    })
})

authRouter.post('/signup', async (req, res) => {
    const { data, error } = CreateUser.safeParse(req.body);
    try {
        if (!data || error) {
            res.status(411).json({
                message: "Invalid User Input",
            })
            return;
        }
        const isUserExist = await db.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (isUserExist) {
            res.status(400).json({
                message: "User already exists"
            })
            return;
        }

        const hashedPass = await bcrypt.hash(data.password!, 10);
        const user = await db.user.create({
            data: {
                email: data?.email,
                password: hashedPass
            }
        })
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        res.cookie('auth_token', token, cookieObj)

        res.status(200).json({
            message: "User created successfully"
        })
        return;
    }
    catch (err: any) {
        res.status(500).json({
            message: "Something went wrong while signup",
            error: err,
            msg: err.message
        })
        return;
    }


})

authRouter.post('/login', passportInstance.authenticate('local', { session: false }), (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.cookie('auth_token', token, cookieObj)
    res.status(200).json({
        message: "User logged in successfully"
    })
    res.redirect(`${process.env.FRONTEND_URL}/chat`);
    return;
});

authRouter.get('/google',
    passportInstance.authenticate('google', { scope: ['profile', 'email'], session: false })
);

authRouter.get('/google/callback', (req, res, next) => {
    passportInstance.authenticate('google', { session: false }, (err, user, info) => {
        if (err) {
            console.error("OAuth Error:", err);        // <-- Log server-side error
            return res.status(500).send("OAuth Error: " + err.message);
        }
        if (!user) {
            console.error("Google Response Info:", info); // <-- Log info from Google / Passport
            return res.status(401).send("Login failed: " + JSON.stringify(info));
        }

        // Successful authentication
        const googleUser = user as GoogleUser;
        const token = jwt.sign({ userId: googleUser.userId }, process.env.JWT_SECRET!);
        res.cookie('auth_token', token, cookieObj);
        res.redirect(`${process.env.FRONTEND_URL}/chat`);
    })(req, res, next);
});


export default authRouter;