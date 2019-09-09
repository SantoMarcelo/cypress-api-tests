/// <reference types="Cypress" />

context('Verificação de login de usuário ', () => {

  function rand(valMin, valMax) {
    return Math.floor(Math.random() * (valMax - valMin));
  }
  //gera um email com valor randomico para não gerar problema de usuário duplicado
  const random = rand(0, 10000)

  it('Validar login com novo usuário', () => {
    cy.fixture('usuario_default.json').then((user) => {
      //chama o endpoint do login
      cy.login(user).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(200)
        //valida que recebeu um token no retorno do login
        expect(response.body.token).is.not.null
      })
    })
  })
  it('Validar login com usuário inválido', () => {
    cy.fixture('usuario_com_email_vazio.json').then((user) => {
      //chama o endpoint do login
      cy.login(user, false).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(400)
        //valida mensagem de validação
        expect(response.body.message).to.be.eql("Email ou password incorreto")
      })
    })
  })
  it('Validar login com senha inválida', () => {
    cy.fixture('usuario_com_pass_vazio.json').then((user) => {
      //chama o endpoint do login
      cy.login(user, false).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(400)
        //valida mensagem de validação
        expect(response.body.message).to.be.eql("Email ou password incorreto")
      })
    })
  })

})  