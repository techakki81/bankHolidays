import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'BankHolidaysAdaptiveCardExtensionStrings';
import { IBankHolidaysAdaptiveCardExtensionProps, IBankHolidaysAdaptiveCardExtensionState } from '../models';
import { constants } from '../constants';

export class CardView extends BasePrimaryTextCardView<IBankHolidaysAdaptiveCardExtensionProps, IBankHolidaysAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: constants.QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
   
    if(this.state?.holidaysData?.name && this.state?.holidaysData?.holidays?.length>1)
    return {
      primaryText: `bank Holdays for ${this.state?.holidaysData.name}`,
      description: `click to see list of ${this.state?.holidaysData.holidays.length } holidays `,
      title: this.properties.title
    };
    else 
    return{
      primaryText: `no coutry set`,
      description: `click on the card to set the counrty  `,
      title: this.properties.title
    }

  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
