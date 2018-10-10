export interface GeoCodingModel {
    country?: string | Array<string>;
    language?: string;
    limit?: number;
    routing?: boolean;
    types?: string | Array<string>;
    query: string
}

export interface ForwardGeocodeModel extends GeoCodingModel {
    autocomplete?: boolean;
    bbox?: BoundingBoxModel;
    fuzzyMatch?: boolean;
    proximity?: ProximityModel;
}

export interface ReverseGeoocdeModel extends GeoCodingModel {
    reverseMode?: string
}

export interface ProximityModel {
    latitude: number;
    longitude: number
}

export interface BoundingBoxModel {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number
}
