export class Login {
  email: string = '';
  password: string = '';
}

export class User {
  [index: string]: any;
}

export interface CustomUser {
  idToken: string;
  claims: {
    basic: boolean;
    admin: boolean;
    superAdmin: boolean;
  };
}
