document.addEventListener("DOMContentLoaded", function(){
  var nave = document.getElementById("nave");
  const projeteisContainer = document.getElementById("projeteis"); //lista de projeteis
  const inimigosContainer = document.getElementById("projeteis"); //lista de inimigos
  const posicaoInicial = nave.offsetLeft; // a função offsetLeft retorna a medida em px do Left, ou seja, a distância do canto superior esquerdo até o objeto
  let projeteisInterval;
  let inimigosInterval;
  let positionX = posicaoInicial; // posição variavel usada na movimentação da nave, deve ser iniciada com a posição da nave
  let projeteis = []; // apenas uma listagem automática dos projeteis, para uso em for, funções, comparações etc. Tive que criar isso pra facilitar a movimentação
  let inimigos = []; // apenas uma listagem automática dos inimigos, para uso em for, funções, comparações etc. Tive que criar isso pra facilitar a movimentação
  let lvl = 1; 
  var game = true;
  document.addEventListener("keydown", moveNave); //verifica se uma tecla foi pressionada e chama a função pra mover a nave

  // o loop onde algumas funções do jogo ocorrem, feito para unificar o framerate desses objetos
  function loop(){
    if(game === false){
      return;
    }
    nave.style.top = 600 + 'px';
    requestAnimationFrame(loop);

    moverProjeteis();
    moverInimigos();
    verificarColisao();
  }

  // Funções principais do jogo

  projeteisInterval = setInterval(criarProjetilLVL1, 350); // cria um projetil a cada x milisegundos
  inimigosInterval = setInterval(criarInimigo, 300); // cria um inimigo a cada x milisegundos
  setInterval(function() {reproduzirSom('trilha.mp3')}, 15000); // reprodução da trilha sonora, (BUG - por enquanto a música ainda demora 15seg para começar)
  loop();

  // Função que move a nave com pressionar das teclas definidas
  function moveNave(event){
    const key = event.keyCode;

    if(key === 37 || key == 65){ // Tecla esquerda
      positionX -= 40;
    }
    else if(key === 39 || key == 68){ // Tecla direita
      positionX += 40;
    }
    nave.style.left = positionX + "px"; // Altera o left da nave, criando o movimento horizontal
  }

  // Função que cria os projeteis da nave
  function criarProjetilLVL1(){
    // verificação do lvl, a cada lvl mais projeteis são criados
    if(lvl === 2){
      criarProjetilLVL2();
    }
    if(lvl === 3){
      criarProjetilLVL2();
      criarProjetilLVL3();
    }
    const projetil = document.createElement("div"); // cria uma div
    projetil.classList.add("projetil"); // define a div para a classe projetil
    projeteisContainer.appendChild(projetil); // adiciona o objeto ao container

    const posicaoInicialX = nave.offsetLeft; // pega o valor de left atual da nave para usar de referência ao projetil
    const posicaoInicialY = nave.offsetTop; // pega o valor de top atual da nave para usar de referência ao projetil

    projetil.style.left = posicaoInicialX - 3 + "px"; // define o left do projetil, o valor númerico somado ou subtraído são ajustes posicionais
    projetil.style.top = posicaoInicialY - 3 + "px"; // define o top do projetil, o valor númerico somado ou subtraído são ajustes posicionais

    projeteis.push({
      element: projetil,
      posX: posicaoInicialX,
      posY: posicaoInicialY
    });

  }

  // Função usada na LVL1, apenas cria mais um projetil
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

  // Função usada na LVL1, apenas cria mais um projetil
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

  // Função que move os projeteis pela tela
  function moverProjeteis(){
    for (let i = 0; i < projeteis.length; i++){
      const projetil = projeteis[i];
      projetil.posY -= 40; // a variável posY será usada em uma string para definir o valor de top do objeto
      projetil.element.style.top = projetil.posY + "px"; // no caso está diminuindo, o que cria o movimento horizontal na direção cima-baixo

      // verificar se o projetil chegou ao limite da tela, (EPA - pode estar obsoleta por outras funções)
      if (projetil.posY < 0){
        projeteisContainer.removeChild(projetil.element);
        projeteis.splice(i, 1);
        i--;
      }
    }
  }

  // Função que cria um inimigo na tela
  function criarInimigo(){
    const inimigo = document.createElement("div"); // cria uma div
    inimigo.classList.add("inimigo"); // define a div para a classe inimigo, classe filha de projeteis, feito dessa forma pra lógica de movimentação ser a mesma
    inimigosContainer.appendChild(inimigo); // adiciona o objeto ao container

    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

    var pontosElement = document.getElementById("valorPontos");
    var pontos = parseInt(pontosElement.innerText);

    // A sequência de if's está relacionada com a variabilidade de inimigos, usando os valores da pontuação para definir o grau de variabilidade
    if(numeroAleatorio === 2 && pontos > 900){
      inimigo.style.backgroundImage = 'url(inimigo2.png)'; //altera o arquivo na div com a imagem do inimigo
      inimigo.style.backgroundSize = 'cover'; // cada imagem nescessita de um ajuste personalizado
      inimigo.style.width = 80 + 'px'; // cada imagem nescessita de um ajuste personalizado
    }
    if(numeroAleatorio === 3 && pontos > 2900){
      inimigo.style.backgroundImage = 'url(inimigo3.png)';
      inimigo.style.backgroundSize = 'cover';
      inimigo.style.width = 60 + 'px';
    }
    if(numeroAleatorio === 4 && pontos > 5900){
      inimigo.style.backgroundImage = 'url(inimigo4.png)';
      inimigo.style.height = 60 + 'px';
    }
  
    const limiteEsquerdo = 30; // define o limite esquerdo para o range de spawn do inimigo
    const limiteDireito = window.innerWidth - 130; // define o limite direito para o range de spawn do inimigo
    const posicaoInicialX = Math.random() * (limiteDireito - limiteEsquerdo) + limiteEsquerdo; // gera um valor aleatório dentro do range definido
    const posicaoInicialY = 0;
  
    // cria o inimigo na posição gerada
    inimigo.style.left = posicaoInicialX + "px";
    inimigo.style.top = posicaoInicialY + "px";
  
    inimigos.push({
      element: inimigo,
      posX: posicaoInicialX,
      posY: posicaoInicialY
    });
  }
  
  // Função para mover inimigos na tela
  function moverInimigos(){
    for (let i = 0; i < inimigos.length; i++){
      const inimigo = inimigos[i];
      inimigo.posY += 2;
      inimigo.element.style.transform = `translateY(${inimigo.posY}px)`; // cria um movimento contínuo, definido pelos keyframes
  
      // Verifica se o inimigo chegou ao limite da tela e o remove
      if(inimigo.posY > window.max-innerHeight || inimigo.posY > nave.offsetTop){
        inimigosContainer.removeChild(inimigo.element);
        inimigos.splice(i, 1);
        i--;
      }

      // Verifica se o inimigo colidiu com a nave e o remove
      if(colisao(nave, inimigo.element)){
        inimigosContainer.removeChild(inimigo.element);
        inimigos.splice(i, 1);
        i--;
        diminuirVida();
      }
    }
  }
  
  // Função para verificar colisão de elementos 
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

  // Função quer verifica colisões entre projeteis e inimigos
  function verificarColisao(){
    for (let i = 0; i < projeteis.length; i++){
      const projetil = projeteis[i];
  
      for (let j = 0; j < inimigos.length; j++){
        const inimigo = inimigos[j];
        if (colisao(projetil.element, inimigo.element)){
          const explosao = document.createElement("div"); // se houve uma colisão, cria uma div
          explosao.classList.add("explosao"); // define a classe como explosao
          explosao.style.left = inimigo.posX + "px"; // define a posição da explosão como a do inimigo que vai sumir
          explosao.style.top = inimigo.posY + "px"; // define a posição da explosão como a do inimigo que vai sumir
          projeteisContainer.appendChild(explosao); // adiciona o objeto ao container
  
          // define para que a explosão seja removida em x milisegundos
          setTimeout(function(){
            projeteisContainer.removeChild(explosao);
          },3000);
  

          projeteisContainer.removeChild(projetil.element); // remove o projetil
          projeteis.splice(i, 1);
          inimigosContainer.removeChild(inimigo.element); // remove o inimigo
          inimigos.splice(j, 1);

          reproduzirSom('arcade.wav');
          aumentarPontos();
          i--;
          break;
        }
      }
    }
  }

  // Função que aumenta o score
  function aumentarPontos(){
    var pontosElement = document.getElementById("valorPontos");
    var pontos = parseInt(pontosElement.innerText);
    //verifica os pontos e caso uma margem seja superada, faz o LVL up
    if(pontos > 1900 && pontos < 2900){
      lvl = 2;
    } // verifica se o score está na margem de LVL 2
    if(pontos > 4900){
      lvl = 3;
    } // verifica se o score está na margem de LVL 3
    pontos += 100;
    pontosElement.innerText = pontos;
  }

  // Função que reproduz os sons do jogo
  function reproduzirSom(stringsom){
    // recebe uma string com o caminho do arquivo a ser reproduzido, ex: 'trilha.wav' para um arquivo que está na mesma pasta
    var som = new Audio(stringsom); // cria uma variável e a carrega com o arquivo selecionado
    som.play(); // reproduz o arquivo
  }

  // Função que diminui o valor da vida, usada na verificação de colisão entre a nave e inimigos
  function diminuirVida(){
    var pontosElement = document.getElementById("valorVida");
    var pontos = parseInt(pontosElement.innerText);
    // verificação de gameover
    if(pontos === 1){
      gameover();
    }
    pontos -= 1;
    pontosElement.innerText = pontos;
  }

  // Função que finaliza o jogo e mostra o score
  function gameover(){

    const gameContainer = document.getElementById("fundo"); // o jogo acontece na div fundo
    gameContainer.style.display = "none"; // esconde a div fundo

    const gameOverScreen = document.getElementById("gameover"); // seleciona a div gameover
    const gameOverPontos = document.getElementById("gameover-pontos"); // seleciona o span gameover-pontos
    gameOverScreen.style.display = "block";
    gameOverPontos.textContent = document.getElementById("valorPontos").textContent; // exibe o valor de pontos na tela GameOver
    clearInterval(inimigosInterval); // para os intervalos desnescessários
    clearInterval(projeteisInterval); // para os intervalos desnescessários
    reproduzirSom('aplauso.wav');
  }

});