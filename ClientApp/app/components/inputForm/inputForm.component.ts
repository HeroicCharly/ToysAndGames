import { Component, Input, Output } from '@angular/core';
import { product } from '../../models/product';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'inputForm',
    templateUrl: './inputForm.component.html',
    styleUrls: ['./inputForm.component.css']
})

export class InputFormComponent {
    @Input() maximumId: number;
    @Input() productToLoad: product;

    @Output() productUpdated: EventEmitter<product> = new EventEmitter();
    @Output() productCreated: EventEmitter<product> = new EventEmitter();

    tempProduct: product;
    isNewProduct: boolean = false;
    ngOnInit() {
        //we work with a local copy of the product to NOT affect the original
        if (this.productToLoad !== undefined) {
            this.tempProduct = new product(
                this.productToLoad.id,
                this.productToLoad.name,
                this.productToLoad.description,
                this.productToLoad.ageRestriction,
                this.productToLoad.company,
                this.productToLoad.price);
        } else {
            this.isNewProduct = true;
            this.tempProduct = new product(1, "", "", 0, "", 0);
        }
    }

    public saveChanges(): void {
        console.log("..::SAVING::..");

        if (this.isNewProduct) {
            //We add 1 to the maximum id registered
            this.tempProduct.id = this.maximumId + 1;
            this.productCreated.emit(this.tempProduct);
        } else {
            //We emit the saved changes
            this.productUpdated.emit(this.tempProduct);
        }
    }

    public discardChanges(): void {
        this.productUpdated.emit(undefined);
    }
}
