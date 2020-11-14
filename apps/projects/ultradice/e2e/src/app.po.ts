// eslint-disable-next-line import/no-extraneous-dependencies
import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span'))
      .getText() as Promise<string>;
  }
}
