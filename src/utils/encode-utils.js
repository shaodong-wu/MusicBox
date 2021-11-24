/**
 * url编码
 * 
 * @param {*} string 待编码的字符串
 * @returns 
 */
export function urlEncode(string) {
    return encodeURIComponent(string).replace(/'/g,"%27").replace(/"/g,"%22");	
}