import { Settings } from '../components/settings/settings.component';

export interface BoardSettings {
  interval: number;
  width: number;
  height: number;
  startDelay: number;
  chanceGoldenApple: number;
  settings: Settings;
}
