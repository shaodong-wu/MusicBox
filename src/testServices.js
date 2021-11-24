import {
    getSongList
} from './services/player';


getSongList("周杰伦").then(res => {
    console.info(res.data.list[0]);
});
