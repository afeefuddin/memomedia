import { User } from "../Model/UserSchema";
import { Iloginuser, Inewuser } from "../Interfaces/Interface";
import { comparePassword } from "../Middleware/hashPassword";


async function addUser(userData :Inewuser){
    try{
        const newUser = new User({
            username : userData.username,
            password : userData.password,
            email : userData.email,
            profilePic : userData.profilePic,
        })
        newUser.save();
        return true;
    }
    catch(error){
        console.log(error.message);
        return false;
    }
}
async function isUserPresent(userData:Inewuser){
    if(!userData.email || !userData.username){
        return true;
    }
    const email = userData.email;
    const username = userData.username;
    const isPresent  = await User.findOne({$or : [{email:email},{username:username}]})
    if(isPresent){
        return true;
    }
    return false;
}

async function isValidDetails(userData: Iloginuser) {
    const username = userData.username;
    const password = userData.password;
    const res = await User.findOne({username:username});
    const hashedValue = res.password;
    const isCorrect = await comparePassword(password,hashedValue)
    if(isCorrect){
        return true;
    }
    return false;

}
export {addUser, isUserPresent,isValidDetails}