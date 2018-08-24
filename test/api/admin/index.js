const app = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const userFactory = require('../../factories/user');
const truncate = require('../../helper').truncate;

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    truncate().then(() => {
      done();
    }).catch((error) => done(error));
  });

  describe('/GET admin', () => {
    it('it should reject all but admin', (done) => {
      chai.request(app)
        .get('/api/v1/admin')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.greet.should.be.eq('hi admin, help yourself');
          done();
      });
    });
  });
});
