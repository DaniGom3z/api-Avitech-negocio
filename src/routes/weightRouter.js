import express from 'express'
const weightRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js'
import Weight from '../controllers/weightController.js'

weightRouter.post('/',verificarJwt,Weight.addWeight);
weightRouter.delete('/:id',verificarJwt,Weight.deleteWeight);
weightRouter.get('/',verificarJwt,Weight.getAllWeight);


export default weightRouter;