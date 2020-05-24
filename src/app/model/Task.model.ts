export class Task{
    constructor(
        public id: number,
        public name: string,
        public compteur: number,
        public folder: string,
        public isRunning: boolean
    ){}
}