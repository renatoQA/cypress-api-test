const constants = require('../../utils/constants')


// Gera um uuid para ser utilizado randomicamente em cada teste
function uuid() {

  // Retorna um número randômico entre 0 e 15.
  function randomDigit() {
  
      // Se o browser tiver suporte às bibliotecas de criptografia, utilize-as;
      if (crypto && crypto.getRandomValues) {
      
          // Cria um array contendo 1 byte:
          var rands = new Uint8Array(1);
          
          // Popula o array com valores randômicos
          crypto.getRandomValues(rands);
          
          // Retorna o módulo 16 do único valor presente (%16) em formato hexadecimal
          return (rands[0] % 16).toString(16);
      } else {
      // Caso não, utilize random(), que pode ocasionar em colisões (mesmos valores
      // gerados mais frequentemente):
          return ((Math.random() * 16) | 0).toString(16);
      }
  }
  
  // A função pode utilizar a biblioteca de criptografia padrão, ou
  // msCrypto se utilizando um browser da Microsoft anterior à integração.
  var crypto = window.crypto || window.msCrypto;
  
  // para cada caracter [x] na string abaixo um valor hexadecimal é gerado via
  // replace:
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}

//Teste para a inclusão de chave do PIX
describe('Teste de inclusão de chave PIX', () => {
    it('deve retornar status 200 e incluir uma nova chave Pix',  () => {
       cy.request({
        method: 'POST', 
        url: `${constants.URL}/chave-gestao-api/jdpi/dict/api/v1/incluir`,
        headers: {
        'Chave-Idempotencia': uuid() ,
        'Authorization': `Bearer ${constants.BEARERTOKEN_KEYS}`
      },
        body:
      {
        "tpChave": 2,
        "chave": constants.ADDRESSINGKEY,
        "ispb": 13140088,
        "nrAgencia": "1",
        "tpConta": 0,
        "nrConta": "034",
        "tpPessoa": 0,
        "cpfcnpj": 11385419660,
        "DtHrAberturaConta": "2019-10-25T14:06:31.976Z",
        "nome": "Automation Test",
        "nomeFantasia": "",
        "motivo": 0
      }
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('chave')
        expect(response.body).to.have.property('dtHrCriacaoChave')
        expect(response.body).to.have.property('dtHrInicioPosseChave')
      })
    })
  })
