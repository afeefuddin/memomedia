import { User } from "../Model/UserSchema";
import { Inewuser } from "../Interfaces/Interface";


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
export {addUser}