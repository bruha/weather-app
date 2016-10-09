import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
    moduleId: module.id,
    selector: 'my-weather',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css' ],
    providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
    weather: Weather;
    errorMessage: string;
    private searchCityStream = new Subject<string>();

    constructor (private weatherService: WeatherService) {}

    ngOnInit() { this.getWeather(); }

    search (city: string) { this.searchCityStream.next(city); }

    getWeather() {
        this.searchCityStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((city: string) => this.weatherService.search(city))
            .subscribe(
                weather => {
                    this.weather = weather;
                    this.errorMessage = '';
                },
                error => {
                    this.errorMessage = <any>error;
                    this.getWeather();
                }
            );
    }
}
