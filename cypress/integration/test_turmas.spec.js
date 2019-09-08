/// <reference types="Cypress" />

context('Verificação de turmas ', () => {

  it('Validar quantidade de alunos por tuma', () => {
    //Pega o Json padrão de turmas
    cy.fixture('turmas.json').as('fixtureTurma')
    cy.getTurmas().then((turmas) => {
      //validando se o número de turmas é igual ao esperado: 2
      expect(turmas).have.length(2)
      //validando se cada turma tem o número de alunos esperado
      expect(turmas[0].alunos).have.length(3)
      expect(turmas[1].alunos).have.length(1)
    })
  })
  it('Validar retorno de turmas', () => {
    //Pega o Json padrão de turmas
    cy.fixture('turmas.json').as('fixtureTurma')
    cy.getTurmas().then((turmas) => {
      //validando se o body do retorno está igual ao esperado comparando com modelo pré definido em um JSON 
      cy.get('@fixtureTurma').then((json) => {
        expect(turmas).to.be.eql(json.turmas)
      })
    })
  })
 
})