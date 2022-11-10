import sinon from 'sinon';
import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../../../app';
import User from '../../../database/models/User';
import MockUser from '../user/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a Rota de Login', () => {
  afterEach(sinon.restore);

  it('Faz Requisição para /login sem email', async function() {
    const response = await chai
    .request(app)
    .post('/login')
    .send({
      password: '123456'
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"email" is required'
    });
  });

  it('Faz Requisição para /login com email invalido', async function() {
    const response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'emailinvalido',
      password: '123456'
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"email" must be a valid email'
    });
  });

  it('Faz Requisição para /login sem password', async function() {
    const response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'email@test.com'
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"password" is required'
    })
  });

  it('Faz Requisição para /login com password menor que 6 caracteres', async function() {
    const response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'email@test.com',
      password: '123'
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"password" length must be at least 6 characters long'
    })
  });

  it('Faz Requisição para /login com email inexistente', async function() {
    sinon.stub(User, "findOne").resolves(null);

    const response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'emailincorreto@test.com',
      password: '123456'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'invalid credentials'
    })
  });

  it('Faz Requisição para /login com senha incorreta', async function() {
    sinon.stub(User, "findOne").resolves(MockUser);

    const response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'emailincorreto@test.com',
      password: '123456'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'invalid credentials'
    })
  });

  it('Faz Requisição para /login com sucesso e recebe o token', async function() {
    sinon.stub(User, "findOne").resolves(MockUser);

    const response = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'email@test.com',
      password: 'password'
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Faz Requisição para /login/verify com um token invalido', async function() {
    const response = await chai
    .request(app)
    .post('/login/verify')
    .set('authorization', 'token invalido');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'invalid token' });
  });

  it('Faz Requisição para /login/verify com um token valido', async function() {
    const response = await chai
    .request(app)
    .post('/login/verify')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJUZXN0IFVzZXIiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNjY3ODU5NDk5fQ.PUL7FsdYHDQahZYKReeruapE_EcLBRla79z7Zg7fg6I');

    expect(response.status).to.be.equal(200);
  });
})