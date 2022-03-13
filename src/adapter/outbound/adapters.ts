import { UserReaderPort } from '@application/port/outbound';
import { UserData } from '@adapter/outbound/models';
import { UserId } from '@domain/user';
import { toPresentUser, toUser } from '@adapter/outbound/mappers';
import { all } from '@infrastructure/inMemoryRepository';
import { of, map } from 'rxjs';

export const userReaderAdapter: UserReaderPort = {
    findById: ({ id }: UserId) => of(all)
        .pipe(
            map((users: UserData[]) => users.find((user: UserData) => user.id === id)),
            map(toUser)),
            
    findAll: () => of(all)
        .pipe(
            map((users: UserData[]) => users.filter((userData) => userData !== undefined).map(toPresentUser))),
}