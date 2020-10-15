import { AngularWebWorker, bootstrapWorker, Callable, OnWorkerInit } from 'angular-web-worker';

/// <reference lib="webworker" />

@AngularWebWorker()
export class PropertyWorker implements OnWorkerInit {
  @Callable() call(): void {
    console.log('call');
  }

  constructor() {
    console.log('created');
  }

  onWorkerInit(): void {
    console.log('init');
  }
}

bootstrapWorker(PropertyWorker);
