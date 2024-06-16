import express from 'express'
const foodRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js'
import Food from '../controllers/foodController.js'

foodRouter.post('/',verificarJwt,Food.addFood);
foodRouter.put('/:id',verificarJwt,Food.updateFood);
foodRouter.delete('/:id',verificarJwt,Food.deleteFood);
foodRouter.get('/',verificarJwt,Food.getAllFood);
foodRouter.get('/:id',verificarJwt,Food.getById);


export default foodRouter;