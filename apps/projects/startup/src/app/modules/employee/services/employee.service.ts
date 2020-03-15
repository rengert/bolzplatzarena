import { Injectable } from '@angular/core';
import { sample } from 'lodash';
import moment, { Moment } from 'moment';
import { createUuid, randomMoment } from '../../../../../../core/src/lib/utils/common.util';
import { Profession } from '../../../models/profession.model';
import { Level, Worker } from '../../../models/worker.model';
import { AppStorageService } from '../../../services/storage/app-storage.service';
import { ProfessionService } from '../../profession/services/profession.service';

function getRandom<T>(data: T[]): T {
  return data[Math.floor(Math.random() * data.length)];
}

function getRandomLevel(): Level {
  return sample(Object.values(Level)) as Level;
}

function getRandomBirthday(): Moment {
  return randomMoment('1970-01-01', '2000-01-01');
}

function getRandomSalary(position: Profession, level: Level, birthday: moment.Moment): number {
  return Math.floor(Math.random() * 100000);
}

function getRandomDomicile(): string {
  return 'Berlin';
}

function getRandomNames(): { firstname: string, lastname: string } {
  return {
    firstname: 'Bob',
    lastname: 'Last',
  };
}

function getRandomPercentage(): number {
  const percentages = [40, 50, 60, 70, 80, 90, 100, 100, 100, 100, 100, 100, 100, 100, 100];

  return percentages[Math.floor(Math.random() * percentages.length)];
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(
    private readonly appStorage: AppStorageService,
    private readonly profession: ProfessionService,
  ) {
  }

  async seed(): Promise<string> {
    const professions = await this.profession.get$()
      .toPromise();

    const data: Worker[] = [];
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));
    data.push(this.random(professions));

    return this.appStorage.workers.bulkAdd(data);
  }

  random(professions: Profession[]): Worker {
    const position: Profession = getRandom(professions);
    const level: Level = getRandomLevel();
    const birthday: Moment = getRandomBirthday();
    const salary: number = getRandomSalary(position, level, birthday);
    const domicile: string = getRandomDomicile();
    const { firstname, lastname } = getRandomNames();
    const percentage: number = getRandomPercentage();
    const distance = Math.floor(Math.random() * 1000);

    return {
      id: createUuid(),
      firstname,
      lastname,
      salary,
      level,
      profession: position,
      domicile,
      distance,
      percentage,
      birthday: birthday.format(),
    };
  }
}
