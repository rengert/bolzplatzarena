// tslint:disable-next-line:no-implicit-dependencies
import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  async getTitleText(): Promise<string> {
    const css = by.css('app-root .content span');

    return element(css)
      .getText() as Promise<string>;
  }
}
