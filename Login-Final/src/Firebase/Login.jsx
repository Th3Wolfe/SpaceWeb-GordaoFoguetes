import './Login.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import { useState } from 'react';

function Login() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("success to subscribe");
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  const singIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const parametro = 'exemplo'; // Substitua 'exemplo' pelo valor que deseja passar como parâmetro
        const url = `https://vinialvarenga-ctrl.github.io/SpaceWeb-Final-Final/?parametro=${encodeURIComponent(user.email)}`;
        window.location.href = url; 
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode + '\n Verifique suas credenciais');
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        className="login-input"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="password-input"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={singIn} className="login-button">
        Entrar
      </button>
      <button onClick={singUp} className="register-button">
        Cadastrar
      </button>
    </div>
  );
}

export default Login;
