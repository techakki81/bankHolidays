

export interface IBankHolidays {
    date:string,
    localName: string,
    name:string
}

export interface ICountryHolidayData{
    name : string,
    code: string,
    holidays:IBankHolidays[]
}


  
export interface ICountryList{
    code:string;
    name:string;
    }
  export interface IQuickViewData {
    subTitle: string;
    title: string;
    countryList:ICountryList[];
    lstHol?:IBankHolidays[];
  }
 
  export interface IBankHolidaysAdaptiveCardExtensionProps {
    title: string;
  }
  
  export interface IBankHolidaysAdaptiveCardExtensionState {
      holidaysData:ICountryHolidayData
}