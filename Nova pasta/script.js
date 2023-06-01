document.addEventListener("DOMContentLoaded", function(){
  const fps = 60;
  const nave = document.getElementById("nave");
  const projeteisContainer = document.getElementById("projeteis");
  const inimigosContainer = document.getElementById("projeteis");
  const posicaoInicial = nave.offsetLeft;
  let positionX = posicaoInicial;
  let projeteis = [];
  let inimigos = [];
  let lvl = 1;
  document.addEventListener("keydown", moveNave);

  // 60 fps
  function loop() {
    requestAnimationFrame(loop);
    // Funções de atualização do jogo aqui
    moverProjeteis();
    moverInimigos();
    verificarColisao();
  }
  
  setInterval(criarProjetilLVL1, 350); // Cria um novo projetil a cada x segundo
  setInterval(criarInimigo, 300); // Cria um novo inimigo a cada x segundos
  setInterval(verificarColisao, 350); // verifica se houve colisão entre projeteis em x segundos
  loop();

  function moveNave(event){
    const key = event.keyCode;

    if(key === 37 || key == 65){ // Tecla esquerda
      positionX -= 40;
    }
    else if(key === 39 || key == 68){ // Tecla direita
      positionX += 40;
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

    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

    var pontosElement = document.getElementById("valorPontos");
    var pontos = parseInt(pontosElement.innerText);

    if(numeroAleatorio === 2 && pontos > 900){
      inimigo.style.backgroundImage = 'url(inimigo2.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 80 + 'px';
    }
    if(numeroAleatorio === 3 && pontos > 1900){
      inimigo.style.backgroundImage = 'url(inimigo3.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 60 + 'px';
    }
    if(numeroAleatorio === 4 && pontos > 2900){
      inimigo.style.backgroundImage = 'url(inimigo4.png)';
      inimigo.style.height = 60 + 'px';
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
      posY: posicaoInicialY
    });
  }
  
  function moverInimigos(){
    for (let i = 0; i < inimigos.length; i++){
      const inimigo = inimigos[i];
      inimigo.posY += 2;
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
  
          setTimeout(function (){
            projeteisContainer.removeChild(explosao);
          }, 3000);
  
          projeteisContainer.removeChild(projetil.element);
          projeteis.splice(i, 1);
          inimigosContainer.removeChild(inimigo.element);
          inimigos.splice(j, 1);

          aumentarPontos();
          i--;
          break;
        }
      }
    }
  }

  function aumentarPontos(){
    var pontosElement = document.getElementById("valorPontos");
    var pontos = parseInt(pontosElement.innerText);
    if(pontos > 1900 && pontos < 2900){
      lvl = 2;
    } // aumenta o LVL da nave para 2
    if(pontos > 2900){
      lvl = 3;
    }
    pontos += 100;
    pontosElement.innerText = pontos;
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

  function gameover(){
    const gameContainer = document.getElementById("fundo");
    gameContainer.style.display = "none";

    const gameOverScreen = document.getElementById("gameover");
    const gameOverPontos = document.getElementById("gameover-pontos");

    gameOverScreen.style.display = "block";

    gameOverPontos.textContent = document.getElementById("valorPontos").textContent;
  }

});