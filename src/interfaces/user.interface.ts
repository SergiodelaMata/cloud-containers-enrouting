export interface GetUsers {
  userData: UserData[] | UserData;
  logged: boolean;
  userId: string;
  rol: string;
  
}

export interface GetUser {
  userData: UserData;
  logged: boolean;
  userId: string;
  rol: string;
  
}

export interface UserData {
  userId: string;
  password: string;
  rol: string;
  name: string;
  firstsurname: string;
  secondsurname: string;
  telephone: string;
  email: string;
  creditcard: string;
  expiredatecreditcard: Date;

}