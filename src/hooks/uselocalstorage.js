import {useEffect, useState} from 'react';
import { LOCALSTORAGE_GET_ITEM, LOCALSTORAGE_SET_ITEM } from '../utility/localstorage';

const getinitvalue = (key,initvalue) =>
{
     const value = LOCALSTORAGE_GET_ITEM(key);
    if(value)
        return value
    if(initvalue instanceof Function)
        return initvalue();
    return initvalue;    
}
export default function useLocalStorage(key,initvalue){
    const [value,setvalue] = useState(()=>{
       return getinitvalue(key,initvalue)
    });
     useEffect(()=>{
         LOCALSTORAGE_SET_ITEM(key,value);
    },[value,key])

    return [value,setvalue];
} 
