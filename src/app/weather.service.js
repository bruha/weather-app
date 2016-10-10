"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var WeatherService = (function () {
    function WeatherService(jsonp) {
        this.jsonp = jsonp;
    }
    WeatherService.prototype.search = function (city) {
        var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
        var params = new http_1.URLSearchParams();
        params.set('q', city);
        params.set('appid', '6d045d3dfee3cc570628af7ca44a424d');
        params.set('units', 'metric');
        params.set('lang', 'en');
        params.set('callback', 'JSONP_CALLBACK');
        return this.jsonp.get(weatherUrl, { search: params })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WeatherService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map