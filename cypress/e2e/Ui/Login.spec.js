/// <reference types="cypress" />

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('login')
    });
    it('Deve fazer login com sucesso', () => {
        cy.login('usuariodeteste1@teste.com.br', 'R@diokppx123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha inválidos', () => {
        cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type('usuariodeteste@teste.com.br')
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type('R@diokppx123')
        cy.get('[data-test="login-submit"]').click()

        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });

});

/*
Funcionalidade: Login
Eu como usuário da Conexão QA
Quero fazer o login
Para editar meu perfil



Cenário: Login com sucesso
Arrange - Dado


Cenário: Validar mensagem de erro

Cenário: Recuperar senha



*/