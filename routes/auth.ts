import { Router } from "express";
import { CreateUser, VerifyUser } from "../types";
import sendEmail from "../twilio";
import jwt from 'jsonwebtoken';
import {TOTP} from 'totp-generator';
import { OTP } from "../otp";
import { db } from "../prisma/prisma";

const authRouter = Router();

// TODO : Rate limit this
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
            message:'DEVELOPMENT MODE ',
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
    const isValidOTP = OTP.verifyOTP(data.otp,data.email);
    if(!isValidOTP){
        res.status(401).json({
            error: "OTP verification failed"
        })
        return;
    }
    
    // const userId = '123Id'
    const user = await db.user.create({
        data:{
            email: data.email,
        }
    });

    if(!user){
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

export default authRouter;