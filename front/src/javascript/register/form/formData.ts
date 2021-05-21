import * as Yup from 'yup';
import { RegisterParams } from "../../queries/registerMutation";

export type FormData = Omit<RegisterParams, 'birthday'> 
                        & { birthyear: string; birthmonth: string; birthday: string }


export const registerSchema = Yup.object().shape({
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
  gender: Yup.string().nullable().required("Selecciona un género"),
  terms: Yup.bool().isTrue("Debes aceptar los términos"),
});