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
describe('Teste de geracao de qrcode estatico', () => {
    it('deve retornar status 200 e gerar um payload de qrcode',  () => {
       cy.request({
        method: 'POST', 
        url: `${constants.URL}/qrcode-api/jdpi/qrcode/api/v1/estatico/gerar`,
        headers: {
        'Authorization': `Bearer ${constants.BEARERTOKEN_QRCODE}`
      },
        body:
        {
            "formato": 1,
            "chave": constants.ADDRESSINGKEY_QRCODE,
            "codigoCategoria": null,
            "valor": 10,
            "nomeRecebedor": "John Test",
            "cidade": "São Paulo",
            "cep": "04205000",
            "idConciliacaoRecebedor": "8f19a3c6d736486c835f29ba82d25425",
            "dadosAdicionais": null
        }
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('payloadBase64')
      })
    })
  })
