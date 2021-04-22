import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./form.module.css";
import { MONTHS, MONTH_DAYS, YEARS } from "../../util/dates";
import { range } from "../../util/array";
import { useRegisterMutation } from "../../queries/useRegisterMutation";

interface RegisterFields {
  name: string;
  surname: string;
  email: string;
  password: string;
  country: string;
  city: string;
  birthday: string;
  birthmonth: string;
  birthyear: string;
  gender: string;
  terms: boolean;
}

const RegisterForm: React.FC<{}> = () => {
  const [selectedDate, setSelectedDate] = useState({
    month: 1,
    year: 2000,
  });

  const [monthDays, setMonthDays] = useState(31);

  useEffect(
    () => setMonthDays(MONTH_DAYS(selectedDate.month, selectedDate.year)),
    [selectedDate]
  );

  const register = useRegisterMutation();

  const handleSubmit = async (values: RegisterFields, { setErrors  }: { setErrors: (errors: Record<string,string>) => void }) => {
    const paths = window.location.pathname.split("/");
    const key = paths[paths.length - 1].split("?")[0];

    const fields = {
      ...values,
      key,
      birthday: `${values.birthyear}-${values.birthmonth}-${values.birthday}`,
    };
    const response = await register.mutateAsync(fields);
    
    if(!response.register.errors){
      window.location.href = "/";
      return;
    }

    const errors: Record<string,string> = {};
    (response.register.errors as {field: string, message: string}[]).forEach(error => {
      if(error.field in errors) return;
      errors[error.field] = error.message;
    });

    setErrors(errors);
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Tu nombre es demasiado corto")
      .max(50, "Tu nombre es demasiado largo")
      .required("Introduce tu nombre"),
    surname: Yup.string()
      .min(2, "Tu apellido es demasiado corto")
      .max(50, "Tu apellido es demasiado largo")
      .required("Introduce tu apellido"),
    email: Yup.string()
      .email("Introduce un email válido")
      .required("Introduce un email"),
    password: Yup.string()
      .min(5, "Tu contraseña es demasiado corta")
      .max(50, "La contraseña solo puede tener 50 carácteres")
      .required("Introduce una contraseña"),
    country: Yup.string().required("Selecciona un país"),
    city: Yup.string().required("Selecciona una ciudad"),
    birthday: Yup.number().required("Introduce un día"),
    birthmonth: Yup.number().required("Introduce un mes"),
    birthyear: Yup.number().required("Introduce un año"),
    gender: Yup.string().required("Selecciona un género"),
    terms: Yup.bool().isTrue("Debes aceptar los términos"),
  });

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
              country: "spain",
              city: "",
              birthday: "1",
              birthmonth: "1",
              birthyear: "2000",
              gender: "",
              terms: false,
            }}
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form className={styles.formElement}>
              <div className={styles.formPairs}>
                <div className={styles.labelsContainer}>
                  <label>Nombre</label>
                  <ErrorMessage name="name">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label>Apellidos</label>
                  <ErrorMessage name="surname">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label>Email</label>
                  <ErrorMessage name="email">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label>Contraseña</label>
                  <ErrorMessage name="password">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label></label>
                  <label>País</label>
                  <ErrorMessage name="country">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label>Ciudad</label>
                  <ErrorMessage name="city">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label>Fecha de nacimiento</label>
                  <ErrorMessage name="birthday">
                    {() => <label></label>}
                  </ErrorMessage>
                  <ErrorMessage name="birthmonth">
                    {() => <label></label>}
                  </ErrorMessage>
                  <ErrorMessage name="birthyear">
                    {() => <label></label>}
                  </ErrorMessage>
                  <label></label>
                  <label>Sexo</label>
                  <ErrorMessage name="gender">
                    {() => <label></label>}
                  </ErrorMessage>
                </div>
                <div className={styles.fieldsContainer}>
                  <Field id="name" name="name" />
                  <ErrorMessage name="name">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <Field id="surname" name="surname" />
                  <ErrorMessage name="surname">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    maxLength={50}
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <a href="#">Consejos para elegir una contraseña</a>
                  <Field as="select" id="country" name="country">
                    <option value="spain">España</option>
                    <option value="argentina">Argentina</option>
                  </Field>
                  <ErrorMessage name="country">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <Field id="city" name="city" />
                  <ErrorMessage name="city">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <div className={styles.birthdayContainer}>
                    <select name="birthday">
                      {range(1, monthDays).map((day) => (
                        <option value={day} key={`day-${day}`}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthmonth"
                      onChange={(evt) =>
                        setSelectedDate({
                          ...selectedDate,
                          month: parseInt(evt.target.value),
                        })
                      }
                    >
                      {MONTHS.map((month, idx) => (
                        <option
                          value={idx + 1}
                          key={`month-${idx + 1}`}
                          selected={selectedDate.month === idx + 1}
                        >
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthyear"
                      onChange={(evt) =>
                        setSelectedDate({
                          ...selectedDate,
                          year: parseInt(evt.target.value),
                        })
                      }
                    >
                      {YEARS.map((year) => (
                        <option
                          value={year}
                          key={`year-${year}`}
                          selected={selectedDate.year === year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ErrorMessage name="birthday">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <ErrorMessage name="birthmonth">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <ErrorMessage name="birthyear">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                  <label>La edad mínima permitida es 14.</label>
                  <div>
                    <Field
                      name="gender"
                      type="radio"
                      value="male"
                      id="gender-male"
                    />
                    <label htmlFor="gender-male">Hombre</label>
                    <Field
                      name="gender"
                      type="radio"
                      value="female"
                      id="gender-female"
                      className={styles.marginLeft}
                    />
                    <label htmlFor="gender-female">Mujer</label>
                  </div>
                  <ErrorMessage name="gender">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className={styles.termsContainer}>
                <Field name="terms" type="checkbox" />
                <div>
                  Acepto las Condiciones de uso y la Política de privacidad de
                  Twenty y que Twenty envíe comunicaciones incluso por vía
                  electrónica.
                  <br />
                  <br />
                  Lee un resumen en el Decálogo de las Condiciones de uso
                  <ErrorMessage name="terms">
                    {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className={styles.centerFlex}>
                <button type="submit">Continuar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
