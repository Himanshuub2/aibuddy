import {Strategy as LocalStrategy} from 'passport-local';
import { db } from '../prisma/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const localStrategy = new LocalStrategy(
    async (email:string,password:string,done:any)=>{
        try{
            //check if user exists
            //if not add user
            const user = await db.user.findUnique({
                where:{
                    email:email
                }
            })

            if(!user || !user.password){
                return done(null,false,{
                    message:"User not found. try other method or signup"
                })
            }

            const hashedPass = await bcrypt.hash(password,10);
            
            if(hashedPass !== user.password){
                return done(null,false,{
                    message:"Invalid Credentials"
                })
            }

            return done(null,user);
        }
        catch(err:any){
            return done(err);
        }
    }
)