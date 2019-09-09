// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('registrar', (user, failOnStatusCode = true) => {

  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/registrar`,
    body: {
      email: user.email,
      password: user.password
    },
    failOnStatusCode: failOnStatusCode
  }).then((response) => {
    return response
  })
});

Cypress.Commands.add('login', (user, failOnStatusCode = true) => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: user.email,
      password: user.password
    },
    failOnStatusCode: failOnStatusCode
  }).then((response) => {
    return response
  })
});
Cypress.Commands.add('tokenValidator', (user, endpoint, token, failOnStatusCode = true) => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/${endpoint}`,
    headers: {
      Authorization: token
    },
    body: {
      email: user.email,
      password: user.password
    },
    failOnStatusCode: failOnStatusCode

  }).then((response) => {
    return response
  })
});

Cypress.Commands.add('getToken', () => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: "paulo@email.com",
      password: "paulo"
    }
  }).then((response) => {
    return response.body.token
  })
});

Cypress.Commands.add('getAlunos', () => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: "paulo@email.com",
      password: "paulo"
    }
  }).then((response) => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/alunos`,
      headers: {
        Authorization: `Bearer ${response.body.token}`
      }
    }).then((resp) => {
      console.log('Alunos', resp.body)
    })
  })
});

Cypress.Commands.add('getTurmas2', () => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: "paulo@email.com",
      password: "paulo"
    }
  }).then((response) => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/turmas`,
      headers: {
        Authorization: `Bearer ${response.body.token}`
      }
    }).then((resp) => {
      console.log('Turmas', resp.body)
      return resp
    })
  })
});

Cypress.Commands.add('getProfessores', () => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: "paulo@email.com",
      password: "paulo"
    }
  }).then((response) => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/professores`,
      headers: {
        Authorization: `Bearer ${response.body.token}`,
      }
    }).then((resp) => {
      return resp.body
    })
  })
});

Cypress.Commands.add('getDisciplinas', () => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: "paulo@email.com",
      password: "paulo"
    }
  }).then((response) => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/disciplinas`,
      headers: {
        Authorization: `Bearer ${response.body.token}`
      }
    }).then((resp) => {
      return resp.body
    })
  })
});

Cypress.Commands.add('getHorarios', () => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3000/auth/login`,
    body: {
      email: "paulo@email.com",
      password: "paulo"
    }
  }).then((response) => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/horarios`,
      headers: {
        Authorization: `Bearer ${response.body.token}`
      }
    }).then((resp) => {
      console.log('Horarios', resp.body)
    })
  })
});

Cypress.Commands.add('getTurmas', (turma, quantidade) => {
  cy.getToken().then((token) => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/turmas`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      return resp.body
    })
  })

});
Cypress.Commands.add('deleteUsuarios', () => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:3000/auth/registrar`,
    // body:{
    //   email: email,
    //   password: password
    // }
  }).then((response) => {
    console.log(response.body)
    return response.body
  })
});

Cypress.Commands.add('prepareFixture', (file, email, password, log) => {
  cy.readFile(`./cypress/fixtures/${file}`).then((content) => {
    content.email = email
    content.password = password
    cy.writeFile(`./cypress/fixtures/${file}`, content)

  })
});
