import { Injectable } from '@angular/core';
import * as mbxGeocoding  from '@mapbox/mapbox-sdk/services/geocoding';
import { environment } from '../../environments/environment';
import { ForwardGeocodeModel } from '../utilities/models/geo-coding.model';

@Injectable()
export class GeoCodingService {

    private geoCodingClient;

    constructor() {
        this.geoCodingClient = mbxGeocoding({accessToken: environment.mapbox.geoCodeToken});
    }
    /**
     * makes a request for forward geocoding to mapbox
     * @method forwardGeocode
     * @param data
     * @returns { Promise<any> } returns a promise
     */
    forwardGeocode(data: ForwardGeocodeModel): Promise<any> {
        return new Promise((geoCodeResolve, geoCodeReject) => {
            this.geoCodingClient
                .forwardGeocode(
                    data
                )
                .send()
                .then((res) => {
                    geoCodeResolve(res);
                }).catch(err => {
                    geoCodeReject(err);
                })
        });
    }

}