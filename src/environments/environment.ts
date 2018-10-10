// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUri: 'http://localhost:3000/',
  mapbox : {
    baseUri: 'https://api.mapbox.com/',
    geoCodeToken: 'pk.eyJ1IjoiZHJvaWR0ZWNobmljaWFuIiwiYSI6ImNqbXg0YTFnNTA3cWIzcHA3emRoODRlc2UifQ.TvWzm8sOZ_tkvruDoZ5-0w',
    accessToken: 'pk.eyJ1IjoiZHJvaWR0ZWNobmljaWFuIiwiYSI6ImNqbXc4N3BycTAwb2Yzcmt2YXMxd3phemIifQ.ibNy8pKJkSoTKL0Z5X9sXw'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
