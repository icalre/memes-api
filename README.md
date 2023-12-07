## Memes API

This is a simple API to manage memes.

### Run in Local
1. Copy the file .env.example to .env and set the environment variables.
2. Run the command `docker-compose up` to execute the project.
3. Run the command `docker exec -it meme-backend-app-1  npx prisma migrate dev` to execute the migrations.

### Run Tests
1. Copy the file .env.example to .env and set the environment variables.
2. Run the command `docker-compose up` to execute the project.
3. Change the environment variable `DATABASE_URL` to `mysql://root:MYSQLDB_ROOT_PASSWORD@localhost:NODE_LOCAL_PORT/memes` in the file .env
4. Run the command `npm install` to install the dependencies.
5. Run the command `npm run test` to execute the tests.

### Documentation
```The path for documentation is /api-docs ```

### Docker Commands

```sh
docker-compose up # to execute development
docker-compose -f docker-compose.prod.yml up # to execute production
```