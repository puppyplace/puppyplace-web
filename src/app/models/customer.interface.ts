import { Address } from './address.interface';


export interface Customer {
    name: string;
    document: string;
    email: string;
    address?: Address[];
    cellphone?: string;
    birthdate: Date;
    password: string;
    is_active: boolean;
}