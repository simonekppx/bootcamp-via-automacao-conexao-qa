// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
import auth from '../fixtures/auth.json'
import experienciaprof from '../fixtures/expprof.json'

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, senha) => {
    cy.visit('login')
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add("cadastro", (nome, email, senha, confirmarsenha) => {
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(confirmarsenha)
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('criarPerfil', (cia, site, cidade, skills, github, minibio) => {
    cy.visit('criar-perfil')
    cy.get('#mui-component-select-status').click()
    cy.contains('Especialista em QA').click()
    cy.get('[data-test="profile-company"]').type(cia)
    cy.get('[data-test="profile-webSite"]').type(site)
    cy.get('[data-test="profile-location"]').type(cidade)
    cy.get('[data-test="profile-skills"]').type(skills)
    cy.get('[data-test="profile-gitHub"]').type(github)
    cy.get('[data-test="profile-bio"]').type(minibio)
    cy.get('[data-test="profile-submit"]').click()
})

Cypress.Commands.add('criarExperiencia', (posicao, empresa, local, dataInicio, dataFim, descricao) => {
    cy.visit('adicionar-experiencia')
    cy.get('[data-test="experience-title"]').type(posicao)
    cy.get('[data-test="experience-company"]').type(empresa)
    cy.get('[data-test="experience-location"]').type(local)
    cy.get('#from').type(dataInicio)
    cy.get('#to').type(dataFim)
    cy.get('[rows="1"]').type(descricao)
    cy.get('[data-test="experience-submit"]').click()
})

Cypress.Commands.add("tokenJwt", () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add("criarPostagem", (token, value) => {
    cy.request({
        method: 'POST',
        url: '/api/posts',
        headers: {
            cookie: token
        },
        body: {
            text: "bootcamp06-09-22-simone"
        }
    })
})

Cypress.Commands.add("criarExpProf", (token, value) => {
    cy.request({
        method: 'PUT',
        url: '/api/profile/experience',
        headers: {
            Cookie: token
        },
        body: experienciaprof
    })
})