import express from 'express'
const foodConsumptionRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js'
import Food from '../controllers/foodConsumptionController.js'

foodConsumptionRouter.get('/',verificarJwt,Food.getFoodConsumption);


export default foodConsumptionRouter;