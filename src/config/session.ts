import session from 'express-session';
import pgSession from 'connect-pg-simple';

console.log('env', process.env.NODE_ENV === 'test')
const sessionStore = process.env.NODE_ENV === 'test' ? new (pgSession(session))({
    conObject: {
        host: process.env.TEST_DB_HOST,
        port: Number(process.env.TEST_DB_HOST_PORT),
        user: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASS,
        database: process.env.TEST_DB_NAME,
    },
    createTableIfMissing: true,
}) : new (pgSession(session))({
    conObject: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    createTableIfMissing: true,
});
export default session({
    store: sessionStore,
    secret: 'docker-express-boilerplate-api',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax',
        maxAge: 90 * 24 * 60 * 60 * 1000, // 3 months
    },
});