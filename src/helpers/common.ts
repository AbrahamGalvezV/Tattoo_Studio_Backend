import { User } from "../models/User";

//----------------------------------------------------------------

export const getRandomValueFromArray = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };


  export const getUsersAccordingRole = (array:Array<User>,role:number): User[]=> {
    
    const users = [];

    for(let element of array){
        if(element.roleId===role){
            users.push(element)
        }
    }

    return users;
};