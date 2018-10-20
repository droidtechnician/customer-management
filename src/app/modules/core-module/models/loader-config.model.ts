export interface LoaderConfig {
    backgroundColor?: Array<number>,
    size?: LoaderSize,
    color?: string,
    type?: string,
    msg?: string
}

export enum LoaderSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    DEFAULT = 'default'
}