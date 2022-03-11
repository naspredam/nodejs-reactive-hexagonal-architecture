import { User } from '@domain/user';
import { domainLenses } from '@domain/lenses';
import { createUUID } from '@infrastructure/factories';
import { first_name, last_name, phone } from 'casual';

describe('User lenses suite', () => {

    it('should return the first name of the user', () => {
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const user: User = {
            id: { id: createUUID() },
            fullName: { firstName , lastName },
            phone: { phone: phoneNumber },
        };

        const userFirstName = domainLenses.firstName(user);
        expect(userFirstName).toBe(firstName);
    });

    it('should return the last name of the user', () => {
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const user: User = {
            id: { id: createUUID() },
            fullName: { firstName , lastName },
            phone: { phone: phoneNumber },
        };

        const userLastName = domainLenses.lastName(user);
        expect(userLastName).toBe(lastName);
    });

    it('should return the phone of the user', () => {
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const user: User = {
            id: { id: createUUID() },
            fullName: { firstName , lastName },
            phone: { phone: phoneNumber },
        };

        const userPhone = domainLenses.phone(user);
        expect(userPhone).toBe(phoneNumber);
    });
});