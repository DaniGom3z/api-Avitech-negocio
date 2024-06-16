import express from 'express'
const waterConsumptionRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js'
import Water from '../controllers/waterConsumptionController.js'

waterConsumptionRouter.get('/',verificarJwt,Water.getWaterConsumption);


export default waterConsumptionRouter;