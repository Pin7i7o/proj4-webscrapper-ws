const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//gets all entries with a specific scrap_id_fk
exports.getById = async (req, res) => {
    const scrapId = req.params.scrapId;
    try {
        const response = await prisma.responses.findMany({
            where: {
                scrap_id_fk: scrapId
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

//add responses to he db
exports.create = async (req, res) => {
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
                    published_date: data.published_date,
                    scrap_id_fk: data.scrap_id_fk
                },
            });
            return response;
        }));
        res.status(201).json(responses);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//delete responses by scrap id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.responses.deleteMany({
            where: {
                scrap_id_fk: id
            }
        });
        res.status(200).json({ msg: 'deleted' });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}