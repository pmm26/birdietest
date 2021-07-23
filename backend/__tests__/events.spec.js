const app = require('../src/application').default
const request = require('supertest');
const pool = require("../src/util/mysql.js")
const jestOpenAPI = require('jest-openapi');

// File copied from http://birdieapi.prck.me/v1/api-docs/
// Work around: express-openapi doesn't seem to generate the full file when using supertest.
// It also skips any middleware. Looking back I would have used a more standart aproach.
const schema = require('./api-doc.json')

beforeAll(async done => {
  jestOpenAPI(schema);
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  pool.end()
  done()
})


describe('/v1/events', () => {
  it('contains the right number of pages', async () => {
    await request(app)
      .get('/v1/events/')
      .expect(200)
      .expect(function (res) {
        expect(res.body.max_pages).toEqual(233);
      });
  })


  it('matches the openapi schema', async () => {
    await request(app)
      .get('/v1/events/')
      .expect(200)
      .expect(function (res) {
        expect(res).toSatisfyApiSpec();
      });
  })

  describe('filters', () => {

    it('page', async () => {
      await request(app)
        .get('/v1/events/')
        .query({page: 2})
        .expect(200)
        .expect(function (res) {
          expect(res.body.page).toEqual(2);
        });
    })


    it('per_page', async () => {
      await request(app)
        .get('/v1/events/')
        .query({per_page: 30})
        .expect(200)
        .expect(function (res) {
          expect(res.body.data.length).toEqual(30);
        });
    })

    it('filter[event_type]', async () => {
      const searchObj = {"filter[event_type]": 'no_medication_observation_received'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })

    it('filter[care_recipient_id]', async () => {
      const searchObj = {"filter[care_recipient_id]": 'e3e2bff8-d318-4760-beea-841a75f00227'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })


    it('filter[alert_id]', async () => {
      const searchObj = {"filter[alert_id]": 'f547e82d-5e03-4e6f-aad9-e01ad662d4c7'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })



    it('filter[task_instance_id]', async () => {
      const searchObj = {"filter[task_instance_id]": 'bXxjZmJkZTliZC05NTQ5LTRjZjEtODA2Ny00MDkxMmYwMzg4OTh8MjAxOS0wNS0xMlQxMTowMDowMC4wMDBa'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })


    it('filter[visit_id]', async () => {
      const searchObj = {"filter[visit_id]": '5cd753f0-8b66-f8a8-43f7-330f62a3e1d6'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })


    it('filter[caregiver_id]', async () => {
      const searchObj = {"filter[caregiver_id]": 'f7a00df5-bbc4-4ad7-9918-c07e16e709f6'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })


    it('filter[observation_event_id]', async () => {
      const searchObj = {"filter[observation_event_id]": '2fe20df2-3a47-40e8-b212-e9c9b1a3b8f5'}
      await request(app)
        .get('/v1/events/')
        .query({...searchObj, per_page: 6000})
        .expect(200)
        .expect(async (res) => {
          const result = await findAnomaly(searchObj, res.body.data)
          expect(result).toEqual(false);
        });
    })

  })
});

// Finds if any of results breaks the search query
const findAnomaly = async (searchObj, data) => {
  const string = Object.keys(searchObj)[0]

  const mySubString = string.substring(7, string.length-1)
  let foundAnomaly = false
  await data.forEach(element => {
    if (element[mySubString] != searchObj[string]) {
      foundAnomaly = true
    }
  })
  return foundAnomaly
}