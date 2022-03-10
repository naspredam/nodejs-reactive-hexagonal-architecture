import { User, UserId } from '@domain/user';
import { userReaderAdapter } from '@adapter/outbound/adapters';
import { Observable } from 'rxjs';
import { Maybe } from 'maybeasy';

interface FindUserUseCase {
    fetchById: (id: UserId) => Observable<Maybe<User>>;
}

export const findUserService: FindUserUseCase = {
    fetchById: (id: UserId) => userReaderAdapter.findById(id),
}

interface FindAllUsersUseCase {
    fetchAll: () => Observable<User[]>;
}

export const findAllService: FindAllUsersUseCase = {
    fetchAll: () => userReaderAdapter.findAll(),
}