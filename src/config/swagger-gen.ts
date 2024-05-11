import swaggerAutogen from 'swagger-autogen';

const outputFile = '../../../swagger.json';
const endpointsFiles = ['../routes/*.js'];

const doc = {
  info: {
    title: 'Logisticars API',
    description: 'API documentation for the Logisticars backend',
    version: '1.0.0',
  },
  host: 'localhost:8000',
  basePath: '/',
  schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);