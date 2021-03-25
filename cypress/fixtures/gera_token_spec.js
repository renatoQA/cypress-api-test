
//Está gerando o token porém está retornando undefined//
//WIP//

const bearer = describe('Gerando o bearer Token', () => {
  it('deve retornar o bearer token', () => {
    cy.request({
    method: 'POST',
    url: 'http://jd-stg-k8s.aws.acesso.intra/auth/jdpi/connect/token', 
    form: true, 
    body: {
      client_id: 'corechespiritostg',
      client_secret: '_h46r3Jk3Z@@b@_-388$@G-3Bi7_8o-J',
      grant_type: 'client_credentials',
      scope: 'dict_api'
    },
  })
  .should ((response) => {
  expect(response.status).to.eq(200)
})
  })
}).access_token

const bearertoken = JSON.stringify(bearer)


module.exports = {
  bearertoken
};
