import bcrypt from 'bcrypt';

async function hashPassword(pass : string){
    const hashedValue = await bcrypt.hash(pass,12);
    return hashedValue;
}
async function comparePassword(pass:string, hashedValue : string) {
    const isMatch = bcrypt.compare(pass,hashedValue);
    return isMatch;
}

export {hashPassword,comparePassword};