import { Component, Input, Output } from '@angular/core';
import { product } from '../../models/product';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'inputForm',
    templateUrl: './inputForm.component.html',
    styleUrls: ['./inputForm.component.css']
})

export class InputFormComponent {
@Input() productToLoad:product;
@Output() productUpdated:EventEmitter<product> = new EventEmitter();

tempProduct:product;

ngOnInit(){
    //we work with a local copy of the product to NOT affect the original
    if(this.productToLoad !== undefined){
        this.tempProduct = new product(
            this.productToLoad.id,
            this.productToLoad.name,
            this.productToLoad.description,
            this.productToLoad.ageRestriction,
            this.productToLoad.company,
            this.productToLoad.price);
    }
}

    public saveChanges():void{
        console.log("..::SAVING CHANGES::..");
        this.productUpdated.emit(this.tempProduct);
    }

    public discardChanges():void{
        this.productUpdated.emit(undefined);
    }
}
