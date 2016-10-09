import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';
import { WikiComponent } from './wiki.component';
import { WikipediaService } from './wikipedia.service';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/weather',
                pathMatch: 'full'
            },
            {
                path: 'heroes',
                component: HeroesComponent
            },
            {
                path: 'detail/:id',
                component: HeroDetailComponent
            },
            {
                path: 'wiki',
                component: WikiComponent
            },
            {
                path: 'weather',
                component: WeatherComponent
            }
        ])
    ],
    declarations: [ AppComponent, HeroesComponent, HeroDetailComponent, HeroSearchComponent, WikiComponent,
        WeatherComponent ],
    providers: [ HeroService, WikipediaService, WeatherService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
