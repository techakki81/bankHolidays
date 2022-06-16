import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'BankHolidaysAdaptiveCardExtensionStrings';
import { IBankHolidaysAdaptiveCardExtensionProps, IBankHolidaysAdaptiveCardExtensionState,IQuickViewData,ICountryList } from '../models';
import { constants, countries } from '../constants';
import {LocalStorage} from '../LocalStorage'
import{
  ICountryHolidayData,
  IBankHolidays
} from '../models'
import {getBankHolidays} from '../getBankHolidays'

export class QuickView extends BaseAdaptiveCardView<
  IBankHolidaysAdaptiveCardExtensionProps,
  IBankHolidaysAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {

     //  ie there is no data stored in localstorage...then show the normal view
     if(this.state?.holidaysData?.name ){
       return {
        subTitle: strings.SubTitle,
        title: `${strings.Title}${this.state.holidaysData.name}`,
        lstHol:this.state.holidaysData.holidays,
        countryList: <ICountryList[]>[
          ...countries
      ]
      }
    }
   else {
      return {
        subTitle: strings.SubTitle,
        title: strings.Title,
        countryList: <ICountryList[]>[
          ...countries
      ]
      }
    }  
 }


 public onAction(action: any): void {
  

   const ls = new LocalStorage<ICountryHolidayData>()

   getBankHolidays( action.data.CountryChoiceSet, new Date().getFullYear() )
   .then( ( resp:IBankHolidays[]) => 
     {
         this.setState(
           {
             holidaysData: {
                 name: <string> action.data.CountryChoiceSet,
                 code: <string> action.data.CountryChoiceSet,
                 holidays:resp
               }
           }
         )

         const ls = new LocalStorage<ICountryHolidayData>()
         // store the value in the local storage 
         ls.setItem(
           constants.localStorageKey, 
           { 
               name: <string> action.data.CountryChoiceSet,
               code: <string> action.data.CountryChoiceSet,
               holidays:resp             
           }
         )
     })

 }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}