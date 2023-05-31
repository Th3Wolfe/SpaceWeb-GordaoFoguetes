document.addEventListener("DOMContentLoaded", function() {
    const nave = document.getElementById("nave");
    const projeteisContainer = document.getElementById("projeteis");
    const inimigosContainer = document.getElementById("projeteis");
    const posicaoInicial = nave.offsetLeft;
    let positionX = posicaoInicial;
    let projeteis = [];
    let inimigos = [];
  
    function moveNave(event){
      const key = event.keyCode;
  
      if (key === 37 || key == 65) { // Tecla esquerda
        positionX -= 15;
      } else if (key === 39 || key == 68) { // Tecla direita
        positionX += 15;
      }
  
      nave.style.left = positionX + "px";
    }

    function criarProjetil() {
      const projetil = document.createElement("div");
      projetil.classList.add("projetil");
      projeteisContainer.appendChild(projetil);
  
      const posicaoInicialX = nave.offsetLeft;
      const posicaoInicialY = nave.offsetTop;
  
      projetil.style.left = posicaoInicialX + "px";
      projetil.style.top = posicaoInicialY + "px";
  
      projeteis.push({
        element: projetil,
        posX: posicaoInicialX,
        posY: posicaoInicialY
      });
  
    }
  
    function moverProjeteis() {
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
  
    document.addEventListener("keydown", moveNave);
    setInterval(moverProjeteis, 30); // Chama a função moverProjeteis a cada 50 milissegundos
    setInterval(criarProjetil, 200); // Cria um novo projetil a cada meio segundo

    function criarInimigo() {
      const inimigo = document.createElement("div");
      inimigo.classList.add("inimigo");
      inimigosContainer.appendChild(inimigo);

      const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
      if(numeroAleatorio === 2){
        inimigo.style.backgroundImage = 'url(inimigo2.png)';
      }
      if(numeroAleatorio === 3){
        inimigo.style.backgroundImage = 'url(inimigo3.png)';
      }
      if(numeroAleatorio === 4){
        inimigo.style.backgroundImage = 'url(inimigo4.png)';
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
    
    function moverInimigos() {
      for (let i = 0; i < inimigos.length; i++) {
        const inimigo = inimigos[i];
        inimigo.posY += 2;
        inimigo.element.style.transform = `translateY(${inimigo.posY}px)`;
    
        if (inimigo.posY > window.max-innerHeight || colisao(nave, inimigo.element)) {
          inimigosContainer.removeChild(inimigo.element);
          inimigos.splice(i, 1);
          i--;
          diminuirVida();
        }
      }
    }
    
    function colisao(element1, element2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
    
      return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
      );
    }
    
    setInterval(moverInimigos, 10); // Chama a função moverInimigos a cada 50 milissegundos
    setInterval(criarInimigo, 150); // Cria um novo inimigo a cada 3 segundos

    function verificarColisao() {
      for (let i = 0; i < projeteis.length; i++) {
        const projetil = projeteis[i];
    
        for (let j = 0; j < inimigos.length; j++) {
          const inimigo = inimigos[j];
    
          if (colisao(projetil.element, inimigo.element)) {
            const explosao = document.createElement("div");
            explosao.classList.add("explosao");
            explosao.style.left = inimigo.posX + "px";
            explosao.style.top = inimigo.posY + "px";
            projeteisContainer.appendChild(explosao);
    
            setTimeout(function () {
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
    
    setInterval(verificarColisao, 50); // verifica se houve uma colisão entre um projetil e um inimigo a cada 50 milisegundos

    function aumentarPontos() {
      var pontosElement = document.getElementById("valorPontos");
      var pontos = parseInt(pontosElement.innerText);
      pontos += 100;
      pontosElement.innerText = pontos;
    }

    function diminuirVida() {
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