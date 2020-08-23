import { InjectionToken } from '@angular/core';
import { Moment } from 'moment';

export const SIMULATOR = new InjectionToken<Simulator>('Simulators');

export interface Simulator {
  handle(date: Moment): Promise<void>;
}
