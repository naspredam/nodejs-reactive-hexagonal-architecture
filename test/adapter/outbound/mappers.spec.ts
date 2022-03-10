import { toUser, toPresentUser } from '@adapter/outbound/mappers';
import { UserData } from '@adapter/outbound/models';
import { createUUID } from '@infrastructure/utilities';
import { first_name, last_name, phone } from 'casual';
import { just, nothing } from 'maybeasy';


describe('Test suite for mappers on outbound', () => {

    it('should return nothing when undefined is the input for the user data', () => {
        const userMaybe = toUser(undefined);
        expect(userMaybe).toStrictEqual(nothing());
    });

    it('should return Maybe filled with user information when the input is filled user data', () => {
        const id = createUUID();
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const userData: UserData = { id, firstName, lastName, phone: phoneNumber };

        const userMaybe = toUser(userData);
        expect(userMaybe).toStrictEqual(just({
            id: { id },
            fullName: { firstName, lastName },
            phone: { phone: phoneNumber }
        }));
    });

    it('should return user domain object when the input is filled user data', () => {
        const id = createUUID();
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const userData: UserData = { id, firstName, lastName, phone: phoneNumber };

        const user = toPresentUser(userData);
        expect(user).toStrictEqual({
            id: { id },
            fullName: { firstName, lastName },
            phone: { phone: phoneNumber }
        });
    });

});