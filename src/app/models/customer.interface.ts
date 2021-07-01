import { Address } from './address.interface';


export interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    document: string;
    email: string;
    addresses?: Address[];
    cellphone?: string;
    birthdate: Date;
    password: string;
    is_active: boolean;
}