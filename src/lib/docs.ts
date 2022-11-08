import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
// const swaggerDoc = require('../../swagger.json')

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Example Api to EDGE",
    description: "Basic Documentation",
    license: {
      name: "MIT",
      url: "http://localhost:5001",
    },
    termsOfService: "Beautiful",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5001/api/v1",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    tags: {
      name: "products",
      description: "Everything about your products",
    },
    schemas: {
      user: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      product: {
        type: "object",
        required: ["name", "price", "quantity", "code"],
        properties: {
          name: {
            type: "string",
          },
          price: {
            type: "number",
          },
          quantity: {
            type: "number",
          },
          code: {
            type: "number",
          },
        },
      },
      product_to_update: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          price: {
            type: "number",
          },
          quantity: {
            type: "number",
          },
          code: {
            type: "number",
          },
        },
      },
      product_id: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "number",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
