import { TOTP } from 'totp-generator';
import base32 from 'hi-base32';
export class OTP {
    constructor() { }

    public static base32Secret(email: string) {
        const secret = email + process.env.TOTP_SECRET!;
        const encodedSecret = base32.encode(secret);
        return base32.encode(secret);
    }

    public static generateOTP(email: string) {
        const { otp } = TOTP.generate(this.base32Secret(email), {
            digits: 6,
            period: 60
        })
        return otp;
    }

    public static verifyOTP(otp: string, email: string) {
        const getOtp = this.generateOTP(email);
        return otp === getOtp;
    }
}