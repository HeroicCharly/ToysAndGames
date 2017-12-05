import { Component } from '@angular/core';
import { product } from '../../models/product';
import { ProductService } from '../../Services/product.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    lastIndex: number;
    showProductForm: boolean = false;
    formItemLoaded: product;

    //Seeding data
    productsList: product[] = [
        { id: 1, name: "Carlos Perez", description: "Not available", ageRestriction: 10, company: "Charles Co.", price: 100 },
        { id: 2, name: "Charles Darwin", description: "Not available", ageRestriction: 5, company: "Charles Co.", price: 100 },
        { id: 3, name: "Pepe Pavo", description: "Stuffed Turkey", ageRestriction: 3, company: "Charles Co.", price: 10 }
    ];

    constructor(private productService: ProductService) {

    }

    ngOnInit() {
        this.loadProductsFromDataBase();
    }

    //PRIVATE METHODS
    getProductIndex(productToFind: product): number {
        return this.productsList.findIndex(x => x.id === productToFind.id);
    }

    loadProductsFromDataBase() {
        this.productService.getAllProducts().subscribe(
            products => this.productsList = products,
            error => {
                console.log(error);
            });
    }

    getLastProductIndex(): number {
        return this.productsList[this.productsList.length - 1].id;
    }

    //PUBLIC METHODS
    public toogleProductForm(): void {
        this.lastIndex = this.getLastProductIndex();
        this.showProductForm = this.showProductForm ? false : true;
    }

    public removeProduct(itemToDelete: product): void {
        var index = this.getProductIndex(itemToDelete);
        this.productsList.splice(index, 1);
    }

    public updateProduct(itemToUpdate: product): void {
        this.showProductForm = true;
        this.formItemLoaded = this.productsList.filter(x => x.id === itemToUpdate.id)[0];
    }

    public saveProducts() {
        this.productService.saveProducts(this.productsList).subscribe(data => console.log(data));
    }

    //Events
    public onProductUpdated(productUpdated: product) {
        this.showProductForm = false;

        if (productUpdated !== undefined) {
            let index: number = this.getProductIndex(this.formItemLoaded);
            this.productsList.splice(index, 1, productUpdated);
        }
    }

    public onProductCreated(productCreated: product) {
        console.log(productCreated);
        this.showProductForm = false;
        this.productsList.push(productCreated);
    }

}
