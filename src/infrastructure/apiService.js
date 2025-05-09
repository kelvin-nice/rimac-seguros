import axios from "axios";

//Api de Usuario
export const getUserData = async () =>{
    const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/user.json');
    return response.data;
}

//Api de Plan
export const getPlans = async()=>{
    const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/plans.json');
    return response.data;
}