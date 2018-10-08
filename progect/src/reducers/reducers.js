export default function(state={},action){
    switch(action.type){
        case 'updateHash':
        return{
            ...state,
            hash:action.hash,
            filename:action.filename

        }
        break;
        case 'updateSongList':
        return{
            ...state,
            songList:action.songList
        }
        break;
        default:
        return state;
        break
    }
}


