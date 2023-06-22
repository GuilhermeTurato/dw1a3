function buscarPiada() {
    var url = "https://api.chucknorris.io/jokes/random";
  
    fetch(url)
      .then(response => response.json())
      .then(data => exibirPiada(data.value))
      .catch(error => console.log(error));
  }
  
  function exibirPiada(piada) {
    var piadaElement = document.getElementById("piada");
    piadaElement.innerHTML = `<p>${piada}</p>`;
  }
  