const db = require('../database/dbConfig')
const Games = require('./games-model')


describe('Games model', () => {
    beforeEach(() => {
        return db ('games').truncate();
    })
    describe('add()', () => {
        it('should add the provided games into the db', () => {
            return Games.add({ title: 'PaceMan',
                               genre: 'Arcade',
                               releaseYear: '1990'})
            .then(() => {
                return Games.add({ title: 'MineCraft',
                                   genre: 'Exploration',
                                   releaseYear: '2010'})
            })
            .then(() => {
                return Games.add({ title: 'Mario Kart',
                                   genre: 'Racing',
                                   releaseYear: '2008'})
            })
            //asertion
            .then(() => {
                return db('games')
                .then(game => {
                    expect(game).toHaveLength(3)
                })
            })
        });
        
    });

    
})