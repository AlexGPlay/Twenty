import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { BACKEND_SERVER } from '../constants';

export async function isLoggedMiddleware(req: Request, res: Response, next: () => void){
  const response = await getLogginStatus(req);
  console.log('Is logged', response);
  if(response.valid){
    res.redirect('/');
  }
  else{
    next();
  }
}

export async function isNotLoggedMiddleware(req: Request, res: Response, next: () => void){
  if(req.path.includes('login') || req.path.includes('register')) return next();
  const response = await getLogginStatus(req);
  console.log('Is not logged', response);
  if(!response.valid){
    res.redirect('/login');
  }
  else{
    next();
  }
}

async function getLogginStatus(req: Request){
  try{
    const headers = {} as any;
    if(req.headers.cookie) headers.cookie = req.headers.cookie as string;

    const response = await fetch(`${BACKEND_SERVER}/validate`, {
      headers
    });
    return await response.json();
  }
  catch(e){
    return {
      valid: false
    }
  }
}