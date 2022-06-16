import { constants } from './constants'



export interface ILocalStorage<T>{

setItem(key:string,value:T):void;
getItem(key:string):ILocalStorageReturnValue<T>;
removeItem(key:string ):void;
//clear();
}
export interface ILocalStorageReturnValue<T>{
  storageDate:Date;
  storedObj:T
}

export class LocalStorage<T> implements ILocalStorage<T>
{
  
  constructor(){
    if( !window.localStorage)
      throw new Error(`[Local storage not supported]`)
  }

  
  public setItem(key: string, val: T): void{
    if(!key || !val )
    throw new Error(`[Incorrect key or value]`)

    const newObj:ILocalStorageReturnValue<T> = {
      storedObj: val,
      storageDate: new Date()
    }

    window.localStorage.setItem(key ,JSON.stringify(newObj))

  }

  public getItem(key: string): ILocalStorageReturnValue<T> | null{
   
    const str = window.localStorage.getItem(key);
    if (!str) {
        return null;
    }
    const result = JSON.parse(str);
    result.storageDate = new Date(result.storageDate);
    return result;
    
  }
  
  public removeItem(key: string): void {
    window.localStorage.removeItem(key)
  }
    
}


