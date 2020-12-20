import {Express, Request, Response} from 'express';

export function useValidationController(app: Express){
  app.get('/validate', (req: Request, res: Response) => {
    try{
      const logged = !!req.session.userId;
      res.json({ valid: logged });
    }
    catch(e){
      console.log(e);
      res.json({valid: false});
    }
  });
}