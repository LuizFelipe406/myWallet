import sinon from 'sinon';
import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../../../app';
import Expense from '../../../database/models/Expense';
import mockExpense from './mockExpense';

chai.use(chaiHttp);

const { expect } = chai;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJUZXN0IFVzZXIiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNjY3ODU5NDk5fQ.PUL7FsdYHDQahZYKReeruapE_EcLBRla79z7Zg7fg6I'

describe('Testes para Rota de Expenses', () => {
    after(sinon.restore);

    describe('Testes para o método GET', () => {
        it('Faz Requisição com token invalido', async function() {
            const response = await chai
            .request(app)
            .get('/expense')
            .set('authorization', 'token invalido')
            .send({
                "month": 11,
            });

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({
                message: "invalid token",
            });
        });

        it('Faz Requisição sem month no body', async function() {
            const response = await chai
            .request(app)
            .get('/expense')
            .set('authorization', TOKEN)
            .send({
                "year": 2022,
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: "fields missing",
            });
        });

        it('Faz Requisição sem year no body', async function() {
            const response = await chai
            .request(app)
            .get('/expense')
            .set('authorization', TOKEN)
            .send({
                "month": 11,
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: "fields missing",
            });
        });

        it('Faz Requisição e espera retornar as despesas de um usuario', async function() {
            sinon.stub(Expense, "findAll").resolves([mockExpense]);

            const response = await chai
            .request(app)
            .get('/expense')
            .set('authorization', TOKEN)
            .send({
                "month": 11,
                "year": 2022
            });

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.deep.equal([{
                id: mockExpense.id,
                name: mockExpense.name,
                value: mockExpense.value,
                category: mockExpense.category,
                userId: mockExpense.userId,
                date: mockExpense.date.toISOString()
            }]);
        })
    });

    describe('Testes para o método POST', () => {
        it('Faz Requisição com token invalido', async function() {
            const response = await chai
            .request(app)
            .post('/expense')
            .set('authorization', 'token invalido')
            .send({
                "month": 11,
            });

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({
                message: "invalid token",
            });
        });

        it('Faz Requisição sem name no body', async function() {
            const response = await chai
            .request(app)
            .post('/expense')
            .set("authorization", TOKEN)
            .send({
                value: "21,90",
                date: "2022-11-10",
                category: "Food"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"name" is required' 
            })
        });

        it('Faz Requisição sem value no body', async function() {
            const response = await chai
            .request(app)
            .post('/expense')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "2022-11-10",
                category: "Food"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"value" is required' 
            })
        });

        it('Faz Requisição sem category no body', async function() {
            const response = await chai
            .request(app)
            .post('/expense')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "2022-11-10",
                value: "21,90"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"category" is required' 
            })
        });

        it('Faz Requisição com data inválida no body', async function() {
            const response = await chai
            .request(app)
            .post('/expense')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "data invalida",
                value: "21,90",
                category: "Food"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"date" must be a valid date' 
            })
        });

        it('Faz Requisição e esperar retornar a nova despesa', async function() {
            sinon.stub(Expense, "create").resolves(mockExpense);

            const response = await chai
            .request(app)
            .post('/expense')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "2022-11-10",
                value: "21,90",
                category: "Food"
            });

            expect(response.status).to.be.equal(201);
            expect(response.body).to.be.deep.equal({
                id: mockExpense.id,
                name: mockExpense.name,
                value: mockExpense.value,
                category: mockExpense.category,
                userId: mockExpense.userId,
                date: mockExpense.date.toISOString()
            });
        })
    });

    describe('Testes para o método PUT', () => {
        it('Faz Requisição com token invalido', async function() {
            const response = await chai
            .request(app)
            .put('/expense/1')
            .set('authorization', 'token invalido')
            .send({});

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({
                message: "invalid token",
            });
        });

        it('Faz Requisição sem name no body', async function() {
            const response = await chai
            .request(app)
            .put('/expense/1')
            .set("authorization", TOKEN)
            .send({
                value: "21,90",
                date: "2022-11-10",
                category: "Food"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"name" is required' 
            })
        });

        it('Faz Requisição sem value no body', async function() {
            const response = await chai
            .request(app)
            .put('/expense/1')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "2022-11-10",
                category: "Food"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"value" is required' 
            })
        });

        it('Faz Requisição sem category no body', async function() {
            const response = await chai
            .request(app)
            .put('/expense/1')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "2022-11-10",
                value: "21,90"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"category" is required' 
            })
        });

        it('Faz Requisição com data inválida no body', async function() {
            const response = await chai
            .request(app)
            .put('/expense/1')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "data invalida",
                value: "21,90",
                category: "Food"
            });

            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.deep.equal({
                message: '"date" must be a valid date' 
            })
        });

        it('Faz Requisição e esperar retornar 200', async function() {
            sinon.stub(Expense, "update").resolves([1]);

            const response = await chai
            .request(app)
            .put('/expense/1')
            .set("authorization", TOKEN)
            .send({
                name: "Mc Donalds",
                date: "2022-11-10",
                value: "21,90",
                category: "Food"
            });

            expect(response.status).to.be.equal(200);
        })
    });

    describe('Testes para o método DELETE', () => {
        it('Faz Requisição com token invalido', async function() {
            const response = await chai
            .request(app)
            .delete('/expense/1')
            .set('authorization', 'token invalido')
            .send({});

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({
                message: "invalid token",
            });
        });

        it('Faz Requisição e espera retornar 200', async function () {
            sinon.stub(Expense, "destroy").resolves(1);

            const response = await chai
            .request(app)
            .delete('/expense/1')
            .set("authorization", TOKEN);

            expect(response.status).to.be.equal(200);
        })
    })
});