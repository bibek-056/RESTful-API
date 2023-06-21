import chai from "chai";
import chaiHttp from "chai-http";
import app from './server.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Endpoint Tests', () => {
  // Test cases for GET /users endpoint
  describe('GET /users', () => {
    it('should return an array of users', (done) => {
      chai
        .request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Test cases for GET /users/:id endpoint
  describe('GET /users/:id', () => {
    it('should return a user by id', (done) => {
      const userId = 1 ; 
      chai
        .request(app)
        .get(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(userId);
          done();
        });
    });
  });

  // Test cases for POST /users endpoint
  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const newUser = {
        user_name: 'Dave Johne',
        email: 'johne.dave@example.com',
        phone: 1238737890,
      };
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body.user_name).to.equal(newUser.user_name);
          expect(res.body.email).to.equal(newUser.email);
          expect(res.body.phone).to.equal(newUser.phone);
          done();
        });
    });
  });

  // Test cases for DELETE /users/:id endpoint
  describe('DELETE /users/:id', () => {
    it('should delete a user by id', (done) => {
      const userId = 24; 
      //DONOT USE SAME "userId" TO RUN TWO OR MORE CONSECUTIVE TEST CASES!!!
      chai
        .request(app)
        .delete(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  // Test cases for PATCH /users/:id endpoint
  describe('PATCH /users/:id', () => {
    it('should update a user by id', (done) => {
      const userId = 21; 
      const updatedUserData = {
        user_name: 'Updated Name',
        email: 'updated@example.com',
        phone: 9876543210,
      };
      chai
        .request(app)
        .patch(`/users/${userId}`)
        .send(updatedUserData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(userId);
          expect(res.body.user_name).to.equal(updatedUserData.user_name);
          expect(res.body.email).to.equal(updatedUserData.email);
          expect(res.body.phone).to.equal(updatedUserData.phone);
          done();
        });
    });
  });
});
