import axios from 'axios'
//过滤数据，拿数据
var baseUrl = '/kugou';
let oneLeve = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
  transformResponse(data) {
    if (!data) return;
    if (typeof data === 'string') data = JSON.parse(data);
    let o = {}
    if (data.list) {
      o.data = data.list;
      o.origin = 'singer'
    } else if (data.banner) {
      o.data = data.data;
      o.banner = data.banner
      o.origin = 'home'
    } else if (data.rank) {
      o.data = data.rank.list;
      o.origin = 'rank'
    } else if (data.plist) {
      o.data = data.plist.list.info;
      o.origin = 'plist'
    } else if (data.singers) {
      o.data = data.singers.list.info;
      o.origin = 'singers-list'
    } else if (data.songs) {
      o.data = data.songs.list;
      o.info = data.info;
      o.origin = 'singers-info'
    }
    return o;
  }
})
let request = (path) => {
    return oneLeve(path).catch((e) => {
      if (e) {
        alert('网络错误')
      }
    })
  }

 //获取banner和新歌
 export const getNewSongs=() =>{
     return request('/?json=true')
 } 
 //获取排行数据
 export const getRankList =() =>{
   return request('/rank/list&json=true')
 }
 //获取歌单数据
 export const getPlist = ()=>{
   return request('/plist/index&json=true')
 }
 //获取歌分类数据
 export const getSingers =() =>{
   return request('/singer/class&json=true')
 }
 //根据歌手分类id，获取歌手分类歌手
 export const getSingerList=(params={classid:''})=>{
   return request(`/singer/list/${params.classid}?json=true`)
 }
 //根据歌手分类id，获取歌手信息
 export const getSingerInfo = (params={singerid:''})=>{
   return request(`singer/info/${params.singerid}?json=true`)
 }
 export default{
    getNewSongs,
    getRankList,
    getPlist,
    getSingers,
    getSingerList,
    getSingerInfo
 }