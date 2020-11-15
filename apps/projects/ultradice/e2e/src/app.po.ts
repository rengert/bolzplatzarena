// eslint-disable-next-line import/no-extraneous-dependencies
import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<void> {
    await browser.get(browser.baseUrl);
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span'))
      .getText() as unknown as Promise<string>;
  }
}
