import { last } from "cypress/types/lodash";

export let userData: User[];

export class User {
    private static index = 1000;

    private id: number;
    name: string;
    lastName: string;
    username: string;

    constructor(name: string, lastName: string, username: string) {
        this.id = User.index++;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }
}

userData = [
    new User('John', 'Bravo', 'jbravo'),
    new User('Donald', 'Duck', 'dduck'),
    new User('Smok', 'Wawelski', 'swawelski'),
    new User('Mis', 'Uszatek', 'muszatek'),
    new User('Reksio', '', 'reksio')
]

export const defaultUser: User = new User('', '', '');