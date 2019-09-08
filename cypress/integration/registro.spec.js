/// <reference types="Cypress" />

context('Verificação de registro de novo usuário ', () => {


  beforeEach(() => {
    //recupera o JSON com o novo usuário

  })

  function rand(valMin, valMax) {
    return Math.floor(Math.random() * (valMax - valMin));
  }
  //gera um email com valor randomico para não gerar problema de usuário duplicado
  const random = rand(0, 10000)
  const email = `teste.${random}@test.com`

  it('Validar registro de novo usuário', () => {
    //prepara arquivo com dados do usuário
    cy.prepareFixture('novo_usuario.json', email, 'admin', 'novo user')
    cy.fixture('novo_usuario.json').then((user) => {
      //chama o endpoint do registro
      cy.registrar(user).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(201)
        //valida que recebeu um token no retorno do registro
        expect(response.body.token).is.not.null
      })
    })
  })
  it('Validar registro duplicado', () => {
    cy.fixture('novo_usuario.json').then((user) => {
      cy.registrar(user, false).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(400)
        //valida mensagem de validação
        expect(response.body.message).to.be.eql('Email já cadastrado')
      })
    })
  })
  it('Validar registro com email em branco', () => {
    cy.fixture('usuario_com_email_vazio.json').then((user) => {
      cy.registrar(user, false).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(400)
        //valida mensagem de validação
        expect(response.body.message).to.be.eql('Email ou password em branco')
      })
    })
  })
  it('Validar registro com senha em branco', () => {
    cy.fixture('usuario_com_pass_vazio.json').then((user) => {
      cy.registrar(user, false).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(400)
        //valida mensagem de validação
        expect(response.body.message).to.be.eql('Email ou password em branco')
      })
    })
  })
  it('Validar registro com email inválido', () => {
    //prepara o arquivo com a massa de dados em tempo de execução
    cy.prepareFixture('usuario_com_email_invalido.json', 'email.com', 'admin', 'email invalildo')
    cy.fixture('usuario_com_email_invalido.json').then((user) => {
      cy.registrar(user, false).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(400)
        //valida mensagem de validação
        expect(response.body.message).to.be.eql('Email inválido')
      })
    })
  })
  it('Validar login com novo usuário', () => {
    cy.fixture('novo_usuario.json').then((user) => {
      //chama o endpoint do login
      cy.login(user).then((response) => {
        //valida o código do status retornado
        expect(response.status).to.be.eql(200)
        //valida que recebeu um token no retorno do login
        expect(response.body.token).is.not.null
      })
    })
  })
})  