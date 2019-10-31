// Swagger definition
const swaggerDefinition = {
    info: {
        title: 'REST API for my App', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'This is the REST API for my product', // short description of the app
    },
    host: '', // the host or url of the app
    basePath: '/api', // the basepath of your endpoint
    tags: [
        {
            "name": "Auth",
            "description": "API for auth"
        },
        {
            "name": "Computers",
            "description": "API for computers collection"
        },
        {
            "name": "Questions",
            "description": "API for questions collection"
        },
        {
            "name": "Usage Profiles",
            "description": "API for usage profiles collection"
        },
        {
            "name": "Users",
            "description": "API for users collection"
        },
    ],
    schemes: [
        "http"
    ],
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    securityDefinitions: {
        "Authorization": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
};

module.exports = swaggerDefinition;