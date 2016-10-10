import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';

import { Weather } from './weather';
import { City } from './city';
import { WeatherService } from './weather.service';

const MIN_CITIES_NUMBER = 5;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ],
    providers: [ WeatherService ]
})
export class AppComponent implements OnInit {
    cities: City[];
    minCitiesNumber: number;
    sortOptions = [
        { name: 'City name ↓', value: 'name'},
        { name: 'City name ↑', value: '!name'},
        { name: 'Temperature ↓', value: 'weather.main.temp'},
        { name: 'Temperature ↑', value: '!weather.main.temp'}
    ];
    sortBy = '';

    constructor (
        private storage: LocalStorageService,
        private weatherService: WeatherService
    ) {}

    ngOnInit() {
        this.minCitiesNumber = MIN_CITIES_NUMBER;
        this.getCities();
    }

    isSearchable() {
        return this.cities.length >= this.minCitiesNumber;
    }

    searchWeather() {
        this.sortBy = '';
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
        let cities = this.storage.retrieve('cities');
        this.cities = cities && cities.map(city => ({ name: city })) || [];
    }

    saveCities() {
        this.storage.store('cities', this.cities.map(city => city.name));
    }

    addCity(cityToAdd: string) {
        if (!cityToAdd || this.cities.find(city => city.name === cityToAdd)) { return; }
        this.sortBy = '';
        this.cities.push(<City> { name: cityToAdd });
        this.saveCities();
    }

    removeCity(cityToRemove: string) {
        this.cities = this.cities.filter(city => city.name !== cityToRemove);
        this.saveCities();
    }
}
