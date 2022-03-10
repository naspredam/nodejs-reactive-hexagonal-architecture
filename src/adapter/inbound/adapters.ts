import { UserDto } from '@adapter/inbound/dtos';
import { mapToUserDto, mapMaybeToUserDto } from '@adapter/inbound/mappers';
import { findAllService, findUserService } from '@application/findUseCases';
import { Observable, map } from 'rxjs';

interface FindUserPort {
    fetchUserById: (id: string) => Observable<UserDto | undefined>;
    fetchAll: () => Observable<UserDto[]>;
}

export const findUserAdapter: FindUserPort = {
    fetchUserById: (id: string) =>
        findUserService.fetchById({ id })
            .pipe(map(mapMaybeToUserDto)),

    fetchAll: () => findAllService.fetchAll()
        .pipe(map(users => users.map(mapToUserDto))),
}