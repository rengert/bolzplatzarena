import { Level } from '../app.constants';

export interface Highscore {
  id: string;
  name: string;
  date: string;
  level: Level;
  score: number;
  apples: number;
}
