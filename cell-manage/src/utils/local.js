/*
 * 本地存储的工具库
 */ 
export default {
    get(key){
        return JSON.parse(localStorage.getItem(key));
    },
    set(key,val){
        localStorage.setItem(key,JSON.stringify(val))
    },
    remove(key){
        localStorage.remove(key)
    },
    clear(){
        localStorage.clear();
    },
}