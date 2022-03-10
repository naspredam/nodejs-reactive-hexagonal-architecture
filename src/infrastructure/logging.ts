import moment from 'moment';

const consoleLog = (logLevel: string) =>
    (message: String) => console.log(`${moment().format()} [${logLevel}] - ${message}`)

const debug = consoleLog('DEBUG')
const info = consoleLog('INFO')
const warn = consoleLog('WARN')
const error = consoleLog('ERROR')

export const log = {
    debug,
    info,
    warn,
    error
}