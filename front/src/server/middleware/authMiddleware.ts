import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function isLoggedMiddleware(req: Request, res: Response, next: () => void){
  const response = await getLogginStatus(req);
  if(response.valid){
    res.redirect('/');
  }
  else{
    next();
  }
}

export async function isNotLoggedMiddleware(req: Request, res: Response, next: () => void){
  if(req.path.includes('login')) return next();
  const response = await getLogginStatus(req);
  if(!response.valid){
    res.redirect('/login');
  }
  else{
    next();
  }
}

async function getLogginStatus(req: Request){
  const headers = {} as any;
  if(req.headers.cookie) headers.cookie = req.headers.cookie as string;

  const response = await fetch('http://localhost:4000/validate', {
    headers
  });
  return await response.json();
}