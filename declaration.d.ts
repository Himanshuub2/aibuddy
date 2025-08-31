// add for base32 package

declare module 'base32'{
    export function encode(input:string):string;
    export function decode(input:string):string;
}

declare module 'passport-google-oauth20'{
    export const Strategy:any;
}

