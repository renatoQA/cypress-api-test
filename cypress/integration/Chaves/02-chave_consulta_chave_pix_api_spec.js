const constants = require('../../utils/constants')


//Teste para a consulta de chave do PIX
describe('Teste de consulta de chave PIX', () => {
    it('deve retornar status 200 e os dados da chave requisitada', () => {
      cy.request({
      method: 'GET', 
      url: `${constants.URL}/chave-gestao-api/jdpi/dict/api/v1/${constants.ADDRESSINGKEY}`,
      headers: {
        'idUsuarioLogado': '11385419660' ,
        'Authorization': `Bearer ${constants.BEARERTOKEN_KEYS}`,
        'x-correlation-id': '5508efc1-2e5a-4a6e-ace3-0019e7ed26b1'
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('chave')
        expect(response.body).to.have.property('ispb')
        expect(response.body).to.have.property('nrAgencia')
        expect(response.body).to.have.property('nrConta')
        expect(response.body).to.have.property('tpConta')
        expect(response.body).to.have.property('tpPessoa')
        expect(response.body).to.have.property('cpfCnpj')
        expect(response.body).to.have.property('nome')
        expect(response.body).to.have.property('nomeFantasia')
        expect(response.body).to.have.property('dtHrCriacaoChave')
        expect(response.body).to.have.property('dtHrInicioPosseChave')
        expect(response.body).to.have.property('dtHrAberturaConta')
        expect(response.body).to.have.property('endToEndId')
      })
    })
  })
