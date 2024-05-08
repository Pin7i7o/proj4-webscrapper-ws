const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = require('../services/scrap');

//return the 10 most recently posted cars w/o filters
exports.getLatestCars = async (req, res) => {
    const { km, fromYear, toYear, fromPrice, toPrice, url } = req.query;
    const params = await services.getLatest10(km, fromYear, toYear, fromPrice, toPrice, url);
    res.json(params);

}

//add scraping history to he db
exports.postScrapHistory = async (req, res) => {
    const { cars_id_fk} = req.body;
    const date_hour = new Date();
    try {
        const scrap = await prisma.scrap.create({
            data:{
                date_hour: date_hour,
                cars_id_fk: cars_id_fk
            },
        })
        res.status(201).json(scrap)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
