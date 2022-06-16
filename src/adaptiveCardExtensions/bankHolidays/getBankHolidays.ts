import { IBankHolidays } from "./models";
import { constants } from "./constants";

export function getBankHolidays(ctryCode:string, year:number ) : Promise<IBankHolidays[]>
{
 
    return new Promise<IBankHolidays[]>( (resolve, reject) => {


    fetch(`${constants.api}${year}/${ctryCode}`)
    .then( resp => resp.json() )
    .then( data => resolve(<IBankHolidays[]> data))
    .catch(err => {
        console.log(err)
        reject(err)
    })
   })
}