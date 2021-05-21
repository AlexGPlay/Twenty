import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./form.module.scss";
import { MONTHS, MONTH_DAYS, YEARS } from "../../util/dates";
import { range } from "../../util/array";
import { useRegisterMutation } from "../../queries/useRegisterMutation";
import { FormData, registerSchema } from "./formData";

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

  const registerMutation = useRegisterMutation();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister: SubmitHandler<FormData> = async (data) => {
    const paths = window.location.pathname.split("/");
    const key = paths[paths.length - 1].split("?")[0];

    const fields = {
      ...data,
      key,
      birthday: `${data.birthyear}-${data.birthmonth}-${data.birthday}`,
    };
    const response = await registerMutation.mutateAsync(fields);

    if (!response.register.errors) {
      window.location.href = "/";
      return;
    }

    response.register.errors.forEach((error) =>
      setError(
        error.field as
          | "birthday"
          | "name"
          | "surname"
          | "email"
          | "password"
          | "city"
          | "country"
          | "gender"
          | "terms"
          | "key"
          | "birthmonth"
          | "birthyear",
        { message: error.message }
      )
    );
  };

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>Registro</div>
      <div className={styles.formBody}>
        <label className={styles.formLabel}>
          Tuenti es un lugar donde personas reales comaprten y se comunican
          entre sí. ¡Cuéntanos un poco sobre ti para empezar!
        </label>
        <div>
          <form
            className={styles.formElement}
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className={styles.formPairs}>
              <div className={styles.labelsContainer}>
                <label>Nombre</label>
                {errors.name && <label></label>}
                <label>Apellidos</label>
                {errors.surname && <label></label>}
                <label>Email</label>
                {errors.email && <label></label>}
                <label>Contraseña</label>
                {errors.password && <label></label>}
                <label></label>
                <label>País</label>
                {errors.country && <label></label>}
                <label>Ciudad</label>
                {errors.city && <label></label>}
                <label>Fecha de nacimiento</label>
                {errors.birthday && <label></label>}
                {errors.birthmonth && <label></label>}
                {errors.birthyear && <label></label>}
                <label></label>
                <label>Sexo</label>
                {errors.gender && <label></label>}
              </div>
              <div className={styles.fieldsContainer}>
                <input
                  {...register("name")}
                  id="name"
                  name="name"
                  autoComplete="name"
                />
                {errors.name && <label>{errors.name.message}</label>}
                <input
                  {...register("surname")}
                  id="surname"
                  name="surname"
                  autoComplete="surname"
                />
                {errors.surname && <label>{errors.surname.message}</label>}
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                {errors.email && <label>{errors.email.message}</label>}
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  maxLength={50}
                />
                {errors.password && <label>{errors.password.message}</label>}
                <a href="#">Consejos para elegir una contraseña</a>
                <select
                  {...register("country")}
                  id="country"
                  name="country"
                  autoComplete="country"
                >
                  <option value="spain">España</option>
                  <option value="argentina">Argentina</option>
                </select>
                {errors.country && <label>{errors.country.message}</label>}
                <input
                  {...register("city")}
                  id="city"
                  name="city"
                  autoComplete="city"
                />
                {errors.city && <label>{errors.city.message}</label>}
                <div className={styles.birthdayContainer}>
                  <select
                    {...register("birthday")}
                    name="birthday"
                    autoComplete="birthday"
                  >
                    {range(1, monthDays).map((day) => (
                      <option value={day} key={`day-${day}`}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("birthmonth")}
                    name="birthmonth"
                    autoComplete="birthmonth"
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
                    {...register("birthyear")}
                    name="birthyear"
                    autoComplete="birthyear"
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
                {errors.birthday && <label>{errors.birthday.message}</label>}
                {errors.birthmonth && (
                  <label>{errors.birthmonth.message}</label>
                )}
                {errors.birthyear && <label>{errors.birthyear.message}</label>}
                <label>La edad mínima permitida es 14.</label>
                <div>
                  <input
                    {...register("gender")}
                    name="gender"
                    type="radio"
                    value="male"
                    id="gender-male"
                  />
                  <label htmlFor="gender-male">Hombre</label>
                  <input
                    {...register("gender")}
                    name="gender"
                    type="radio"
                    value="female"
                    id="gender-female"
                    className={styles.marginLeft}
                  />
                  <label htmlFor="gender-female">Mujer</label>
                </div>
                {errors.gender && <label>{errors.gender.message}</label>}
              </div>
            </div>
            <div className={styles.termsContainer}>
              <input {...register("terms")} name="terms" type="checkbox" />
              <div>
                Acepto las Condiciones de uso y la Política de privacidad de
                Twenty y que Twenty envíe comunicaciones incluso por vía
                electrónica.
                <br />
                <br />
                Lee un resumen en el Decálogo de las Condiciones de uso
                {errors.terms && <label>{errors.terms.message}</label>}
              </div>
            </div>
            <div className={styles.centerFlex}>
              <button type="submit">Continuar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
