import axios from 'axios';
let newRequset = axios.create({
    baseURL:'/kugou'
})
export const getSongMp3 = ({hash=''})=>{
    return newRequset('/app/i/getSongInfo.php',{
        responseType: 'json',
        params: {   // get请求的数据
        cmd: 'playInfo',
        hash: hash,
        from: 'mkugou'
        }
    })
}
//歌词
export const getRc = ({hash='',keyword})=>{
    return newRequset('/app/i/krc.php', {
        params: {
        cmd: 100,
        keyword: keyword,
        hash: hash,
        timelength: 123
        }
    })
}