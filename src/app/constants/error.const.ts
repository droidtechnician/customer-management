import { ErrorWrapper } from "../utilities/models/error.model";

const optionsError: ErrorWrapper = {
    name: 'ServerErrorNotAvailable',
    errorMsg: 'Server not available. Please try again later after sometime!!!'
}

const badRequestError: ErrorWrapper = {
    name: 'BadRequest',
    errorMsg: 'Seems to be some issue with the request.'
}

const serverError: ErrorWrapper = {
    name: 'ServerError',
    errorMsg: 'Seems like some issue with the server api'
}

export const ErrorConst = {
    '0': optionsError,
    '400': badRequestError,
    '500': serverError
}