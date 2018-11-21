const app = require('../../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const { truncate } = require('../../helper');
const clientFactory = require('../../factories/client');
const should = chai.should();

const version = process.env.API_VERSION;

chai.use(chaiHttp);

const hydraAdminUrl = process.env.HYDRA_ADMIN_URL;

describe('Client', () => {
  describe('/GET clients', () => {
    before((done) => {
      truncate().then(() => {
        nock(hydraAdminUrl).get('/clients').reply(200, [{}]);
        done();
      }).catch((error) => done(error));
    });

    it('it should GET all clients', (done) => {
      chai.request(app)
        .get(`/api/${version}/admin/clients`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.deep.eq([{}]);
          done();
      });
    });
  });

  describe('/POST client', () => {
    let clientData = clientFactory.data();

    before((done) => {
      truncate().then(() => {
        clientData.client_secret = 'client-secret';

        nock(hydraAdminUrl).post('/clients').reply(200, clientData);
        done();
      }).catch((error) => done(error));
    });

    it('it should POST a client', (done) => {

      chai.request(app)
        .post(`/api/${version}/admin/clients`)
        .send(clientData)
        .end((err, res) => {
          res.body.clientSecret.should.be.eq('client-secret');
          done();
      });
    });
  });

  describe('/PUT/:id client', () => {
    let clientData = clientFactory.data();
  
    before((done) => {
      truncate().then(() => {
        clientData.client_id = 'client-id';
        clientData.client_secret = 'client-secret';

        nock(hydraAdminUrl).post('/clients').reply(200, clientData);

        clientData.client_name = 'ClientName.New';
        nock(hydraAdminUrl).put('/clients/client-id').reply(200, clientData);
    
        chai.request(app)
          .post(`/api/${version}/admin/clients`)
          .send(clientData)
          .end((err, res) => {
            done();
        });
      }).catch((error) => done(error));
    });
  
    it('it should UPDATE client given the id', (done) => {
      chai.request(app)
        .put(`/api/${version}/admin/clients/client-id`)
        .send({client_name: 'ClientName.New'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.clientName.should.be.eq('ClientName.New');
          done();
        });
    });
  });
  

  describe('/DELETE/:id client', () => {
    let clientData = clientFactory.data();

    before((done) => {
      truncate().then(() => {
        clientData.client_id = 'client-id';
        clientData.client_secret = 'client-secret';

        nock(hydraAdminUrl).post('/clients').reply(200, clientData);
        nock(hydraAdminUrl).put('/clients/client-id').reply(200, clientData);
        nock(hydraAdminUrl).delete('/clients/client-id').reply(200, []);
        
        chai.request(app)
          .post(`/api/${version}/admin/clients`)
          .send(clientData)
          .end((err, res) => {
            done();
        });
      }).catch((error) => done(error));
    });

    it('it should DELETE client given the client id', (done) => {
      chai.request(app)
        .delete(`/api/${version}/admin/clients/` + 'client-id')
        .end((err, res) => {
          console.log(res.body);
          
          res.should.have.status(200);
          done();
      });
    });
  });
});
