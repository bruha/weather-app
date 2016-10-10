import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { WeatherService } from './weather.service';
import { OrderByPipe } from './orderby.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        JsonpModule,
        Ng2Webstorage
    ],
    declarations: [ AppComponent, OrderByPipe ],
    providers: [ WeatherService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
