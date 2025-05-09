import { getPlans } from "../infrastructure/apiService"

export const fetchPlans = async()=>{
    const plans = await getPlans();
    return plans;
}