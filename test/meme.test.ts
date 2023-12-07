import request from "supertest";
import app from "../src/index";
import {HttpStatus} from "../src/interfaces";
import { v4 as uuidv4 } from 'uuid';

const userMock = {
    id: '',
    name: 'test',
    email: uuidv4()+'@gmail.com',
    password: '12345678'
};

const memeMock = {
    id: '',
    title: 'test',
    image: 'https://cdn-3.expansion.mx/dims4/default/fb6cd89/2147483647/strip/true/crop/624x351+0+0/resize/1200x675!/format/webp/quality/60/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2014%2F01%2F10%2Fmemes-lucero.jpg',
    userId: userMock.id
};

let token = '';

describe('POST /api/memes', () => {
    it('Validation its OK', async () => {
        await request(app).post('/api/auth/register').send(userMock).expect(HttpStatus.CREATED);
        const response = await request(app).post('/api/auth/login').send(userMock).expect(HttpStatus.OK);
        const {data} = response.body;
        token = data.token;
        userMock.id = data.user.id;

        memeMock.userId = userMock.id;

        const response2 = await request(app).post('/api/memes').set({'x-access-token': token}).send({}).expect(HttpStatus.BAD_REQUEST);
        const {success, message, extraMessage} = response2.body;

        expect(success).toBe(false);
        expect(message).toBe('Bad Request.');

        expect(extraMessage[0].path[0]).toBe('title');
        expect(extraMessage[1].path[0]).toBe('image');
    });

    it('Create its OK', async () => {
        const response = await request(app).post('/api/memes').set({'x-access-token': token}).send(memeMock).expect(HttpStatus.CREATED);
        const {success, data} = response.body;
        memeMock.id = data.id;
        expect(success).toBe(true);
    });
});

describe('GET /api/memes', () => {
    it('Get Memes its OK', async () => {
        const response = await request(app).get('/api/memes?page=1 &limit=5').set({'x-access-token': token}).expect(HttpStatus.OK);
        const {success} = response.body;
        expect(success).toBe(true);
    });
});

describe('GET /api/memes/:id', () => {
    it('Get Memes its OK', async () => {
        console.log(memeMock.id);
        const response = await request(app).get('/api/memes/'+memeMock.id).set({'x-access-token': token}).expect(HttpStatus.OK);
        const {success} = response.body;
        expect(success).toBe(true);
    });
});

describe('PUT /api/memes/:id', () => {
    it('Get Memes its OK', async () => {
        const response = await request(app).put('/api/memes/'+memeMock.id).set({'x-access-token': token}).send(memeMock).expect(HttpStatus.OK);
        const {success} = response.body;
        expect(success).toBe(true);
    });
});

describe('DELETE /api/memes/:id', () => {
    it('Get Memes its OK', async () => {
        const response = await request(app).delete('/api/memes/'+memeMock.id).set({'x-access-token': token}).expect(HttpStatus.OK);
        const {success} = response.body;
        expect(success).toBe(true);
    });
});