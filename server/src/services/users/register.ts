import { Friendship } from './../../entities/Friendship';
import { User } from "../../entities/User";
import argon2 from "argon2";
import { RegisterFields, UserResponse } from "../../resolvers/user";
import { Request } from 'express';
import { Invitation } from "../../entities/Invitation";
import * as Yup from "yup";
import { startTransaction } from '../../util/db';

interface UserFields{
  name: string;
  surname: string;
  email: string;
  password: string;
  birthday: Date;
  city: string;
  country: string;
  gender: string;
}

export async function register(fields: RegisterFields, req: Request): Promise<UserResponse>{
  const invitation = await Invitation.findOne({ where: { key: fields.key } });
  console.log("Invitation", invitation);
  if(!invitation || invitation.claimed){
    return { errors: [{ field: 'all', message: 'Invitación invalida' }] }
  }

  console.log("Fields", fields);

  if(!fields.terms){
    return { errors: [{ field: 'terms', message: 'Debes aceptar los términos y condiciones' }] }
  }

  const emailUser = await User.findOne({ where: { email: fields.email } });
  console.log("Email user", emailUser);

  if(emailUser){
    return { errors: [{ field: 'email', message: 'El email está en uso' }] }
  }

  const userFields = buildUserFields(fields);
  const errors = await validateFields(userFields);

  if(errors.length > 0) return { errors };

  const userYears = new Date(new Date().getTime() - userFields.birthday.getTime()).getFullYear() - 1970;
  if(userYears < 14) return { errors: [{ field: 'birthday', message: 'Debes ser mayor de 14 años' }] };

  userFields.password = await argon2.hash(userFields.password);

  try{
    return await startTransaction(async (em) => {
      const user = await em.create(User, userFields);
      await em.save(user);

      await em.insert(Friendship, { friend1Id: invitation.fromUserId, friend2Id: user.id });
      await em.insert(Friendship, { friend2Id: invitation.fromUserId, friend1Id: user.id });
      
      invitation.claimed = true;
      await em.save(invitation);

      req.session.userId = user.id;
      
      return { 
        user
      }
    });
  }
  catch(e){
    console.error(e);
    return { errors: [{ field: 'all', message: 'Ha ocurrido un error' }] };
  }

}

function buildUserFields({ name, surname, email, password, birthday, city, country, gender }: RegisterFields): UserFields{
  return {
    name,
    surname,
    email,
    password,
    birthday: new Date(birthday),
    city,
    country,
    gender
  }
}

async function validateFields(fields: UserFields){
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    birthday: Yup.date().required(),
    city: Yup.string().required(),
    country: Yup.string().required(),
    gender: Yup.string().required()
  });

  try{
    await schema.validate(fields);
    return [];
  }
  catch(e){
    if(!(e instanceof Yup.ValidationError)){
      return [{ field: 'all', message: 'Se ha producido un error' }];
    }
    const errors: { field: string, message: string }[] = [];
    const fields = Object.keys(schema.fields);

    e.errors.forEach(e => {
      let field = 'all';
      for(let tField of fields){
        if(e.includes(tField)){
          field = tField;
          break;
        }
      }
      errors.push({ field, message: 'El campo es obligatorio' });
    });
    return errors;
  }
}