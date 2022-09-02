/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

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

    it('Deve fazer login com sucesso - Usando importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
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