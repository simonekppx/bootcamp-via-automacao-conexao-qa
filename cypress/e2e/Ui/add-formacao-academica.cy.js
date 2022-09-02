/// <reference types="cypress" />
const academicaPages = require('../../support/Experiencia/academica-pages')
import formacao from "../../fixtures/formacao.json"

describe('Funcionalidade: Adicionar experiência', () => {

    beforeEach(() => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })
        cy.visit('adicionar-formacao')
    });
    it('Deve adicionar uma formação acadêmica com sucesso - usando Pages', () => {
        academicaPages.addFormacao('ETEC', 'Tecnico', 'TI', '01/01/2020', '01/01/2030', 'Engenheiro de QA')
        cy.get('[data-test="education-delete"]').should('exist')
    });

    it('Deve adicionar uma formação acadêmica com sucesso - usando fixture', () => {
        cy.fixture("formacao").then((formation) => {
        academicaPages.addFormacao(formation[1].escola, formation[1].grau, formation[1].curso, formation[1].dataInicio, formation[1].dataFim, formation[1].descricao)
    })
        cy.get('[data-test="education-delete"]').should('exist')
    });
    
    it('Deve adicionar uma formacao com sucesso - usando importacao', () => {
        academicaPages.addFormacao(formacao[1].escola, formacao[1].grau, formacao[1].curso, formacao[1].dataInicio, formacao[1].dataFim, formacao[1].descricao)
        cy.get('[data-test="experience-delete"]').should('exist')
    });
});