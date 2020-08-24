var chai  = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const url = 'http://localhost:3000';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQUJDIiw';

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
    .set('authorization', token)
    .end((error, response) => {
        chai.expect(response).to.have.status(403);
        done();
    });
});
