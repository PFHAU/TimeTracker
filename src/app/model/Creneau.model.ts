export class Creneau{
    constructor(
        public id: number,
        public start: Date,
        public finish: Date,
        public taskId: number,
    ){}
}