import { userReaderAdapter } from "@adapter/outbound/adapters";
import { createUUID } from "@infrastructure/utilities";
import { mock, SinonMock } from "sinon";
import { of } from 'rxjs';
import { just, nothing } from "maybeasy";
import { findAllService, findUserService } from "@application/findUseCases";
import { first_name, last_name, phone } from "casual";
import { User } from "@domain/user";

describe('Use case tests for find users', () => {

    describe('Single response use case', () => {

        let userReaderAdapterMock: SinonMock;

        beforeEach(() => {
            userReaderAdapterMock = mock(userReaderAdapter);
        });

        afterEach(() => {
            userReaderAdapterMock.restore();
        });

        it('It should send nothing from the adapter', (done) => {
            const userId = { id: createUUID() };

            userReaderAdapterMock.expects('findById').withArgs(userId).returns(of(nothing()));

            findUserService.fetchById(userId)
                .subscribe((user) => {
                    expect(user).toStrictEqual(nothing());
                    done();
                });
        });

        it('It should send the user from the adapter', (done) => {
            const userId = { id: createUUID() };
            const userFound: User = {
                id: userId,
                fullName: { firstName: first_name , lastName: last_name },
                phone: { phone: phone },
            };
            userReaderAdapterMock.expects('findById').withArgs(userId).returns(of(just(userFound)));

            findUserService.fetchById(userId)
                .subscribe((user) => {
                    expect(user).toStrictEqual(just(userFound));
                    done();
                });
        });

    });

    describe('All users use case', () => {

        let userReaderAdapterMock: SinonMock;

        beforeEach(() => {
            userReaderAdapterMock = mock(userReaderAdapter);
        });

        afterEach(() => {
            userReaderAdapterMock.restore();
        });

        it('It should return empty when no user is present', (done) => {
            userReaderAdapterMock.expects('findAll').withArgs().returns(of([]));

            findAllService.fetchAll()
                .subscribe((users) => {
                    expect(users.length).toBe(0);
                    done();
                });
        });

        it('It should send the user from the adapter', (done) => {
            const numerUsers = 8;
            const users: User[] = Array(numerUsers).fill(0).map(() => ({
                id: { id : createUUID() },
                fullName: { firstName: first_name , lastName: last_name },
                phone: { phone: phone },
            }));

            userReaderAdapterMock.expects('findAll').withArgs().returns(of(users));

            findAllService.fetchAll()
                .subscribe((fetchUsers) => {
                    expect(fetchUsers).toStrictEqual(users);
                    done();
                });
        });

    });
});