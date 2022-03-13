import { UserDto } from '@adapter/inbound/dtos';
import { Observable } from 'rxjs';

export interface FindUserPort {
    fetchUserById: (id: string) => Observable<UserDto | undefined>;
    fetchAll: () => Observable<UserDto[]>;
}