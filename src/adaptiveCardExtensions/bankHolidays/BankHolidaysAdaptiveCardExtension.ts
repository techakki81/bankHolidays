import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { BankHolidaysPropertyPane } from './BankHolidaysPropertyPane';
import{ 
  IBankHolidaysAdaptiveCardExtensionProps,
  IBankHolidaysAdaptiveCardExtensionState,
  ICountryHolidayData} from  './models'
import { constants } from './constants';
import { LocalStorage } from './LocalStorage';

export default class BankHolidaysAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IBankHolidaysAdaptiveCardExtensionProps,
  IBankHolidaysAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: BankHolidaysPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state= {
      holidaysData:null
      };
       
    const ls = new LocalStorage<ICountryHolidayData>().
      getItem(constants.localStorageKey)

    this.setState ({
      holidaysData: ls?ls.storedObj :null     
      });

    this.cardNavigator.register(constants.CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(constants.QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'BankHolidays-property-pane'*/
      './BankHolidaysPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.BankHolidaysPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return constants.CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
