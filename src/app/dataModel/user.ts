import { last } from 'cypress/types/lodash';

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export const userData: User[] = [
  {
    username: 'jbravo',
    email: 'jbravo@softtest.dev',
    firstName: 'John',
    lastName: 'Bravo',
  },
  {
    username: 'dduck',
    email: 'dduck@softtest.dev',
    firstName: 'Donald',
    lastName: 'Duck',
  },
  {
    username: 'swawelski',
    email: 'swawelski@softtest.dev',
    firstName: 'Smok',
    lastName: 'Wawelski',
  },
  {
    username: 'muszatek',
    email: 'muszatek@softtest.dev',
    firstName: 'Mis',
    lastName: 'Uszatek',
  },
  {
    username: 'reksio',
    email: 'reksio@softtest.dev',
    firstName: 'Reksio',
    lastName: '',
  },
];

export const defaultUser: User = {
  username: '',
  email: '',
};
