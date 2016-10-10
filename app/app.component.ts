import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';

import { Weather } from './weather';
import { City } from './city';
import { WeatherService } from './weather.service';

const MIN_NUMBER_OF_CITIES = 5;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ],
    providers: [ WeatherService ]
})
export class AppComponent implements OnInit {
    cities: City[];

    constructor (
        private storage: LocalStorageService,
        private weatherService: WeatherService
    ) {}

    ngOnInit() {
        this.getCities();
    }

    isSearchable() {
        return this.cities.length >= MIN_NUMBER_OF_CITIES;
    }

    searchWeather() {
        this.cities.forEach(city => {
            this.weatherService.search(city.name)
                .subscribe(
                    weather => {
                        city.weather = <Weather> weather;
                        city.errorMessage = '';
                    },
                    error => city.errorMessage = <string> error
                );
        });
    }

    getCities() {
        this.cities = this.storage.retrieve('cities').map(city => ({ name: city })) || [];
    }

    saveCities() {
        this.storage.store('cities', this.cities.map(city => city.name));
    }

    addCity(city: string) {
        if (!city) { return; }
        this.cities.push(<City> { name: city });
        this.saveCities();
    }

    removeCity(cityToRemove: string) {
        this.cities = this.cities.filter(city => city.name !== cityToRemove);
        this.saveCities();
    }
}
