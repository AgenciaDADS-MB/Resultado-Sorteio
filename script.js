document.addEventListener('DOMContentLoaded', function() {
  console.log('Página carregada');

  // Selecionando os elementos HTML onde as informações serão exibidas
  const userEmailElement = document.querySelector('#email');
  const userNameElement = document.querySelector('#nome');
  const userLastnameElement = document.querySelector('#sobrenome');
  const userPhoneElement = document.querySelector('#telefone');
  const userNumberElement = document.querySelector('#numero');

  // Selecionando o botão de sorteio
  const btnSorteio = document.querySelector('#btn-submit');

  // Adicionando o evento de clique ao botão de sorteio
  btnSorteio.addEventListener('click', function(event) {
    console.log('Botão de sorteio clicado');
    event.preventDefault(); // evita que a página seja recarregada

    // Fazendo a requisição para obter o número total de linhas na tabela "Person"
    fetch('https://parseapi.back4app.com/classes/Sorteio?count=1&limit=0', {
      headers: {
        'X-Parse-Application-Id': 'EPNZxMljhBADfJGjCjGs61CKJ2AAz0uFE5lq828e', 
        'X-Parse-REST-API-Key': 'j8Gknt8SqbyXAOtcd7Qd13dvTROT12BOz3ybzg1F'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Número total de linhas obtido:', data.count);
      const totalRows = data.count;
      // Gerando um número aleatório entre 0 e totalRows
      const randomRow = Math.floor(Math.random() * totalRows);
      console.log('Linha aleatória gerada:', randomRow);

      // Fazendo a requisição para obter a linha aleatória da tabela "Person"
      fetch(`https://parseapi.back4app.com/classes/Sorteio?skip=${randomRow}&limit=1`, {
        headers: {
          'X-Parse-Application-Id': 'EPNZxMljhBADfJGjCjGs61CKJ2AAz0uFE5lq828e', 
          'X-Parse-REST-API-Key': 'j8Gknt8SqbyXAOtcd7Qd13dvTROT12BOz3ybzg1F'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Dados do usuário obtidos:', data.results[0]);
        // Atualizando o conteúdo dos elementos HTML com os dados puxados
        const user = data.results[0];
        userEmailElement.textContent = `Email: ${user.email}`;
        userNameElement.textContent = `Nome: ${user.name}`;
        userLastnameElement.textContent = `Sobrenome: ${user.lastname}`;
        userPhoneElement.textContent = `Telefone: ${user.phone}`;
        userNumberElement.textContent = `Número: ${user.number}`;
      });
    });
  });
});
