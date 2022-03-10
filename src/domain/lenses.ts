import { User } from '@domain/user';

export const firstName = ({ fullName }: User) => fullName.firstName;
export const lastName = ({ fullName }: User) => fullName.lastName;
export const phone = ({ phone }: User) => phone.phone;

export const domainLenses = {
    firstName,
    lastName,
    phone
}