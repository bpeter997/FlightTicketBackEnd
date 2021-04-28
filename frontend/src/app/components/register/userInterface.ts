export interface User {
    name: string;
    email: string;
    passwword: string;
    role: 'user' | 'admin'
}