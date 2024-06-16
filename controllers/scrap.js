const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = require('../services/scrap');
const { urlValidation } = require('../utils/urlValidation');

//get the 10 most recently posted cars w/o filters
exports.getLatestCars = async (req, res) => {
    const { km, fromYear, toYear, fromPrice, toPrice, url } = req.query;

    if (!urlValidation(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const params = await services.getLatest10(km, fromYear, toYear, fromPrice, toPrice, url);
    res.json(params);

}

//get scrap history by id
exports.getById = async (req, res) => {
    const { cars_id_fk } = req.body
    try {
        const scrap = await prisma.scrap.findMany({
            where: {
                cars_id_fk: cars_id_fk
            }
        });
        res.status(200).json(scrap);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

//add scraping history to he db
exports.create = async (req, res) => {
    const { cars_id_fk } = req.body;
    const date_hour = new Date();
    try {
        const scrap = await prisma.scrap.create({
            data:{
                date_hour: date_hour,
                cars_id_fk: cars_id_fk
            }
        });
        res.status(201).json(scrap);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//delete scrap history by id
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.scrap.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ msg: 'deleted' });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
