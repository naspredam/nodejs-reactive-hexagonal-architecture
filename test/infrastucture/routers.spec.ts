import { routes } from '@infrastructure/routes';
import { createUUID } from '@infrastructure/factories';
import { findUserAdapter } from '@adapter/inbound/adapters';
import request from 'supertest';
import { Server } from 'http';
import { Express } from 'express';
import { of } from 'rxjs';
import { mock, SinonMock } from 'sinon';
import { first_name, last_name, phone } from 'casual';
import { UserDto } from '@adapter/inbound/dtos';

describe('Test suite for API with mock dependencies', () => {

    let app: Express;
    let server: Server;

    beforeAll((done) => {
        app = routes.buildApp();
        server = app.listen((err: Error) => (err) ? done(err) : done());
    });

    afterAll((done) => {
        server.close();
        done();
    });

    describe('Tests for get one user', () => {
        let findUserAdapterMock: SinonMock;

        beforeEach(() => {
            findUserAdapterMock = mock(findUserAdapter);
        });

        afterEach(() => {
            findUserAdapterMock.restore();
        });

        it('should return the basic call with user information', (done) => {
            const userId = createUUID();
            const userDto = {
                firstName: first_name,
                lastName: last_name,
                phone,
            };
            findUserAdapterMock.expects('fetchUserById').withArgs(userId).returns(of(userDto));

            request(app)
                .get(`/v1/users/${userId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: any, res: any) => {
                    if (err) return done(err);
                    expect(res.body).toStrictEqual(userDto);
                    done();
                });
        });

        it('should return 404 when nothing is found...', (done) => {
            const userId = createUUID();
            findUserAdapterMock.expects('fetchUserById').withArgs(userId).returns(of(undefined));

            request(app)
                .get(`/v1/users/${userId}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err: any, res: any) => {
                    if (err) return done(err);
                    done();
                });
        });

        it('should return unexpected error when exception happens', () => {
            const userId = createUUID();
            findUserAdapterMock.expects('fetchUserById').withArgs(userId).throwsException();

            request(app)
                .get(`/v1/users/${userId}`)
                .expect('Content-Type', /json/)
                .expect(500); 
        });
    });

    describe('Tests for get one user', () => {

        let findUserAdapterMock: SinonMock;

        beforeEach(() => {
            findUserAdapterMock = mock(findUserAdapter);
        });

        afterEach(() => {
            findUserAdapterMock.restore();
        });

        it('should return nothing when nothing is returns on the adapter', (done) => {
            findUserAdapterMock.expects('fetchAll').withArgs().returns(of([]));

            request(app)
                .get(`/v1/users`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: any, res: any) => {
                    if (err) return done(err);
                    expect(res.body).toStrictEqual([]);
                    done();
                }); 
        });

        it('should return all users from adapter', (done) => {
            const numerUsers = 11;
            const users: UserDto[] = Array(numerUsers).fill(0).map(() => ({
                firstName: first_name,
                lastName: last_name ,
                phone: phone
            }));

            findUserAdapterMock.expects('fetchAll').withArgs().returns(of(users));

            request(app)
                .get(`/v1/users`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: any, res: any) => {
                    if (err) return done(err);
                    expect(res.body).toStrictEqual(users);
                    done();
                }); 
        });

        it('should return unexpected error when exception happens', () => {
            findUserAdapterMock.expects('fetchAll').withArgs().throwsException();

            request(app)
                .get(`/v1/users`)
                .expect('Content-Type', /json/)
                .expect(500); 
        });
    });
});