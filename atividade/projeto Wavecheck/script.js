const operadorSelect = document.getElementById('opcoes');
const numeroInput = document.getElementById('meuInput');
const calcularButton = document.getElementById('calcular');
const resultadoP = document.getElementById('resultado');

calcularButton.addEventListener('click', function() {
  const opcoes = Number(operadorSelect.value);
  const meuInput = Number(numeroInput.value);
  const resultado = opcoes * meuInput;

  resultadoP.textContent = '' + resultado;
});
