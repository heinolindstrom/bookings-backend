import request from 'supertest';
import app from '../server';

describe('api', () => {
  it('returns all bookings to max pagination', async () => {
    const result = await request(app).get('/api/bookings/all');
    expect(result.headers['content-type']).toMatch(/application\/json/);
    expect(result.body).toEqual([
      {
        id: 1,
        created_at: '2021-12-11T22:00:00.000Z',
        name: 'Tapahtuma',
        price: 100,
        country: 'FIN',
        people: ['Minna Toinen', 'Matti Joku'],
      },
      {
        id: 2,
        created_at: '2022-12-31T22:00:00.000Z',
        name: 'Toinen tapahtuma',
        price: 120,
        country: 'FIN',
        people: [null],
      },
    ]);
  });

  it('returns bookings pagination for all items, offset 0, in database (test had 2)', async () => {
    const result = await request(app).get('/api/bookings/all/0');
    expect(result.headers['content-type']).toMatch(/application\/json/);
    expect(result.body).toEqual([
      {
        id: 1,
        created_at: '2021-12-11T22:00:00.000Z',
        name: 'Tapahtuma',
        price: 100,
        country: 'FIN',
        people: ['Minna Toinen', 'Matti Joku'],
      },
      {
        id: 2,
        created_at: '2022-12-31T22:00:00.000Z',
        name: 'Toinen tapahtuma',
        price: 120,
        country: 'FIN',
        people: [null],
      },
    ]);
  });

  it('returns bookings pagination with offset', async () => {
    const result = await request(app).get('/api/bookings/all/1');
    expect(result.headers['content-type']).toMatch(/application\/json/);
    expect(result.body).toEqual([
      {
        id: 2,
        created_at: '2022-12-31T22:00:00.000Z',
        name: 'Toinen tapahtuma',
        price: 120,
        country: 'FIN',
        people: [null],
      },
    ]);
  });
});
