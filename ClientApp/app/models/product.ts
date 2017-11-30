export class product{

    constructor(
        id:number,
        name:string,
        description:string,
        ageRestriction:number,
        company:string,
        price:number){
            this.id = id;
            this.name = name;
            this.description = description;
            this.ageRestriction = ageRestriction;
            this.company = company;
            this.price = price;
    }

    public id:number;
    public name:string;
    public description:string;
    public ageRestriction:number;
    public company:string;
    public price:number;
}