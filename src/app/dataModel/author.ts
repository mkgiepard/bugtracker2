export interface User {
    id: number;
    name: string;
    lastName: string;
    username: string;
}

export let userData: User[] = [
    {
        id: 1001,
        name: 'John',
        lastName: 'Bravo',
        username: 'jbravo'
    },
    {
        id: 1002,
        name: 'Donald',
        lastName: 'Duck',
        username: 'dduck'
    },
    {
        id: 1003,
        name: 'Smok',
        lastName: 'Wawelski',
        username: 'swawelski'
    },
    {
        id: 1004,
        name: 'Mis',
        lastName: 'Uszatek',
        username: 'muszatek'
    },
    {
        id: 1005,
        name: 'Reksio',
        lastName: '',
        username: 'reksio'
    },
]

export const defaultUser: User = userData[0];