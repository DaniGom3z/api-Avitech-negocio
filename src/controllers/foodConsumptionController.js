import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getFoodConsumption = async (req,res) =>{
    try {
        const consumoAlimento = await prisma.consumo_de_alimento.findMany({
            select: {
                id: true,
                id_alimento: true,
                cantidad: true,
                fecha: true
            },
        });

        return res.status(200).json({
            message: "Lista de consumo de alimento obtenida correctamente",
            Consumo_de_alimento: consumoAlimento
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener la lista de Consumo de agua",
        });
    }
}

export default {getFoodConsumption}
