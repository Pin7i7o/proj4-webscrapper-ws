const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//retreives all cars from db
exports.getAll = async (req, res) => {
    try {
        const cars = await prisma.cars.findMany();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//add a car to the database
exports.postCars = async (req, res) => {
    const { make, model, url} = req.body;

    try {
        const car = await prisma.cars.create({
            data: {
                model: model,
                make: make,
                url: url
            },
        })

        res.status(201).json(car)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

