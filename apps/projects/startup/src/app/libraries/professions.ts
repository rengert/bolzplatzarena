import { Profession, ProfessionType } from '../models/profession.model';

export const professions: Profession[] = [
  {
    id: '8f53b8cc-2362-4f78-b615-e70ae0169ca4',
    name: 'Software EntwicklerIn',
    description: 'Spiel Xbox, trinke Club-Mate. Baut Bugs. Verdient unmengen Geld.',
    salaryFactor: 1.5,
    type: ProfessionType.worker,
  },
  {
    id: '77e5ac8d-98ed-463d-acf2-325db7edc9b4',
    name: 'Product Owner',
    // eslint-disable-next-line max-len
    description: 'Product Owner. ... Der Product Owner gehört dabei neben dem Scrum Master und dem Entwicklungsteam zu den zentralen Akteuren. Diese Person ist für die Wertsteigerung des Produkts im Entwicklungsprozess verantwortlich und leitet das Team an.',
    salaryFactor: 1.75,
    type: ProfessionType.scrum,
  },
  {
    id: 'c41b04eb-bb13-40ec-8257-4fdc00b0a81b',
    name: 'Key Account ManagerIn',
    description: 'Verantwortet die Aquise von Projekten',
    salaryFactor: 2,
    type: ProfessionType.acquisition,
  },
  {
    id: 'c41b04eb-bb13-40ec-8257-4fdc00b0a81b',
    name: 'Scrum Master',
    // eslint-disable-next-line max-len
    description: 'Der Scrum Master ist eine von 3 Rollen die es in Scrum gibt. Er ist derjenige, der dafür sorgt, dass das Team möglichst effektiv und ungestört arbeiten kann. ... Der Scrum Master hilft dabei, die Zusammenarbeit so zu optimieren, dass der durch das Scrum-Team generierte Wert optimiert und maximiert wird.',
    salaryFactor: 1.76,
    type: ProfessionType.management,
  },
];
