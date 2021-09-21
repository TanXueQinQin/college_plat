
import { queryLawStatus, queryPatentType } from '@/api/patentStore'

export function getLawyerList() {
    queryLawStatus().then(res => {
        console.log(res.sysDicts);
        const data = res.sysDicts
        return data
    })
}
export function getPatentType() {
    queryPatentType().then(res => {
        return res.sysDicts
    })
}