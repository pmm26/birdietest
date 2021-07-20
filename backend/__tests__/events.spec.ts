import app from '../src/application'
import * as request from 'supertest';




describe('/v1/events', () => {
  it('thanks you', async () => {
    await request(app)
      .get('/v1/events/')
      .expect(200)
      .expect(function(res) {
        expect(res.body.max_pages).toContain(233);
      });
  })
});
