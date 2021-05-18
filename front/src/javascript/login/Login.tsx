import * as React from "react";
import { useState } from "react";
import Button from "../components/button/twenty/Button";
import InfoImg from "./InfoImg";
import { useLogin } from "../queries/useLogin";
import styles from "./login.module.scss";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const login = useLogin();

  const handleLogin = async (evt: MouseEvent | React.FormEvent) => {
    evt.preventDefault();
    const response = await login.mutateAsync({ email, password });
    if (response.login.errors) {
      setErrors(
        response.login.errors.map(
          (error: { field: string; message: string }) => error.field
        )
      );
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main>
      <div className={styles.info}>
        <div className={styles.firstColumnContainer}>
          <div className={styles.logo}>
            <img
              src="img/logo.png"
              alt="Twenty logo"
              className={styles.logoImg}
            />
            <img
              src="img/text.png"
              alt="Twenty name"
              className={styles.logoText}
            />
          </div>
          <div className={styles.description}>
            <div className={styles.title}>¿Qué es Twenty?</div>
            <div className={styles.text}>
              Twenty es una plataforma social privada, a la que se accede
              únicamente por invitación. Cada día la usan entre millones de
              personas para comunicarse entre ellas y compartir información.
            </div>
          </div>
        </div>
        <div className={styles.secondColumnContainer}>
          <div className={styles.firstElement}>
            <InfoImg
              title="Social"
              description="Conéctate, comparte y comunicate con tus amigos, compañeros de trabajo y familia."
              imgPath="img/social.png"
            />
          </div>
          <div className={styles.secondElement}>
            <InfoImg
              title="Local"
              description="Descubre servicios locales y participa con las marcas que realmente te importan."
              imgPath="img/location.png"
            />
          </div>
          <div className={styles.thirdElement}>
            <InfoImg
              title="Móvil"
              description="Accede a Twenty desde tu móvil en tiempo real estés donde estés."
              imgPath="img/mobile.png"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleLogin}>
        <div className={styles.form}>
          <div className={styles.formMain}>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                style={{
                  borderColor: errors.find((error) => error === "email")
                    ? "red"
                    : "",
                  outlineColor: errors.find((error) => error === "email")
                    ? "red"
                    : "",
                }}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                style={{
                  borderColor: errors.find((error) => error === "password")
                    ? "red"
                    : "",
                  outlineColor: errors.find((error) => error === "password")
                    ? "red"
                    : "",
                }}
              />
            </div>
            <div className={styles.formButtonContainer}>
              <Button text="Entrar" onClick={handleLogin} />
            </div>
          </div>

          <hr />
          <div className={styles.formExtra}>
            <div className={styles.rememberMe}>
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label htmlFor="remember-me">Recordarme</label>
            </div>
            <div className={styles.forgotPassword}>
              <a href="#">¿Has olvidado tu contraseña?</a>
            </div>
          </div>
          <div className={styles.newAccount}>
            <a href="#">¿Quieres una cuenta?</a>
          </div>
        </div>
      </form>
      <div className={styles.footer}>
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
