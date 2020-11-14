// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unassigned-import
import 'zone.js/dist/zone';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unassigned-import
import 'zone.js/dist/zone-testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed()
  .initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys()
  .map(context);
