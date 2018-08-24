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

  describe('/GET users', () => {
    it('it should GET all the uesrs', (done) => {
      chai.request(app)
        .get('/api/v1/admin/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.deep.eq([]);
          done();
      });
    });
  });

  describe('/POST user', () => {
    it('it should POST a user', (done) => {
      const userData = userFactory.data();

      chai.request(app)
        .post('/api/v1/admin/users')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.username.should.be.eq(userData.username);
          done();
      });
    });
  });

  describe('/GET/:id user', () => {
    it('it should GET uesr by the given id', (done) => {
      userFactory.create()
        .then((user) => {
          chai.request(app)
            .get('/api/v1/admin/users/' + user.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.id.should.be.eq(user.id);
              done();
            });
      }).catch((error) => done(error));
    });
  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE user given the id', (done) => {
      const userData = userFactory.data();

      userFactory.create({ username: userData.username })
        .then((user) => {
          chai.request(app)
            .put('/api/v1/admin/users/' + user.id)
            .send(userData)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.email.should.be.eq(userData.email);
              done();
            });
      }).catch((error) => done(error));
    });
  });

  describe('/DELETE/:id user', () => {
    it('it should DELETE user given the id', (done) => {
      userFactory.create()
        .then((user) => {
          chai.request(app)
            .delete('/api/v1/admin/users/' + user.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.deep.eq([]);
              done();
            });
      }).catch((error) => done(error));
    });
  });
});
