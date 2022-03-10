import { User } from '@domain/user';
import { mapToUserDto, mapMaybeToUserDto } from '@adapter/inbound/mappers'
import { createUUID } from '@infrastructure/utilities';
import { nothing, just } from 'maybeasy';
import { first_name, last_name, phone } from 'casual';

describe('Test suite for adapters on inbound requests...', () => {

    it('should return undefined when incoming information is nothing...', () => {
        const userDto = mapMaybeToUserDto(nothing());
        expect(userDto).toBeUndefined();
    });

    it('should create the user dto from domain when present', () => {
        const id = createUUID();
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const userFound: User = {
            id: { id },
            fullName: { firstName , lastName },
            phone: { phone: phoneNumber },
        };

        const userDto = mapMaybeToUserDto(just(userFound));
        expect(userDto).toStrictEqual({
            firstName,
            lastName,
            phone: phoneNumber,
        });
    });

    it('should have the user dto from user from the use case', () => {
        const id = createUUID();
        const firstName = first_name;
        const lastName = last_name;
        const phoneNumber = phone;
        const userFound: User = {
            id: { id },
            fullName: { firstName , lastName },
            phone: { phone: phoneNumber },
        };

        const userDto = mapToUserDto(userFound);
        expect(userDto).toStrictEqual({
            firstName,
            lastName,
            phone: phoneNumber,
        });
    });
});