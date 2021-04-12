import React from "react";
import { Formik, Form, Field } from "formik";

import styles from "./form.module.css";

const RegisterForm: React.FC<{}> = () => {
  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>Registro</div>
      <div className={styles.formBody}>
        <label className={styles.formLabel}>
          Tuenti es un lugar donde personas reales comaprten y se comunican
          entre sí. ¡Cuéntanos un poco sobre ti para empezar!
        </label>
        <div>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              country: "",
              city: "",
              birthday: "",
              birthmonth: "",
              birthyear: "",
              gender: "",
              terms: false,
            }}
            onSubmit={(values) => console.log(values)}
          >
            <Form className={styles.formElement}>
              <div className={styles.formPairs}>
                <div className={styles.labelsContainer}>
                  <label>Nombre</label>
                  <label>Apellidos</label>
                  <label>Email</label>
                  <label>Contraseña</label>
                  <label></label>
                  <label>País</label>
                  <label>Ciudad</label>
                  <label>Fecha de nacimiento</label>
                  <label></label>
                  <label>Sexo</label>
                </div>
                <div className={styles.fieldsContainer}>
                  <Field id="name" name="name" />
                  <Field id="surname" name="surname" />
                  <Field id="email" name="email" type="email" />
                  <Field id="password" name="password" type="password" />
                  <a href="#">Consejos para elegir una contraseña</a>
                  <select id="country" name="country">
                    <option value="spain">España</option>
                    <option value="argentina">Argentina</option>
                  </select>
                  <Field id="city" name="city" />
                  <div>
                    <select name="birthday"></select>
                    <select name="birthmonth"></select>
                    <select name="birthyear"></select>
                  </div>
                  <label>La edad mínima permitida es 14.</label>
                  <div>
                    <Field name="gender" type="radio" value="male" /> Hombre
                    <Field name="gender" type="radio" value="female" /> Mujer
                  </div>
                </div>
              </div>
              <Field name="terms" type="checkbox" /> Acepto las Condiciones de
              uso y la Política de privacidad de Twenty y que Twenty envíe
              comunicaciones incluso por vía electrónica.
              <button type="submit">Continuar</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
