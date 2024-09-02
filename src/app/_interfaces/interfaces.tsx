export interface BodyRequestLogin {
    email: string,
    password: string
}

export interface BodyResponseLogin {
    access_token: string,
    refresh_token: string
}    

export interface BodyRequestRegister {
    email: string;
    name: string;
    password: string;
    avatar: string;
}

export interface BodyResponseRegister {
     email: string,
     password: string,
     name: string,
     avatar: string,
     role: string,
     id: number,
     creationAt: string,
     updatedAt: string
}