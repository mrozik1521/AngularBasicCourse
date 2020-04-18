import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    
    templateUrl: "./product-list.component.html",
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{   
pageTitle: string = "Product List!";
imageWidth: number = 50;
imagemargin: number = 2;
showImage: boolean = false;
errorMessage: string;

_listFilter: string;
get listFilter(): string{
    return this._listFilter;
}
set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
}
products: IProduct[] = [];
filteredProducts: IProduct[];
constructor(private productService: ProductService) {
}

    
    toggleImage(): void {
    this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products =>{
                this.products = products,
                this.filteredProducts = this.products;
            } ,
            error: err => this.errorMessage = err
        });      
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product list ' + message;
    }
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }
    onNotify(message: string): void {}
    
}