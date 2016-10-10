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
var ng2_webstorage_1 = require('ng2-webstorage');
var weather_service_1 = require('./weather.service');
var MIN_CITIES_NUMBER = 5;
var AppComponent = (function () {
    function AppComponent(storage, weatherService) {
        this.storage = storage;
        this.weatherService = weatherService;
        this.sortOptions = [
            { name: 'City name ↓', value: 'name' },
            { name: 'City name ↑', value: '!name' },
            { name: 'Temperature ↓', value: 'weather.main.temp' },
            { name: 'Temperature ↑', value: '!weather.main.temp' },
            { name: 'Wind speed ↓', value: 'weather.wind.speed' },
            { name: 'Wind speed ↑', value: '!weather.wind.speed' }
        ];
        this.sortBy = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.minCitiesNumber = MIN_CITIES_NUMBER;
        this.getCities();
    };
    AppComponent.prototype.isSearchable = function () {
        return this.cities.length >= this.minCitiesNumber;
    };
    AppComponent.prototype.searchWeather = function () {
        var _this = this;
        this.sortBy = '';
        this.cities.forEach(function (city) {
            _this.weatherService.search(city.name)
                .subscribe(function (weather) {
                city.weather = weather;
                city.errorMessage = '';
            }, function (error) { return city.errorMessage = error; });
        });
    };
    AppComponent.prototype.getCities = function () {
        var cities = this.storage.retrieve('cities');
        this.cities = cities && cities.map(function (city) { return ({ name: city }); }) || [];
    };
    AppComponent.prototype.saveCities = function () {
        this.storage.store('cities', this.cities.map(function (city) { return city.name; }));
    };
    AppComponent.prototype.addCity = function (cityToAdd) {
        if (!cityToAdd || this.cities.find(function (city) { return city.name === cityToAdd; })) {
            return;
        }
        this.sortBy = '';
        this.cities.push({ name: cityToAdd });
        this.saveCities();
    };
    AppComponent.prototype.removeCity = function (cityToRemove) {
        this.cities = this.cities.filter(function (city) { return city.name !== cityToRemove; });
        this.saveCities();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [ng2_webstorage_1.LocalStorageService, weather_service_1.WeatherService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map