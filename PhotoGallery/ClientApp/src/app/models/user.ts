export class User {
    id: number;
    token: string;

    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public city: string,
        public fieldOfActivity: string) {
    }
}