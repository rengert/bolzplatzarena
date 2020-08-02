import { Injectable } from '@angular/core';
import { randomEnum, randomItems, titleCaseWord } from '@bpa/core';

enum Sex {
  Male,
  Female,
}

function randomName(names: string[], count: number, separator = ' '): string {
  const generatedNames = randomItems(names, count);

  let result = generatedNames.join(separator);
  if (separator === '') {
    result = titleCaseWord(result);
  }

  return result;
}

@Injectable({ providedIn: 'root' })
export class NameService {
  private readonly givenNamesFemale = ['Anna', 'Beata', 'Christiane', 'Daniela', 'Eva', 'Friederike', 'Gerda', 'Heike', 'Ina', 'Julia', 'Klara', 'Lara', 'Maria', 'Nora', 'Olga', 'Petra', 'Rita', 'Sabrina', 'Thea', 'Ulrike', 'Viktoria', 'Wilma', 'Vera', 'Zara'];
  private readonly givenNamesMale = ['Achim', 'Bernd'];
  private readonly lastNames = ['Ahrens', '', 'Müller', 'Pfeifer', 'Prestel', 'Renger', 'Meyer', 'Schmidt', 'Weber'];
  private readonly nameSeperator = ['', '-', ' '];

  random(): { firstname: string, lastname: string } {
    const sex: Sex = randomEnum(Sex);
    const firstNameCount = Math.ceil(Math.random() * 2);
    const lastNameCount = Math.ceil(Math.random() * 2);

    return {
      firstname: this.givenName(sex, firstNameCount, this.nameSeperator[Math.floor(Math.random() * this.nameSeperator.length)]),
      lastname: this.lastName(lastNameCount, this.nameSeperator[Math.floor(Math.random() * this.nameSeperator.length)]),
    };
  }

  private givenName(sex: Sex, count: number, separator = ' '): string {
    const names = sex === Sex.Female
      ? this.givenNamesFemale
      : this.givenNamesMale;

    return randomName(names, count, separator);
  }

  private lastName(count: number, separator = ' '): string {
    return randomName(this.lastNames, count, separator);
  }
}
