import { GameMode, Level } from '../app.constants';

export interface Highscore {
  id: string;
  name: string;
  date: string;
  level: Level;
  gameMode: GameMode;
  score: number;
  apples: number;
}
