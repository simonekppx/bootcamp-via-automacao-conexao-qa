/// <reference types="cypress" />
const experienciaPage = require('../../support/Experiencia/experiencia-pages')
import experience from "../../fixtures/experiencia.json"


describe('Funcionalidade: Adicionar experiência', () => {

    beforeEach(() => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })
        cy.visit('adicionar-experiencia')
    });
    it('Deve adicionar uma experiência com sucesso - usando pages', () => {
        experienciaPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020', '01/01/2040', 'ViaHub é top')
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve adicionar uma experiência Atual com sucesso - usando pages', () => {
        experienciaPage.addExperienciaAtual('QA', 'Via', 'SP', '01/01/2020', 'ViaHub é top')
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve excluir uma experiência com sucesso - usando pages', () => {
        experienciaPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020', '01/01/2040', 'ViaHub é top')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Removida').should('be.visible')
    });

    it('Deve adicionar uma experiência com sucesso - Usando fixture', () => {
        cy.fixture("experiencia").then((experience) => {
            experienciaPage.addExperienciaAtual(experience[1].posicao, experience[1].empresa, experience[1].local, experience[1].dataInicio, experience[1].dataFim, experience[1].descricao)
        })
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it.only('Deve adicionar uma experiência Atual com sucesso - usando importacao', () => {
        experienciaPage.addExperienciaAtual(experience[1].posicao, experience[1].empresa, experience[1].local, experience[1].dataInicio, experience[1].dataFim, experience[1].descricao)
        cy.get('[data-test="experience-delete"]').should('exist')
    });
    
});