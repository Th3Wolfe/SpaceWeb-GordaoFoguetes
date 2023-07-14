document.addEventListener("DOMContentLoaded", function(){
  // Obtém a string da URL atual
  const queryString = window.location.search;

  // Cria um objeto URLSearchParams a partir da string da URL
  const urlParams = new URLSearchParams(queryString);

  // Obtém o valor do parâmetro 'parametro'
  const parametro = urlParams.get('parametro');

  // Verifica se o parâmetro existe
  if (parametro) {
    // Faça algo com o valor do parâmetro
    console.log(parametro);
  }

  var nave = document.getElementById("nave");
  const projeteisContainer = document.getElementById("projeteis");
  const inimigosContainer = document.getElementById("projeteis");
  const posicaoInicial = nave.offsetLeft;
  let projeteisInterval;
  let inimigosInterval;
  let colisaoInterval;
  let positionX = posicaoInicial;
  let projeteis = [];
  let inimigos = [];
  let lvl = 1;
  let _acceleration = 0.3;

  const width_left = 70;
  const width_right = screen.width - 70;  

  document.addEventListener("keydown", moveNave);
  document.addEventListener("keyup", reset_acceleration);

  function loop(){
    nave.style.top = 600 + 'px';
    requestAnimationFrame(loop);

    // Funções de atualização do jogo
    moverProjeteis();
    moverInimigos();
    verificarColisao();
  }

  projeteisInterval = setInterval(criarProjetilLVL1, 200);
  inimigosInterval = setInterval(criarInimigo, 180);
  colisaoInterval = setInterval(verificarColisao, 350);
  setInterval(function() {reproduzirSom('trilha.mp3')}, 15000);
  loop();

  function reset_acceleration(event){
    _acceleration = 0.3;
  }

  function moveNave(event){
    const key = event.keyCode;

    if(key === 37 || key == 65){ // Tecla esquerda ou "a"
      if(positionX > width_left){
        positionX -= 100;
      }
    }
    else if(key === 39 || key == 68){ // Tecla direita ou "d"
      if(positionX < width_right){
        positionX += 100;
      }
    }
    nave.style.left = positionX + "px";
  }

  function criarProjetilLVL1(){
    if(lvl === 2){
      criarProjetilLVL2();
    }
    if(lvl === 3){
      criarProjetilLVL2();
      criarProjetilLVL3();
    }
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");
    projeteisContainer.appendChild(projetil);

    const posicaoInicialX = nave.offsetLeft;
    const posicaoInicialY = nave.offsetTop;

    projetil.style.left = posicaoInicialX - 3 + "px";
    projetil.style.top = posicaoInicialY - 3 + "px";

    projeteis.push({
      element: projetil,
      posX: posicaoInicialX,
      posY: posicaoInicialY
    });

  }

  function criarProjetilLVL2(){
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");
    projeteisContainer.appendChild(projetil);

    const posicaoInicialX = nave.offsetLeft;
    const posicaoInicialY = nave.offsetTop;

    projetil.style.left = posicaoInicialX - 40 + "px";
    projetil.style.top = posicaoInicialY - 40 + "px";

    projeteis.push({
      element: projetil,
      posX: posicaoInicialX,
      posY: posicaoInicialY
    });

  }

  function criarProjetilLVL3(){
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");
    projeteisContainer.appendChild(projetil);

    const posicaoInicialX = nave.offsetLeft;
    const posicaoInicialY = nave.offsetTop;

    projetil.style.left = posicaoInicialX + 38 + "px";
    projetil.style.top = posicaoInicialY + 38 + "px";

    projeteis.push({
      element: projetil,
      posX: posicaoInicialX,
      posY: posicaoInicialY
    });

  }

  function moverProjeteis(){
    for (let i = 0; i < projeteis.length; i++) {
      const projetil = projeteis[i];
      projetil.posY -= 40; // 
      projetil.element.style.top = projetil.posY + "px";

      if (projetil.posY < 0){
        projeteisContainer.removeChild(projetil.element);
        projeteis.splice(i, 1);
        i--;
      }
    }
  }

  function criarInimigo(){
    const inimigo = document.createElement("div");
    inimigo.classList.add("inimigo");
    inimigosContainer.appendChild(inimigo);

    const numeroAleatorio = Math.floor(Math.random() * 7) + 1;

    var pontosElement = document.getElementById("valorPontos");
    var pontos = parseInt(pontosElement.innerText);

    if(numeroAleatorio === 2 && pontos > 100){
      inimigo.style.backgroundImage = 'url(inimigo2.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 120 + 'px';
      inimigo.style.height = 80 + 'px';
    }
    if(numeroAleatorio === 3 && pontos > 11000){
      inimigo.style.backgroundImage = 'url(inimigo3.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 60 + 'px';
    }
    if(numeroAleatorio === 4 && pontos > 110000){
      inimigo.style.backgroundImage = 'url(inimigo4.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 90 + 'px';
      inimigo.style.height = 80 + 'px';
    }
    if(numeroAleatorio === 5 && pontos > 1000){
      inimigo.style.backgroundImage = 'url(inimigo5.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 90 + 'px';
      inimigo.style.height = 90 + 'px';
    }
    if(numeroAleatorio === 6 && pontos > 10000){
      inimigo.style.backgroundImage = 'url(inimigo6.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.height = 70 + 'px';
      inimigo.style.width = 90 + 'px';
    }
    if(numeroAleatorio === 7 && pontos > 100000){
      inimigo.style.backgroundImage = 'url(inimigo7.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.height = 70 + 'px';
      inimigo.style.width = 90 + 'px';
    }

    const limiteEsquerdo = 30; // Defina o limite esquerdo para o movimento do inimigo
    const limiteDireito = window.innerWidth - 130; // Defina o limite direito para o movimento do inimigo
    const posicaoInicialX = Math.random() * (limiteDireito - limiteEsquerdo) + limiteEsquerdo;
    const posicaoInicialY = 0;

    inimigo.style.left = posicaoInicialX + "px";
    inimigo.style.top = posicaoInicialY + "px";

    inimigos.push({
      element: inimigo,
      posX: posicaoInicialX,
      posY: posicaoInicialY,
    });
  }

  function moverInimigos(){
    for (let i = 0; i < inimigos.length; i++){
      const inimigo = inimigos[i];
      inimigo.posY += 7;
      inimigo.element.style.transform = `translateY(${inimigo.posY}px)`;

      if(inimigo.posY > window.max-innerHeight || inimigo.posY > nave.offsetTop){
        inimigosContainer.removeChild(inimigo.element);
        inimigos.splice(i, 1);
        i--;
      }

      if(colisao(nave, inimigo.element)){
        inimigosContainer.removeChild(inimigo.element);
        inimigos.splice(i, 1);
        i--;
        diminuirVida();
      }
    }
  }

  function colisao(element1, element2){
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.bottom < rect2.top ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
  }

  function verificarColisao(){
    for (let i = 0; i < projeteis.length; i++){
      const projetil = projeteis[i];

      for (let j = 0; j < inimigos.length; j++){
        const inimigo = inimigos[j];
        if (colisao(projetil.element, inimigo.element)){
          const explosao = document.createElement("div");
          explosao.classList.add("explosao");
          explosao.style.left = inimigo.posX + "px";
          explosao.style.top = inimigo.posY + "px";
          projeteisContainer.appendChild(explosao);

          setTimeout(function(){
            projeteisContainer.removeChild(explosao);
          },3000);

          projeteisContainer.removeChild(projetil.element);
          projeteis.splice(i, 1);

          aumentarPontos(inimigo);

          inimigosContainer.removeChild(inimigo.element);
          inimigos.splice(j, 1);

          reproduzirSom('arcade.wav');
          i--;
          break;
        }
      }
    }
  }

  function aumentarPontos(inimigo){
    var pontosElement = document.getElementById("valorPontos");
    var pontos = parseInt(pontosElement.innerText);
    if(pontos > 1000 && pontos < 10000){
      lvl = 2;
    } // aumenta o LVL da nave para 2
    if(pontos > 10000){
      lvl = 3;
    }

    const palavraChave = "inimigo";
    var estilo = window.getComputedStyle(inimigo.element);
    var url = estilo.backgroundImage;
    var indice = url.indexOf(palavraChave);
    url = url.substring(indice);
    console.log(url);

    if(url === 'inimigo.png")'){
      pontos += 10;
    }
    if(url === 'inimigo2.png")'){
      pontos += 100;
    }
    if(url === 'inimigo3.png")'){
      pontos += 10000;
    }
    if(url === 'inimigo4.png")'){
      pontos += 100000;
    }
    if(url === 'inimigo5.png")'){
      pontos -= 100;
    }
    if(url === 'inimigo6.png")'){
      pontos -= 1000;
    }
    if(url === 'inimigo7.png")'){
      pontos -= 10000;
    }

    pontosElement.innerText = pontos;

    // Armazena os pontos no sessionStorage
    sessionStorage.setItem("pontos", pontos);
  }

  function reproduzirSom(stringsom){
    var som = new Audio(stringsom);
    som.play();
  }

  function diminuirVida(){
    var pontosElement = document.getElementById("valorVida");
    var pontos = parseInt(pontosElement.innerText);
    if(pontos === 1){
      gameover();
    }
    pontos -= 1;
    pontosElement.innerText = pontos;
  }

  function gameover() {
    

    var pontosElement = document.getElementById("valorPontos");
    var pontosTeste = parseInt(pontosElement.innerText);
    
    const nomeTeste = parametro;

    

    clearInterval(inimigosInterval);
    clearInterval(projeteisInterval);
    clearInterval(colisaoInterval);
    reproduzirSom('aplauso.wav');

    // Armazenar o nome do jogador em sessionStorage
    sessionStorage.setItem("nomeJogador", nomeTeste);

    // Armazenar o valor dos pontos em sessionStorage
    sessionStorage.setItem("pontos", pontosTeste);

    // Redirecionar para a página de scores
    window.location.href = "tela-de-scores.html";
  }
});
