import { User, UserId } from '@domain/user';
import { Observable } from 'rxjs';
import { Maybe } from 'maybeasy';

export interface UserReaderPort {
    findById: (userId: UserId) => Observable<Maybe<User>>;
    findAll: () => Observable<User[]>;
}