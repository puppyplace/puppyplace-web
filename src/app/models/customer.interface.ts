import { Address } from './address.interface';


export interface Customer {
    id: string;
    name: string;
    document: string;
    email: string;
    addresses?: Address[];
    cellphone?: string;
    birthdate: Date;
    password: string;
    is_active: boolean;
}