import { PrismaClient } from "@prisma/client";
import Joi from 'joi';

const prisma = new PrismaClient();

const addFoodSchema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().required(),
    cantidad: Joi.number().required(),
    fechaInicial: Joi.date(),
    fechaFinal: Joi.date().iso()
});

const updateFoodSchema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().required(),
    cantidad: Joi.number().required(),
    fechaInicial: Joi.date(),
    fechaFinal: Joi.date().iso()
});

const deleteFoodSchema = Joi.object({
    id: Joi.number().required(),  
})
const getByIdFoodSchema = Joi.object({
    id: Joi.number().required(),  
})
const addFood = async (req, res) => {
    try {
        const { error, value } = addFoodSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Datos de entrada inválidos",
                error: error.details[0].message
            });
        }
        
        const { nombre, precio, cantidad, fechaInicial } = value;

        const existingFood = await prisma.alimentos.findFirst({
            where: {
                nombre: nombre,
            },
        });

        if (existingFood) {
            return res.status(400).json({
                message: "Ya existe un alimento con este nombre",
            });
        }

        // Si no existe, crear el nuevo alimento
        const currentDate = new Date();
        const offset = -currentDate.getTimezoneOffset(); 
        const createdAt = new Date(currentDate.getTime() + offset * 60 * 1000).toISOString().split('.')[0] + 'Z';

        const nuevoAlimento = await prisma.alimentos.create({
            data: {
                nombre,
                precio,
                cantidad,
                fechaInicial,
                createdAt 
            }
        });

        return res.status(201).json({
            message: "Alimento añadido correctamente",
        });
    } catch (error) {
        console.error("Error al añadir el alimento:", error);
        return res.status(500).json({
            message: "Ocurrió un error al añadir el alimento",
        });
    }
};


const updateFood = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const { error, value } = updateFoodSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Datos de entrada inválidos",
                error: error.details[0].message
            });
        }

        const { nombre, precio, cantidad, fechaInicial, fechaFinal } = value;

        const currentDate = new Date();
        const offset = -currentDate.getTimezoneOffset(); 
        const updateAt = new Date(currentDate.getTime() + offset * 60 * 1000).toISOString().split('.')[0] + 'Z';

        const alimentoActualizado = await prisma.alimentos.update({
            where: { id: id },  
            data: {
                nombre,
                precio,
                cantidad,
                fechaInicial,
                fechaFinal,
                updateAt
            }
        });

        return res.status(200).json({
            message: "Alimento actualizado correctamente",
        });
    } catch (error) {
        console.error("Error al actualizar el alimento:", error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el alimento",
        });
    }
};

const deleteFood = async (req, res) => {
    try {
        const { error, value } = deleteFoodSchema.validate(req.params); 
        if (error) {
            return res.status(400).json({
                message: "Datos de entrada inválidos",
                error: error.details[0].message
            });
        }
        
        const { id } = value;

        const alimentoEliminado = await prisma.alimentos.delete({
            where: { id: id }
        });

        return res.status(200).json({
            message: "Alimento eliminado correctamente",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al eliminar el alimento",
        });
    }
};

const getAllFood = async (req, res) => {
    try {
        const alimentos = await prisma.alimentos.findMany({
            select: {
                id: true,
                nombre: true,
                precio: true,
                cantidad: true,
                fechaInicial: true,
                fechaFinal: true,
            },
        });

        return res.status(200).json({
            message: "Lista de alimentos obtenida correctamente",
            alimentos: alimentos
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener la lista de alimentos",
        });
    }
};

const getById = async (req,res)=>{
    try {
        const {error,value}= getByIdFoodSchema.validate(req.params)
        if (error) {
            return res.status(400).json({
                message: "Datos de entrada inválidos",
                error: error.details[0].message
            });
        }
        const { id } = value;

        const alimentoEncontrado = await prisma.alimentos.findUnique({
            where: { id: id },
            select: {
                id: true,
                nombre: true,
                precio: true,
                cantidad: true,
                fechaInicial: true,
                fechaFinal: true,
            },
        });
        return res.status(200).json({
            message: "Alimento obtenido correctamente",
            alimento: alimentoEncontrado
        });

        
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener el alimento",
        });
    }
}

export default {
    addFood,
    updateFood,
    deleteFood,
    getAllFood,
    getById
};
