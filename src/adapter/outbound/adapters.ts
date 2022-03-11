import { UserData } from '@adapter/outbound/models';
import { User, UserId } from '@domain/user';
import { toPresentUser, toUser } from '@adapter/outbound/mappers';
import { all } from '@infrastructure/inMemoryRepository';
import { Observable, of, map } from 'rxjs';
import { Maybe } from 'maybeasy';

interface UserReaderPort {
    findById: (userId: UserId) => Observable<Maybe<User>>;
    findAll: () => Observable<User[]>;
}

export const userReaderAdapter: UserReaderPort = {
    findById: ({ id }: UserId) => of(all)
        .pipe(
            map((users: UserData[]) => users.find((user: UserData) => user.id === id)),
            map(toUser)),
            
    findAll: () => of(all)
        .pipe(
            map((users: UserData[]) => users.filter((userData) => userData !== undefined).map(toPresentUser))),
}