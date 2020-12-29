import { Injectable } from '@angular/core';
import { AStarFinder } from 'astar-typescript';
import { Coordinate } from '../models/coordinate.model';
import { Field } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class PathService {
  private fields: Field[][];

  constructor() {
  }

  init(fields: Field[][]): void {
    this.fields = fields;
  }

  find(start: Coordinate, end: Coordinate): number[][] {
    const finder = new AStarFinder({
      diagonalAllowed: false,
      grid: {
        matrix: this.fields.map(arr => arr.map(item => item.free ? 0 : 1)),
      },
    });
    return finder.findPath(start, end);
  }
}
