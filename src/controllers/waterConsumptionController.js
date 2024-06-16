import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getWaterConsumption = async (req,res) =>{
    try {
        const consumoAgua = await prisma.consumo_de_agua.findMany({
            select: {
                id: true,
                cantidad: true,
                fecha:true
            },
        });

        return res.status(200).json({
            message: "Lista de consumo de agua obtenida correctamente",
            Consumo_de_agua: consumoAgua
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener la lista de Consumo de agua",
        });
    }
}

export default {getWaterConsumption}
