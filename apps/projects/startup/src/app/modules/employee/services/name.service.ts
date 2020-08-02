import { Injectable } from '@angular/core';
import { randomEnum, randomItems, titleCaseWord } from '@bpa/core';

enum Sex {
  Male,
  Female,
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

  private givenName(sex: Sex, count: number, divider = ' '): string {
    const names = sex === Sex.Female
      ? this.givenNamesFemale
      : this.givenNamesMale;

    const generatedNames = randomItems(names, count);

    let result = generatedNames.join(divider);
    if (divider === '') {
      result = titleCaseWord(result);
    }

    return result;
  }

  private lastName(count: number, divider = ' '): string {
    const generatedNames = randomItems(this.lastNames, count);

    let result = generatedNames.join(divider);
    if (divider === '') {
      result = titleCaseWord(result);
    }

    return result + generatedNames.length.toString();
  }
}
