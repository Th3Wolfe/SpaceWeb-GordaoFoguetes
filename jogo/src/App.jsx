import React, { useEffect } from 'react';
import './styles.css';

function App() {
  useEffect(() => {
    const naveElement = document.getElementById("nave");
    const projeteisContainer = document.getElementById("projeteis");
    const posicaoInicial = naveElement.offsetLeft;
    let positionX = posicaoInicial;
    let projeteis = [];
    let inimigos = [];

    function moveNave(event) {
      const key = event.keyCode;

      if (key === 37) { // Tecla esquerda
        positionX -= 15;
      } else if (key === 39) { // Tecla direita
        positionX += 15;
      }

      naveElement.style.left = positionX + "px";
    }

    function criarProjetil() {
      const projetil = document.createElement("div");
      projetil.classList.add("projetil");
      projeteisContainer.appendChild(projetil);

      const posicaoInicialX = naveElement.offsetLeft;
      const posicaoInicialY = naveElement.offsetTop;

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

        if (projetil.posY < 0) {
          projeteisContainer.removeChild(projetil.element);
          projeteis.splice(i, 1);
          i--;
        }
      }
    }

    document.addEventListener("keydown", moveNave);
    setInterval(moverProjeteis, 50); // Chama a função moverProjeteis a cada 50 milissegundos
    setInterval(criarProjetil, 300); // Cria um novo projetil a cada meio segundo

    function criarInimigo() {
      const inimigo = document.createElement("div");
      inimigo.classList.add("inimigo");
      projeteisContainer.appendChild(inimigo);

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
    

    function moverInimigos() {
      for (let i = 0; i < inimigos.length; i++) {
        const inimigo = inimigos[i];
        inimigo.posY += 2;
        inimigo.element.style.transform = `translateY(${inimigo.posY}px)`;

        if (inimigo.posY > window.innerHeight || colisao(naveElement, inimigo.element)) {
          projeteisContainer.removeChild(inimigo.element);
          inimigos.splice(i, 1);
          i--;
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

    setInterval(moverInimigos, 50); // Chama a função moverInimigos a cada 50 milissegundos
    setInterval(criarInimigo, 500); // Cria um novo inimigo a cada 3 segundos

    function verificarColisao() {
      for (let i = 0; i < projeteis.length; i++) {
        const projetil = projeteis[i];

        for (let j = 0; j < inimigos.length; j++) {
          const inimigo = inimigos[j];

          if (colisao(projetil.element, inimigo.element)) {
            const explosao = document.createElement("div");
            explosao.style.left = inimigo.posX + "px";
            explosao.style.top = inimigo.posY + "px";
            explosao.classList.add("explosao");
            projeteisContainer.appendChild(explosao);

            setTimeout(function () {
              projeteisContainer.removeChild(explosao);
            }, 3000);

            projeteisContainer.removeChild(projetil.element);
            projeteis.splice(i, 1);
            projeteisContainer.removeChild(inimigo.element);
            inimigos.splice(j, 1);

            i--;
            break;
          }
        }
      }
    }

    setInterval(verificarColisao, 50);
  }, []);

  return (
    <>
      <div className="fundo"></div>
      <div id="nave" className="nave"></div>
      <div id="projeteis"></div>
    </>
  );
}

export default App;
