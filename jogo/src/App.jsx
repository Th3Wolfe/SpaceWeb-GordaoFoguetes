import React, { useEffect, useState } from 'react';
import './styles.css';

// Importar o arquivo de áudio
import trilhaAudio from './Arquivos/Audios/trilha.mp3'
import somExplosao from './Arquivos/Audios/arcade.wav';

const NaveEspacial = () => {
  const [positionX, setPositionX] = useState(0);
  const [projeteis, setProjeteis] = useState([]);
  const [inimigos, setInimigos] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [vidas, setVidas] = useState(5);

  // Adicione um estado para controlar a reprodução do áudio
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    function moveNave(event) {
      const key = event.keyCode;

      if (key === 37 || key === 65) {
        // Tecla esquerda ou 'A'
        setPositionX((prevX) => prevX - 15);

        // Inicie a reprodução do áudio
        if (!audioPlaying) {
          setAudioPlaying(true);
          const audio = new Audio(trilhaAudio);
          audio.loop = true;
          audio.play();
        }
      } else if (key === 39 || key === 68) {
        // Tecla direita ou 'D'
        setPositionX((prevX) => prevX + 15);

        // Inicie a reprodução do áudio
        if (!audioPlaying) {
          setAudioPlaying(true);
          const audio = new Audio(trilhaAudio);
          audio.loop = true;
          audio.play();
        }
      }
    }

    document.addEventListener('keydown', moveNave);

    return () => {
      document.removeEventListener('keydown', moveNave);
    };
  }, [audioPlaying]);

  useEffect(() => {
    function criarProjetil() {
      const novoProjeteil = {
        id: Date.now(),
        posX: positionX,
        posY: 350
      };
      setProjeteis((prevProjeteis) => [...prevProjeteis, novoProjeteil]);
    }

    const criarProjeteisInterval = setInterval(criarProjetil, 80);

    return () => {
      clearInterval(criarProjeteisInterval);
    };
  }, [positionX]);

  useEffect(() => {
    function moverProjeteis() {
      setProjeteis((prevProjeteis) =>
        prevProjeteis.map((projetil) => ({
          ...projetil,
          posY: projetil.posY - 5
        }))
      );
    }

    const projeteisInterval = setInterval(moverProjeteis, 10);

    return () => {
      clearInterval(projeteisInterval);
    };
  }, [projeteis]);

  useEffect(() => {
    function criarInimigo() {
      const novoInimigo = {
        id: Date.now(),
        posX: Math.random() * window.innerWidth,
        posY: 0
      };
      setInimigos((prevInimigos) => [...prevInimigos, novoInimigo]);
    }

    const criarInimigosInterval = setInterval(criarInimigo, 1000);

    return () => {
      clearInterval(criarInimigosInterval);
    };
  }, []);

  useEffect(() => {
    function moverInimigos() {
      setInimigos((prevInimigos) =>
        prevInimigos.map((inimigo) => ({
          ...inimigo,
          posY: inimigo.posY + 2
        }))
      );
    }

    const inimigosInterval = setInterval(moverInimigos, 10);

    return () => {
      clearInterval(inimigosInterval);
    };
  }, [inimigos]);

  useEffect(() => {
    function limitarMovimentoNave() {
      const larguraTela = window.innerWidth;
      const limiteEsquerda = 0;
      const limiteDireita = larguraTela - 80; //  tamanho da nave 80 pixels

      if (positionX < limiteEsquerda) {
        setPositionX(limiteEsquerda);
      } else if (positionX > limiteDireita) {
        setPositionX(limiteDireita);
      }
    }

    limitarMovimentoNave();
  }, [positionX]);

  useEffect(() => {
    function detectarColisao() {
      projeteis.forEach((projetil) => {
        inimigos.forEach((inimigo) => {
          if (
            projetil.posX < inimigo.posX + 80 &&
            projetil.posX + 10 > inimigo.posX &&
            projetil.posY < inimigo.posY + 80 &&
            projetil.posY + 60 > inimigo.posY
          ) {
            setPontos((prevPontos) => prevPontos + 100);
            setExplosions((prevExplosions) => [...prevExplosions, inimigo]);
            setProjeteis((prevProjeteis) =>
              prevProjeteis.filter((p) => p.id !== projetil.id)
            );
            setInimigos((prevInimigos) =>
              prevInimigos.filter((i) => i.id !== inimigo.id)
            );
  
            // Crie uma nova instância do elemento Audio para reproduzir o som da explosão
            const som = new Audio(somExplosao);
            som.play();
          }
        });
      });
    }
  
    detectarColisao();
  }, [projeteis, inimigos]);

  useEffect(() => {
    function removerExplosao() {
      setExplosions((prevExplosions) =>
        prevExplosions.filter((explosao) => explosao.id !== explosions[0].id)
      );
    }

    if (explosions.length > 0) {
      const explosaoTimeout = setTimeout(removerExplosao, 3000);
      return () => clearTimeout(explosaoTimeout);
    }
  }, [explosions]);

  return (
    <div>
      {gameOver ? (
        <div className="game-over">Game Over</div>
      ) : (
        <div id="fundo">
          <div id="nave" style={{ left: `${positionX}px` }}></div>
          <div id="projeteis">
            {projeteis.map((projetil) => (
              <div
                key={projetil.id}
                className="projetil"
                style={{
                  left: `${projetil.posX}px`,
                  top: `${projetil.posY}px`
                }}
              ></div>
            ))}
          </div>
          <div id="pontos">
            <p>
              Score: <span id="valorPontos">{pontos}</span>
            </p>
            <p>
              Vidas: <span id="valorVida">{vidas}</span>
            </p>
          </div>
          <div id="inimigos">
            {inimigos.map((inimigo) => (
              <div
                key={inimigo.id}
                className="inimigo"
                style={{
                  left: `${inimigo.posX}px`,
                  top: `${inimigo.posY}px`
                }}
              ></div>
            ))}
          </div>
          <div id="explosions">
            {explosions.map((explosao) => (
              <div
                key={explosao.id}
                className="explosao"
                style={{
                  left: `${explosao.posX}px`,
                  top: `${explosao.posY}px`
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NaveEspacial;
