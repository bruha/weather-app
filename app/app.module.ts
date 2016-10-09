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
                redirectTo: '/heroes',
                pathMatch: 'full'
            },
            {
                path: 'heroes',
                component: HeroesComponent
            },
            {
                path: 'wiki',
                component: WikiComponent
            },
            {
                path: 'detail/:id',
                component: HeroDetailComponent
            }
        ])
    ],
    declarations: [ AppComponent, HeroesComponent, HeroDetailComponent, HeroSearchComponent, WikiComponent ],
    providers: [ HeroService, WikipediaService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
