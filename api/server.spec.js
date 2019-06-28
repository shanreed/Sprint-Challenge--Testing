const request = require('supertest');


const db = require('../database/dbConfig')
//always point to server
const server = require('./server')

describe('server.js', () => {
    beforeEach(() => {
        return db ('games').truncate();
    })
    
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



     describe('POST /games', () => {
        beforeEach(async () => {
            await db('games').truncate();
          });
          
          afterEach(async () => {
            await db('games').truncate();
          });


        it('should give a 422, for missing required fields', async () => {
          const game = {title: "Mario Kart"};
    
          const res = await request(server)
            .post('/games')
            .send(game);
    
          expect(res.status).toBe(422);
        });

        it('should respond with the game', async () => {
            const game = {
              title: 'MineCraft',
              genre: 'Adventure',
              releaseYear: '2011'
            };
      
            const res = await request(server)
              .post('/games')
              .send(game);
      
            expect(game).toEqual(game);
          });


      it('should respond 201 created', async () => {
        let game = {title: 'Mario Kart', genre: 'Racing',releaseYear: '2011'};
  
        let res = await request(server)
          .post('/games')
          .send(game);
  
        expect(res.status).toBe(201);
      });
    });
     
 });