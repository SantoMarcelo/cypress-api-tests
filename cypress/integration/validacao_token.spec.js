/// <reference types="Cypress" />

context('Verificação das validações de token ', () => {


  it('Validar token inválido', () => {
    cy.fixture('novo_usuario.json').then((user) => {
      //chama o endpoint do login
      cy.tokenValidator(user, 'alunos', 'Bearer Invalid Token', false).then((response) => {
        // //valida o código do status retornado
         expect(response.status).to.be.eql(401)
        //  //valida mensagem de validação
       /  expect(response.body.message).to.be.eql("Token de acesso não é válido")
      })
    })
  })
  it('Validar tipo de autenticação', () => {
    cy.fixture('novo_usuario.json').then((user) => {
      //chama o endpoint do login
      cy.tokenValidator(user, 'alunos', ' ', false).then((response) => {
        // //valida o código do status retornado
         expect(response.status).to.be.eql(401)
        //  //valida mensagem de validação
       /  expect(response.body.message).to.be.eql("Tipo de autenticação deve ser Bearer")
      })
    })
  })
  it('Validar obrigatoriedade de autenticação', () => {
    cy.fixture('novo_usuario.json').then((user) => {
      //chama o endpoint do login
      cy.tokenValidator(user, 'alunos', undefined, false).then((response) => {
        // //valida o código do status retornado
         expect(response.status).to.be.eql(401)
        //  //valida mensagem de validação
       /  expect(response.body.message).to.be.eql("Autenticação necessária")
      })
    })
  })
 
})  