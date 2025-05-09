import {getUserData} from '../infrastructure/apiService'

export const fetchUser = async ()=>{
    const user = await getUserData();
    return user;
}
