import { Level, LevelType } from '../models/level.model';

export const levels: Level[] = [
  {
    id: '8f53b8cc-2362-4f78-b615-e70ae0169ca4',
    name: 'Junior',
    description: 'Der Mitarbeiter ist noch grün hinter den Ohren, tut aber das beste, was ihm von der Natur mit auf den Weg gegeben wurde.',
    salaryFactor: 1.5,
    type: LevelType.junior,
  },
  {
    id: 'a90bce30-1eae-44eb-b67b-5eeda53a9e43',
    name: '',
    // eslint-disable-next-line max-len
    description: 'Die Mitarbeiterin / der Mitarbeiter arbeit schon eine Weile in seinem Beruf und hat schon ordentlich was drauf. Abhängig von seinem Talent und seiner Motivation kann er sich allerdings noch steigern.',
    salaryFactor: 1.75,
    type: LevelType.normal,
  },
  {
    id: '2f0b370a-0225-458f-ad0c-8ca0d9b8936d',
    name: 'Senior',
    // eslint-disable-next-line max-len
    description: 'Die Mitarbeiterin / der Mitarbeiter arbeit schon eine gefühlte Ewigkeit in seinem Beruf und ist dementsptrechend gut. Abhängig von seinem Talent und seiner Motivation kann er sich allerdings noch steigern.',
    salaryFactor: 2,
    type: LevelType.senior,
  },
];
