const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const responsesSchema = Joi.object({
    model_make: Joi.string().required(),
    km: Joi.string().required(),
    year: Joi.string().required(),
    price: Joi.string().required(),
    url: Joi.string().required(),
    published_date: Joi.date().iso().required(),
    scrap_id_fk: Joi.string().required(),
});

//gets all entries with a specific scrap_id_fk
exports.getById = async (req, res) => {
    try {
        const scrap_id_fk = req.params.scrapId;

        const response = await prisma.responses.findMany({
            where: {
                scrap_id_fk: scrap_id_fk
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

    const { error } = Joi.array().items(responsesSchema).validate(responseData);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

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
    try {
        const scrap_id_fk  = req.params.id;
        await prisma.responses.deleteMany({
            where: {
                scrap_id_fk: scrap_id_fk
            }
        });
        res.status(200).json({ msg: 'deleted' });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}