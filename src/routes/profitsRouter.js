import express from 'express'
const profitsRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js'
import Profits from '../controllers/profitsController.js'

profitsRouter.get('/:id_alimento',verificarJwt,Profits.showWeightGains);


export default profitsRouter;