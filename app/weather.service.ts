import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Weather } from './weather';

@Injectable()
export class WeatherService {
    constructor(private jsonp: Jsonp) {}

    search (city: string) {
        let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
        let params = new URLSearchParams();
        params.set('q', city); // the user's search value
        params.set('appid', '6d045d3dfee3cc570628af7ca44a424d');
        params.set('units', 'metric');
        // params.set('lang', 'ru');
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp.get(weatherUrl, { search: params })
            .map(response => <Weather> response.json())
            .catch(this.handleError);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
