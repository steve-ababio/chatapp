export const LOCALSTORAGE_GET_ITEM = (key) =>{
    return JSON.parse(localStorage.getItem(key));
}
export const LOCALSTORAGE_SET_ITEM = (key,item) =>{
    localStorage.setItem(key,JSON.stringify(item));
}