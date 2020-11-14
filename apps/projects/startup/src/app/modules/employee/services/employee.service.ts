import { Injectable } from '@angular/core';
import { createUuid, randomMoment } from '@bpa/core';
import moment, { Moment } from 'moment';
import { Level } from '../../../models/level.model';
import { Profession } from '../../../models/profession.model';
import { Worker } from '../../../models/worker.model';
import { AppStorageService } from '../../../services/storage/app-storage.service';
import { ProfessionService } from '../../profession/services/profession.service';
import { NameService } from './name.service';
import { EmployeeStorageService } from './storage/employee-storage.service';

function getRandom<T>(data: T[]): T {
  return data[Math.floor(Math.random() * data.length)];
}

function getRandomBirthday(): Moment {
  return randomMoment('1970-01-01', '2000-01-01');
}

function getRandomSalary(profession: Profession, level: Level, birthday: moment.Moment): number {
  return Math.floor(Math.random() * 100000 * level.salaryFactor * profession.salaryFactor);
}

function getRandomDomicile(): string {
  return 'Berlin';
}

function getRandomNames(): { firstname: string; lastname: string; } {
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
    private readonly employeeStorage: EmployeeStorageService,
    private readonly name: NameService,
    private readonly profession: ProfessionService,
  ) {
  }

  async clear(): Promise<void> {
    await this.employeeStorage.clear();
  }

  async seed(count = 20): Promise<void> {
    const professions = await this.profession.get$()
      .toPromise();
    const levels = await this.profession.getLevels$()
      .toPromise();

    const data: Worker[] = [];
    for (let i = 0; i < count; i++) {
      data.push(this.random(professions, levels));
    }

    await this.employeeStorage.bulkAdd(data);
  }

  random(professions: Profession[], levels: Level[]): Worker {
    const position = getRandom(professions);
    const level = getRandom(levels);
    const birthday: Moment = getRandomBirthday();
    const salary: number = getRandomSalary(position, level, birthday);
    const domicile: string = getRandomDomicile();
    const { firstname, lastname } = this.name.random();
    const percentage: number = getRandomPercentage();

    return {
      id: createUuid(),
      firstname,
      lastname,
      salary,
      level,
      profession: position,
      domicile,
      percentage,
      birthday: birthday.format(),
      employed: false,
    };
  }
}
