import { User } from '@domain/user';
import { UserData } from '@adapter/outbound/models';
import { just, nothing, Maybe } from 'maybeasy';

export const toUser = (userData: UserData | undefined): Maybe<User> =>
    userData === undefined ? nothing() : just(userData).map(toPresentUser);

export const toPresentUser = ({ id, firstName, lastName, phone }: UserData): User => ({
    id: { id },
    fullName: { firstName, lastName },
    phone: { phone }
});
