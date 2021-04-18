import {Express, Request, Response} from 'express';
import { Invitation } from '../entities/Invitation';

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

  app.get('/invitation/:key', async (req, res) => {
    const key = req.params.key;
    const invitation = await Invitation.findOne({ where: { key } });
    res.json({ valid: !!(invitation && !invitation.claimed) });
  });
}