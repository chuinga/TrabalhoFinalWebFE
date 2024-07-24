function currentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    currentYear();
  });

  const atualizaContagem = (elemento) => {
    //Obter o valor a partir do atributo 'data-value' do elemento
    const valor = parseInt(elemento.dataset.value); //parseInt --> produz um valor inteiro ditado pela interpretação do conteúdo
    // Calcula o incremento a ser adicionado a cada intervalo de tempo
    const incremento = Math.ceil(valor / 1000); //Math.ceil arredonda valor para cima
    // Inicializar o valor inicial da contagem
    let valorInicial = 0;
    // Definição de uma função que será executada repetidamente a cada milissegundo
    const aumentaContagem = setInterval(() => {
      valorInicial += incremento;     // Adiciona o incremento ao valor inicial
      if (valorInicial > valor) {    // Verifica se o valor inicial ultrapassou o valor desejado
        elemento.textContent = `${valor}`; // Define o texto do elemento para o valor desejado 
        clearInterval(aumentaContagem);// Para a execução repetida da função
        return;
      }
      elemento.textContent = `${valorInicial}`; // Atualiza o texto do elemento para o valor atual da contagem
    }, 1);                                // O intervalo de tempo é definido como 1 milissegundo
  };
  // Seleciona todos os elementos da página com a classe 'numero' e converte-os num array
  const items = [...document.querySelectorAll('.number')];
  // Para cada elemento selecionado, aplica a função 'atualizaContagem'
  items.forEach((item) => {
    atualizaContagem(item);
  });