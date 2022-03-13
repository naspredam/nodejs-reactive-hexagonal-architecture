import { mapToUserDto, mapMaybeToUserDto } from '@adapter/inbound/mappers';
import { FindUserPort } from '@application/port/inbound';
import { findAllService, findUserService } from '@application/usecases/findUseCases';
import { map } from 'rxjs';

export const findUserAdapter: FindUserPort = {
    fetchUserById: (id: string) =>
        findUserService.fetchById({ id })
            .pipe(map(mapMaybeToUserDto)),

    fetchAll: () => findAllService.fetchAll()
        .pipe(map(users => users.map(mapToUserDto))),
}