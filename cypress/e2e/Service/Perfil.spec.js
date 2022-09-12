/// <reference types="cypress" />
import perfil from '../../fixtures/perfil.json'
import experienciaprof from '../../fixtures/expprof.json'

describe('Testes de criação de Perfil', () => {
    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });


    it('[POST] - Criar um perfil', () => {
        cy.request({
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: perfil
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

        it('[POST] - Atualizar um perfil', () => {
        cy.request({
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: perfil
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[GET] - Selecionar o perfil do usuário logado', () => {
        cy.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                Cookie: token
            }

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.user._id).to.eq("630e14eccd57cf0015b7ae8d")
        })
    })

    it('[PUT] - Adicionar experiência profissional no perfil', () => {
        cy.request({
            method: 'GET',
            url: '/api/profile/experience',
            headers: {
                Cookie: token
            },
            body: experienciaprof

        }).then((response) => {
            expect(response.status).to.eq(200)

        })
    })



})


describe('Testes de exclusão de Perfil', () => {
    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[DELETE] - Excluir Experiência profissonal', () => {
        cy.criarExpProf(token, "ExperienceID").then((response) => {
            //let id = response.body.experience._id
            let id = response.body.experience[0]._id
            cy.request({
                method: 'DELETE',
                url: `/api/profile/experience/${id}`,
                failOnStatusCode: false,
                headers: {
                    cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })



})

describe('Testes de exclusão de Usuário', () => {

    let token

    beforeEach(() => {

        cy.tokenJwt().then((auth) => {

            token = auth

        })

    })

    it('[DELETE] - Excluir Usuário', () => {

        cy.criarUsuario()

        cy.deletarUsuario(token, "Usuário removido").then((response) => {



        }).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body.msg).to.eq("Usuário removido")



        })

    });

});