const getWindow = (): Window => window;

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
