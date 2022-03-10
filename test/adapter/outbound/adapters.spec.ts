import { userReaderAdapter } from '@adapter/outbound/adapters';
import * as repository from '@adapter/outbound/inMemoryRepository';
import { UserData } from '@adapter/outbound/models';
import { createUUID } from '@infrastructure/utilities';
import { first_name, last_name, phone } from 'casual';
import { nothing, just } from 'maybeasy';
import { SinonStub, stub } from 'sinon';

describe('Test suite for adapter of outbound', () => {

    let allUsersStub: SinonStub;

    beforeAll(() => {
        allUsersStub = stub(repository, 'all');
    });

    describe('Tests for fetching all the users', () => {

        it('should return nothing for all when no users are on the repository', (done) => {
            allUsersStub.get(() => []);

            userReaderAdapter.findAll()
                .subscribe((allUsers) => {
                    expect(allUsers.length).toBe(0);
                    done();
                })
        });

        it('should return one user when a user is on the repository', (done) => {
            const id = createUUID();
            const firstName = first_name;
            const lastName = last_name;
            const phoneNumber = phone;
            const userData: UserData = { id, firstName, lastName, phone: phoneNumber };
            allUsersStub.get(() => [userData]);

            userReaderAdapter.findAll()
                .subscribe((allUsers) => {
                    expect(allUsers).toStrictEqual([{
                        id: { id },
                        fullName: { firstName, lastName },
                        phone: { phone: phoneNumber }
                    }]);
                    done();
                });
        });

        it('should return same number of user with users on the repository', (done) => {
            const numerUsers = 8;
            const users: UserData[] = Array(numerUsers).fill(0).map(() => ({
                id: createUUID(),
                firstName: first_name,
                lastName: last_name,
                phone: phone
            }));
            allUsersStub.get(() => users);

            userReaderAdapter.findAll()
                .subscribe((allUsers) => {
                    expect(allUsers.length).toBe(numerUsers);
                    done();
                })
        });
    });

    describe('Tests for fetching one user', () => {

        it('should return nothing when not found on the repository', (done) => {
            const numerUsers = 8;
            const users: UserData[] = Array(numerUsers).fill(0).map(() => ({
                id: createUUID(),
                firstName: first_name,
                lastName: last_name,
                phone: phone
            }));
            allUsersStub.get(() => users);

            userReaderAdapter.findById({ id: 'blah' })
                .subscribe((user) => {
                    expect(user).toStrictEqual(nothing());
                    done();
                })
        });

        it('should return the user when found on the repository', (done) => {
            const numerUsers = 8;
            const users: UserData[] = Array(numerUsers).fill(0).map(() => ({
                id: createUUID(),
                firstName: first_name,
                lastName: last_name,
                phone: phone
            }));
            allUsersStub.get(() => users);

            userReaderAdapter.findById({ id: users[0].id })
                .subscribe((user) => {
                    expect(user).toStrictEqual(just({
                        id: { id: users[0].id },
                        fullName: { firstName: users[0].firstName, lastName: users[0].lastName },
                        phone: { phone: users[0].phone }
                    }));
                    done();
                });
        });

    });
});