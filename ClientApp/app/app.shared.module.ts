import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { InputFormComponent } from './components/inputForm/inputForm.component';
import { ProductService } from './Services/product.service';

@NgModule({
    declarations: [
        AppComponent,
        InputFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: AppComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        ProductService
    ]
})
export class AppModuleShared {
}
