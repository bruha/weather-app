import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
    moduleId: module.id,
    selector: 'my-weather-detail',
    templateUrl: 'weather-detail.component.html'
})

export class WeatherDetailComponent implements OnInit {
    weather: Weather;

    constructor(
        private weatherService: WeatherService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    /*ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }*/
}
