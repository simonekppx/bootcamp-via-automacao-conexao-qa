/// <reference types="cypress" />

describe('Testes de criação de Postagens', () => {
    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });


    it('[POST] - Criar uma postagem', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: {
                "text": "Postagem pelo Cypress Simone"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })

    it('[GET] - Consultar uma postagem', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[GET] - Consultar uma postagem por ID', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts/6317539de3f7ef00154767a4',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[GET] - Consultar uma postagem por ID com commands', () => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id
            cy.request({
                method: 'GET',
                url: `/api/posts/${id}`,
                headers: {
                    cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('[DELETE] - Excluir uma postagem', () => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `/api/posts/${id}`,
                headers: {
                    cookie: token
                }
            }).then((response) => {
                expect(response.body.msg).to.eq("Post removido")
            })
        })
    })
})

describe('Testes de Alteração', () => {
    let token
    beforeEach(() => {
        cy.tokenJwt().then((auth) =>{
            token = auth
        })
    });
    
    it('[PUT] - Curtir uma postagem', () => {
        cy.criarPostagem(token, "PostagemID").then((response) => {
            let id = response.body._id
            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${id}`,
                headers: {
                    cookie: token
                }
                
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
});
