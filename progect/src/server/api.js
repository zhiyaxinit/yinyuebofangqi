//通过axios拿到数据
import axios from 'axios';
let c1 = axios.create({
    baseURL:'/kugou',
    transformResponse(data){
        data = JSON.parse(data)
        return data;
    }
})
function request(url,params ={a:1}){
    return c1(url,{params:params}).catch((e)=>{
        console.log('网络有问题')
    })
}
//获取新歌方法
export function getNewSog(params){
    return request(`?json=true`,params)
}
//获取排行方法
export function getRank(params){
    return request(`/rank/list?json=true`,params)
}