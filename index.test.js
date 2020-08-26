const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const url = 'http://localhost:3000';
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQUJDIiw';
const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQUJDIiwiaWF0IjoxNTk4Mjg4MjE4fQ.PwN5mljtIi21jgw2yEpl5q7a162Fxe6p7jrw9CPYkl4';

it('Unauthorized', (done) => {
  chai.request(url)
    .get('/verify')
    .end((error, response) => {
      chai.expect(response).to.have.status(401);
      done();
    });
});

it('Forbidden', (done) => {
  chai.request(url)
    .get('/verify')
    .set('authorization', invalidToken)
    .end((error, response) => {
      chai.expect(response).to.have.status(403);
      done();
    });
});

it('Authorize', (done) => {
  chai.request(url)
    .get('/verify')
    .set('authorization', validToken)
    .end((error, response) => {
      chai.expect(response).to.have.status(200);
      done();
    });
});
