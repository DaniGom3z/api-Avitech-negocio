import express from 'express'
const vaccinesRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js'
import Vaccines from '../controllers/vaccinesController.js'

vaccinesRouter.post('/',verificarJwt,Vaccines.addVaccine);
vaccinesRouter.delete('/:id',verificarJwt,Vaccines.deleteVaccine);
vaccinesRouter.get('/',verificarJwt,Vaccines.getAllVaccines);


export default vaccinesRouter;