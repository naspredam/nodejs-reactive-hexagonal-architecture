import { User } from '@domain/user';
import { UserDto } from '@adapter/inbound/dtos';
import { firstName, lastName, phone } from '@domain/lenses';
import { Maybe } from 'maybeasy';

export const mapMaybeToUserDto = (userMaybe: Maybe<User>) =>
    userMaybe
        .map<UserDto | undefined>(mapToUserDto).getOrElseValue(undefined);

export const mapToUserDto = (user: User) => ({
    firstName: firstName(user),
    lastName: lastName(user),
    phone: phone(user),
});