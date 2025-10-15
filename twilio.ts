import sgMail from '@sendgrid/mail'
import client from '@sendgrid/client'
// uncomment the above line if you are sending mail using a regional EU subuser
export default async function sendEmail(to: string, subject: string, body: string) {
    sgMail.setApiKey(process.env.EMAIL_KEY || '');
    client.setDataResidency('eu');
    const msg = {
        to: to, // Change to your recipient
        from: process.env.FROM_EMAIL || '', // Change to your verified sender
        subject: subject,
        text: body,
    }
    try{
        const response = await sgMail.send(msg);
        console.log('Email sent Successfully')
        return response;
    }
    catch(err){
        console.log('Error while sending Email',err)
    }
}
