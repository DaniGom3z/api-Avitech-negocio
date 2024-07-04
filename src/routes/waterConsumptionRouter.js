import express from 'express';
const waterConsumptionRouter = express.Router();
import verificarJwt from '../middlewares/jwt.js';
import Water from '../controllers/waterConsumptionController.js';

/**
 * @swagger
 * /consumo_agua:
 *   get:
 *     tags:
 *       - Water Consumption
 *     summary: Obtener la lista de consumo de agua
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consumo de agua obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista de consumo de agua obtenida correctamente"
 *                 Consumo_de_agua:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       cantidad:
 *                         type: number
 *                         example: 15.5
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-03T00:00:00.000Z"
 *       500:
 *         description: Ocurrió un error al obtener la lista de consumo de agua
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al obtener la lista de Consumo de agua"
 */

waterConsumptionRouter.get('/', verificarJwt, Water.getWaterConsumption);

export default waterConsumptionRouter;
