export interface SignUpModel {
    emailId: string;
    password: string;
}

export interface SignUpModelResp extends SignUpModel {
    resStatus: boolean;
}
