/// <reference types="Cypress" />

// Criar 1 teste de contrato; 
// Criar 1 teste de cadastro +login de novo usuário; 
// Criar 1 teste para verificar a contagem de alunos nas turmas; 
// Criar 1 teste para verificar que a professora Débora dá aulas de matemática.


context('teste de contrato', () => {
  beforeEach(() => {

  })

  it('test login', () => {
    cy.getAlunos()
    cy.getTurmas()
    cy.getHorarios()
    cy.getProfessores()
    cy.getDisciplinas()
  })
  it('Validar quantidade de alunos por tuma', ()=>{
    //Pega o Json padrão de turmas
    cy.fixture('turmas.json').as('fixtureTurma')

    cy.getTurmas().then((turmas)=>{
      //validando se o número de turmas é igual ao esperado: 2
      expect(turmas).have.length(2)
      //validando se cada turma tem o número de alunos esperado
      expect(turmas[0].alunos).have.length(3)
      expect(turmas[1].alunos).have.length(1)
      //validando se o body do retorno está igual ao esperado comparando com modelo pré definido em um JSON 
      cy.get('@fixtureTurma').then((json)=>{
        expect(turmas).to.be.eql(json.turmas)
      })
    })
  })
  it.only('verificar que a professora Débora dá aulas de matemática', ()=>{
    var id_disciplina
    cy.fixture('professora_debora.json').as('fixtureProfessora')
    //percorre a lista de disciplinas e recupera ID da disciplina de matemática e salva na variável
    cy.getDisciplinas().then((disciplinas)=>{
      cy.wrap(disciplinas.body).each((item)=>{
        if(item.nome == 'Matemática'){
          id_disciplina = item.id
        }
      })
    })
    //percorre a lista de professores e verifica a disciplina da professora Débora
    cy.getProfessores().then((prof)=>{
      cy.wrap(prof.body).each((item)=>{
        if(item.nome == 'Débora'){
          //valida se o id da disciplina da prof débora é igual ao esperado
          expect(item.idDisciplina).to.be.eql(id_disciplina)
          //valida se o valor referente a professora débora no array de professores é igual ao modelo padrão definido no JSON
          cy.get('@fixtureProfessora').then((prof)=>{
            expect(item).to.be.eql(prof)
          })
        }
      })
    })
  })

 

})