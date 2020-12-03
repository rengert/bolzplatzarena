import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<void> {
    await browser.get(browser.baseUrl);
  }

  getTitleText(): Promise<string> {
    const css = by.css('app-root .content span');

    return element(css).getText() as unknown as Promise<string>;
  }
}
