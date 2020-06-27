import { Injectable } from '@angular/core';

const getWindow = (): Window => window;

@Injectable()
export class WindowService {
  private readonly windowObject: Window;

  constructor() {
    this.windowObject = getWindow();
  }

  get window(): Window {
    return this.windowObject;
  }

  get document(): Document {
    return this.window.document;
  }

  get localStore(): Storage {
    return this.window.localStorage;
  }

  get sessionStorage(): Storage {
    return this.window.sessionStorage;
  }
}
