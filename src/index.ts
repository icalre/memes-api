import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import routes from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: '1.0.',
            title: 'Meme API',
            description: 'API documentation for the Meme API',
            contact: {
                name: 'Ivan Calvay'
            },
            servers: [
                {
                    url: "http://localhost:3000",
                }
            ]
        }
    },
    basePath: '/api',
    apis: ['./src/routes/*.ts']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//api routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
});

// routes
app.get("/api", (_req, res) => {
    res.send({sucess: true, message: "Welcome to the API"});
});

//if the route don't match it throws a 404 error
app.use((_req, res) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)'
    })
});

export default app;