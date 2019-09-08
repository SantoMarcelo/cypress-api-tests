/// <reference types="Cypress" />

context('Verificação de professores', () => {

  it('verificar que a professora Débora dá aulas de matemática', () => {
    var id_disciplina
    cy.fixture('professora_debora.json').as('fixtureProfessora')
    //percorre a lista de disciplinas e recupera ID da disciplina de matemática e salva na variável
    cy.getDisciplinas().then((disciplinas) => {
      cy.wrap(disciplinas).each((item) => {
        if (item.nome == 'Matemática') {
          id_disciplina = item.id
        }
      })
    })
    //percorre a lista de professores e verifica a disciplina da professora Débora
    cy.getProfessores().then((prof) => {
      cy.wrap(prof).each((item) => {
        if (item.nome == 'Débora') {
          //valida se o id da disciplina da prof débora é igual ao esperado
          expect(item.idDisciplina).to.be.eql(id_disciplina)
          //valida se o valor referente a professora Débora no array de professores é igual ao modelo padrão definido no JSON
          cy.get('@fixtureProfessora').then((prof) => {
            expect(item).to.be.eql(prof)
          })
        }
      })
    })
  })
  it('verificar que a lista de professores está de acordo com a lista esperado', () => {
    cy.fixture('all_data.json').as('all_data')
    cy.get('@all_data').then((json) => {
      cy.getProfessores().then((prof) => {
        expect(prof).to.be.eql(json.professores)
      })
    })

  })
})