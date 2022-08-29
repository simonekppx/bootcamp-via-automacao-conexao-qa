/// <reference types="cypress" />
const faker = require('faker-br')

describe('Funcionalidade Perfil', () => {
    beforeEach(() => {
        cy.visit('cadastrar')
        cy.cadastro('Usuário de Teste Cinquenta', faker.internet.email(), 'R@diokppx123', 'R@diokppx123')
    });
    it('Deve preencher perfil com sucesso', () => {
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('#mui-component-select-status').click()
        cy.get('.MuiMenu-list li')

            .then(($li) => {

                const items = $li.toArray()

                return Cypress._.sample(items)

            }).click()
        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type('Via Hub')
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type('http://www.viahub.com.br')
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type('São Paulo, SP')
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type('Testes de Integração, Testes de UI')
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type('github.com')
        cy.get('[data-test="profile-bio"]').type('Estou aprendendo automação de testes com Cypress')
        //cy.get('[data-test="profile-submit"]').click()
        //Resultado esperado
        //cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')

    });

    it.only('Deve preencher perfil com campo obrigatório Conhecimentos em branco', () => {
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('#mui-component-select-status').click()
        cy.get('.MuiMenu-list li')

            .then(($li) => {

                const items = $li.toArray()

                return Cypress._.sample(items)

            }).click()
        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type('Via Hub')
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type('http://www.viahub.com.br')
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type('São Paulo, SP')
        //cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type('Testes de Integração, Testes de UI')
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type('github.com')
        cy.get('[data-test="profile-bio"]').type('Estou aprendendo automação de testes com Cypress')
        cy.get('[data-test="profile-submit"]').click()
        //Resultado esperado
        cy.get('.MuiFormHelperText-root').should('contain', 'Conhecimentos é obrigatório')
    });
});