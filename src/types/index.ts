export interface Credentials {
    email: string;
    password: string;
  }
  
  export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  

  export interface Location {
    id: number;
    title: string;
    lat: number;
    lng: number;
    icon?: string;
  }
  