import axios from 'axios';;
let rank = axios.create({
    baseURL:'/kugou'
})
//根据id获取排行信息
export const getRankInfo = (params={id:''})=>{
    return rank(`/rank/info/${params.id}?json=true`)
}