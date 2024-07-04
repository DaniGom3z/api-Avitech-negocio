import express from 'express';
import verificarJwt from '../middlewares/jwt.js';
import Food from '../controllers/foodConsumptionController.js';

const foodConsumptionRouter = express.Router();

/**
 * @swagger
 * /consumo_alimentos:
 *   get:
 *     tags:
 *       - Food Consumption
 *     summary: Obtener lista de consumo de alimentos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consumo de alimentos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lista de consumo de alimentos obtenida correctamente
 *                 Consumo_de_alimento:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       id_alimento:
 *                         type: integer
 *                         example: 1
 *                       cantidad:
 *                         type: integer
 *                         example: 100
 *                       fecha:
 *                         type: string
 *                         format: date
 *                         example: 2023-07-01
 *       500:
 *         description: Ocurrió un error al obtener la lista de consumo de alimentos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al obtener la lista de consumo de alimentos
 */
foodConsumptionRouter.get('/', verificarJwt, Food.getFoodConsumption);

export default foodConsumptionRouter;
