/// <reference types="cypress" />
const faker = require('faker-br')

describe('Funcionalidade: Cadastro', () => {
beforeEach(() => {
    cy.visit('cadastrar')
});

it('Deve fazer cadastro com sucesso', () => {
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Usuario de Teste Oitenta')
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email())
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('R@diokppx123')
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('R@diokppx123')
    cy.get('[data-test="register-submit"]').click()

    //Resultado esperado
    //cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Usuario de Teste Oitenta')
    
});
    
});