import * as React from "react";
import Button from "../components/button/twenty/Button";
import Input from "../components/input/Input";
import InfoImg from "./InfoImg";
import { useLogin } from "../queries/useLogin";
import styles from "./login.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginParams } from "../queries/loginData";

const Login: React.FC<{}> = () => {
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm<LoginParams>();

  const login = useLogin();

  const handleLogin: SubmitHandler<LoginParams> = async ({
    email,
    password,
  }) => {
    const response = await login.mutateAsync({ email, password });
    if (response.login.errors) {
      response.login.errors.forEach((error) =>
        setError(error.field as "email" | "password", {
          message: error.message,
        })
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.form}>
          <div className={styles.formMain}>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <Input
                {...register("email", { required: true })}
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                error={!!errors.email}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Contraseña</label>
              <Input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
              />
            </div>
            <div className={styles.formButtonContainer}>
              <Button text="Entrar" type="submit" loading={login.isLoading} />
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
