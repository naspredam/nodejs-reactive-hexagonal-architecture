import { User } from '@domain/user';
import { findUserAdapter } from '@adapter/inbound/adapters'
import { findUserService, findAllService } from '@application/findUseCases';
import { createUUID } from '@infrastructure/factories';
import { mock, SinonMock } from 'sinon';
import { first_name, last_name, phone } from 'casual';
import { of } from 'rxjs';
import { just, nothing } from 'maybeasy';

describe('Suite tests for inbound requests...', () => {

    describe('Fetch by id cases', () => {
        let findUserServiceMock: SinonMock;

        beforeEach(() => {
            findUserServiceMock = mock(findUserService);
        });

        afterEach(() => {
            findUserServiceMock.restore();
        });

        it('should return undefined when requesting by id, but nothing found...', (done) => {
            const id = createUUID();
            const userId = { id };
            findUserServiceMock.expects('fetchById').withArgs(userId).returns(of(nothing()));

            findUserAdapter.fetchUserById(id)
                .subscribe((userDto) => {
                    expect(userDto).toBeUndefined();
                    done();
                });
        });

        it('should return single user dto with the correctly from adapter response', (done) => {
            const id = createUUID();
            const userId = { id };
            const firstName = first_name;
            const lastName = last_name;
            const phoneNumber = phone;
            const userFound: User = {
                id: userId,
                fullName: { firstName, lastName },
                phone: { phone: phoneNumber }
            };
            findUserServiceMock.expects('fetchById').withArgs(userId).returns(of(just(userFound)));

            findUserAdapter.fetchUserById(id)
                .subscribe((userDto) => {
                    expect(userDto).toStrictEqual({
                        firstName,
                        lastName,
                        phone: phoneNumber
                    });
                    done();
                });
        });
    });


    describe('Fetch all entries', () => {
        let findAllServiceMock: SinonMock;

        beforeEach(() => {
            findAllServiceMock = mock(findAllService);
        });

        afterEach(() => {
            findAllServiceMock.restore();
        });

        it('should return empty when adapter returns nothing found...', (done) => {
            findAllServiceMock.expects('fetchAll').withExactArgs().returns(of([]));

            findUserAdapter.fetchAll()
                .subscribe((userDto) => {
                    expect(userDto).toStrictEqual([]);
                    done();
                });
        });

        it('should return single user dto when only one is present', (done) => {
            const id = createUUID();
            const userId = { id };
            const firstName = first_name;
            const lastName = last_name;
            const phoneNumber = phone;
            const userFound: User = {
                id: userId,
                fullName: { firstName, lastName },
                phone: { phone: phoneNumber }
            };
            findAllServiceMock.expects('fetchAll').withExactArgs().returns(of([ userFound ]));

            findUserAdapter.fetchAll()
                .subscribe((userDtos) => {
                    expect(userDtos).toStrictEqual([{
                        firstName,
                        lastName,
                        phone: phoneNumber
                    }]);
                    done();
                });
        });

        it('should return more then one user dto when only one is present', (done) => {
            const numerUsers = 8;
            const users = Array(numerUsers).fill(0).map(() => ({
                id: { id: createUUID() },
                fullName: { firstName: first_name, lastName: last_name },
                phone: { phone }
            }));

            findAllServiceMock.expects('fetchAll').withExactArgs().returns(of(users));

            findUserAdapter.fetchAll()
                .subscribe((userDtos) => {
                    expect(userDtos.length).toBe(numerUsers);
                    done();
                });
        });
    });
});