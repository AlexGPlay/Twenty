import * as React from "react";
import { useState } from "react";
import Button from "../components/button/twenty/Button";
import InfoImg from "./InfoImg";
import { useLogin } from "../queries/useLogin";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const login = useLogin();

  const handleLogin = async (evt: MouseEvent | React.FormEvent) => {
    evt.preventDefault();
    const response = await login.mutateAsync({ email, password });
    if (response.login.errors) {
      setErrors(response.login.errors.map((error: { field: string, message: string }) => error.field));
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main>
      <div className="info">
        <div className="first-column-container">
          <div className="logo">
            <img src="img/logo.png" alt="Twenty logo" className="logo-img" />
            <img src="img/text.png" alt="Twenty name" className="logo-text" />
          </div>
          <div className="description">
            <div className="title">¿Qué es Twenty?</div>
            <div className="text">
              Twenty es una plataforma social privada, a la que se accede
              únicamente por invitación. Cada día la usan entre millones de
              personas para comunicarse entre ellas y compartir información.
            </div>
          </div>
        </div>
        <div className="second-column-container">
          <div className="first-element">
            <InfoImg
              title="Social"
              description="Conéctate, comparte y comunicate con tus amigos, compañeros de trabajo y familia."
              imgPath="img/social.png"
            />
          </div>
          <div className="second-element">
            <InfoImg
              title="Local"
              description="Descubre servicios locales y participa con las marcas que realmente te importan."
              imgPath="img/location.png"
            />
          </div>
          <div className="third-element">
            <InfoImg
              title="Móvil"
              description="Accede a Twenty desde tu móvil en tiempo real estés donde estés."
              imgPath="img/mobile.png"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form">
          <div className="form-main">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                style={{ 
                  borderColor: errors.find(error => error === "email") ? 'red' : '',
                  outlineColor: errors.find(error => error === "email") ? 'red' : ''
                }}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                style={{ 
                  borderColor: errors.find(error => error === "password") ? 'red' : '' ,
                  outlineColor: errors.find(error => error === "password") ? 'red' : ''
                }}
              />
            </div>
            <div className="form-button-container">
              <Button text="Entrar" onClick={handleLogin} />
            </div>
          </div>

          <hr />
          <div className="form-extra">
            <div className="remember-me">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label htmlFor="remember-me">Recordarme</label>
            </div>
            <div className="forgot-password">
              <a href="#">¿Has olvidado tu contraseña?</a>
            </div>
          </div>
          <div className="new-account">
            <a href="#">¿Quieres una cuenta?</a>
          </div>
        </div>
      </form>
      <div className="footer">
        <div>
          <label>Twenty 2020</label>
          <label>Castellano</label>
          <label>Catalá</label>
          <label>English</label>
          <label>Euskera</label>
          <label>Galego</label>
        </div>
        <div style={{ justifySelf: "end" }}>
          <label>Acerca de</label>
          <label>Empleo</label>
          <label>Anúnciate</label>
          <label>Prensa</label>
          <label>Blog</label>
          <label>Desarrolladores</label>
          <label>Ayuda</label>
          <label>Legal</label>
        </div>
      </div>
    </main>
  );
};

export default Login;
