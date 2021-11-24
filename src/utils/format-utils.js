/**
 * 将时间格式化为 00:00 的格式
 * 
 * @param {*} time 原始时间
 * @returns 
 */
export function formatTime(time){    
	var hour,minute,second;
	hour = String(parseInt(time/3600,10));
	if(hour.length === 1) hour='0' + hour;
	
	minute=String(parseInt((time%3600)/60,10));
	if(minute.length === 1) minute='0'+minute;
	
	second=String(parseInt(time%60,10));
	if(second.length === 1) second='0'+second;
	
	if(hour > 0) {
	    return hour + ":" + minute + ":" + second;
	} else {
	    return minute + ":" + second;
	}
}

/**
 * 
 * @param {string} url 
 * @returns 
 */
export function getImageUrl(url) {
	return require("@/assets/" + url).default;
}