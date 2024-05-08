const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//add responses to he db
exports.postResponses = async (req, res) => {
    const responseData = req.body;

    try {
        const responses = await Promise.all(responseData.map(async (data) => {
            const response = await prisma.responses.create({
                data: {
                    model_make: data.model_make,
                    km: data.km,
                    year: data.year,
                    price: data.price,
                    url: data.url,
                    scrap_id_fk: data.scrap_id_fk
                },
            });
            return response;
        }));
        res.status(201).json(responses)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}