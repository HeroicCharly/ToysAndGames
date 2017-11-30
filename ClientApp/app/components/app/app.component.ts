import { Component } from '@angular/core';
import { product } from '../../models/product';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

showProductForm:boolean = false;
formItemLoaded:product;
productsList:product[] = [
    {id:1,name:"Carlos Perez",description:"Not available",ageRestriction:10,company:"Charles Co.",price:100},
    {id:2,name:"Charles Darwin",description:"Not available",ageRestriction:5,company:"Charles Co.",price:100},
    {id:3,name:"Pepe Pavo",description:"Stuffed Turkey",ageRestriction:3,company:"Charles Co.",price:10}
];

ngOnInit(){
    //TODO: Load the products from the backend
}

    public toogleProductForm():void{
        this.showProductForm = this.showProductForm ? false : true;
    }

    public removeProduct(itemToDelete:product):void{
        var index = this.getProductIndex(itemToDelete);
        this.productsList.splice(index,1);
    }

    public updateProduct(itemToUpdate:product):void{
        this.showProductForm = true;
        this.formItemLoaded = this.productsList.filter(x => x.id === itemToUpdate.id)[0];
    }

    public onProductUpdated(productUpdated:product){
        this.showProductForm = false;

        //If product was updated
        if(productUpdated !== undefined){
            let index:number = this.getProductIndex(this.formItemLoaded);
            this.productsList.splice(index,1,productUpdated);
        }
    }

    getProductIndex(productToFind:product):number{
        return this.productsList.findIndex(x=> x.id === productToFind.id);
    }
}
