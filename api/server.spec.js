const request = require('supertest');

//always point to server
const server = require('./server')

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    });
});

 describe('GET /', () => {
     it('should return 200 ok', () => {
         return request(server)
         .get('/')
         .then(res => {
             expect(res.status).toBe(200);
         })
     });


     //the format of that is in JSON
     it('should return JSON', () => {
        return request(server).get('/')
                .then(res => {
                    expect(res.type).toBe('application/json');
                })         
     });


     it('should return API RUNNING', () => {
        return request(server)
        .get('/')
        .then(res => {
            expect(res.body).toEqual("API RUNNING");

        })
         
     });


 });