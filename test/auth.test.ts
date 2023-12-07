import request from "supertest";
import app from "../src/index";
import {HttpStatus} from "../src/interfaces";
import { v4 as uuidv4 } from 'uuid';


const userMock = {
    name: 'test',
    email: uuidv4()+'@gmail.com',
    password: '12345678'
};


describe('POST /api/auth/register', () => {
    it('Validation its OK', async () => {
        const response = await request(app).post('/api/auth/register').send({}).expect(HttpStatus.BAD_REQUEST);
        const {success, message, extraMessage} = response.body;
        expect(success).toBe(false);
        expect(message).toBe('Bad Request.');

        expect(extraMessage[0].path[0]).toBe('name');
        expect(extraMessage[1].path[0]).toBe('email');
        expect(extraMessage[2].path[0]).toBe('password');
    });

    it('Register its OK', async () => {
        const response = await request(app).post('/api/auth/register').send(userMock).expect(HttpStatus.CREATED);
        const {success, data} = response.body;
        expect(success).toBe(true);
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('email');
    });
});

let token = '';

describe('POST /api/auth/login', () => {

    it('Validation its OK', async () => {
        const response = await request(app).post('/api/auth/login').send({}).expect(HttpStatus.BAD_REQUEST);
        const {success, message, extraMessage} = response.body;
        expect(success).toBe(false);
        expect(message).toBe('Bad Request.');

        expect(extraMessage[0].path[0]).toBe('email');
        expect(extraMessage[1].path[0]).toBe('password');
    });

    it('Login its OK', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: userMock.email, password: userMock.password}).expect(HttpStatus.OK);
        const {success, data} = response.body;
        token = data.token;
        expect(success).toBe(true);
        expect(data).toHaveProperty('user');
        expect(data).toHaveProperty('token');
    }
    );
});

describe('GET /api/auth/logout', () => {
    it('Logout its OK', async () => {
        const response = await request(app).get('/api/auth/logout').set({'x-access-token': token}).expect(HttpStatus.OK);
        const {success} = response.body;
        expect(success).toBe(true);
    }
    );
});
