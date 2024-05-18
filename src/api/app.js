import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import errorMiddleware from '../middlewares/error.js';
import routes from './routes.js';
import traceRequestsMiddleware from '../middlewares/traceRequests.middleware.js';

const app = express();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LogisticaRS Api with Swagger',
      version: '0.1.0',
      description: 'This is a application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Juninho Freitas',
        url: 'https://juninho.dev',
        email: 'brizollajr@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./src/routers/*.js', './src/api/routes.js'],
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(specs, {
    explorer: true,
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
  }),
);

app.use(express.json()).use(traceRequestsMiddleware).use(routes).use(errorMiddleware);

export default app;
