import { findUserAdapter } from '@adapter/inbound/adapters';
import { log } from '@infrastructure/logging';
import express, { Express, Request, Response } from 'express';
import { of, map, mergeMap, catchError, Observable } from 'rxjs';
import { compose } from 'ramda';
import moment from 'moment';

const getUserIfFromRequest = (req: Request): string => req.params['userId'];

const buildApp = (): Express => App.builder()
    .setRootPath('/v1/users')
    .get('/', () => findUserAdapter.fetchAll())
    .get('/:userId', compose((id) => findUserAdapter.fetchUserById(id), getUserIfFromRequest))
    .build();

export const routes = {
    buildApp,
}

interface ResponseData {
    readonly status: number;
    readonly text: string;
}

class App {
    private rootPath: string = '';
    private app: Express = express();

    private constructor() { }

    static builder = () => new App();

    setRootPath = (rootPath: string) => {
        this.rootPath = rootPath;
        return this;
    }

    get = <T>(path: RegExp | string, handlerRequest: (request: Request) => Observable<T>): App => {
        this.app.get(`${this.rootPath}${path}`, (request: Request, response: Response) => {
            var startTime = moment();
            log.info(`Request ${this.rootPath}${path} started...`)
            of(request)
                .pipe(
                    mergeMap(handlerRequest),
                    map(useCaseReturned =>
                        useCaseReturned ? 
                            { status: 200, text: JSON.stringify(useCaseReturned) }
                            : { status: 404, text: '' }),
                    catchError(err => of({ status: 500, text: err })))
                .subscribe(({ status, text }: ResponseData) => {
                    response.writeHead(status, { 'Content-Type': 'application/json' });
                    response.end(text);
                    log.info(`Request ${this.rootPath}${path} complete in ${moment().diff(startTime)}ms...`)
                });
        });
        return this;
    }

    build = () => this.app;
}