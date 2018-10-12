const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require('../user/user.model');

chai.config.includeStack = true;

describe('## Auth APIs', () => {
  // # TODO: Implement Authentication Tests.
  it('should signup a new user', (done) => {
    User.findOneAndRemove({ username: 'test' }, () => {
      agent
        .post('/auth/new')
        .send({
          username: 'test',
          password: 'test',
          fbUsername: 'lenzelwowe', // facebook
          igUsername: 'renzelwowe', // instagram
          twUsername: 'wenzelwowe', // twitter
          scUsername: 'senzelwowe', // snapchat
        })
        .end((req, res) => {
          res.status.should.be.equal(200);
          expect(res).to.have.cookie('nToken');
          done();
        });
    });
  });

  it('should fail to signup existing username', (done) => {
    agent
      .post('/auth/new')
      .send({
        username: 'test',
        password: 'test',
      })
      .end((req, res) => {
        res.status.should.be.equal(409);
        done();
      });
  });

  it('should try to login and fail (no user)', (done) => {
    agent
      .post('/auth/login')
      .send({
        username: 'rest',
        password: 'rest',
      })
      .end((req, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });

  it('should try to login and fail (wrong pw)', (done) => {
    agent
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'rest',
      })
      .end((req, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });

  it('should login and succeed', (done) => {
    agent
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test',
      })
      .end((req, res) => {
        res.status.should.be.equal(200);
        expect(res).to.have.cookie('nToken');
        done();
      });
  });

  it('should logout', (done) => {
    agent
      .post('/auth/logout')
      .end((req, res) => {
        res.status.should.be.equal(200);
        expect(res).to.not.have.cookie('nToken');
        done();
      });
  });
});