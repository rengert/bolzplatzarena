import { Config } from './config';
import { GameBlock } from './game-block';

export interface GameData {
  config: Config;
  data: GameBlock[][];
  current?: GameBlock[][];
}
