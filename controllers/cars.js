const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//gets all cars for a specific user from db
exports.getAll = async (req, res) => {
    const { user_id_fk } = req.body;

    try {
        const cars = await prisma.cars.findMany({
            where: { user_id_fk: user_id_fk }
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//add a car to the database
exports.create = async (req, res) => {
    const { make, model, url, user_id_fk } = req.body;

    try {
        const car = await prisma.cars.create({
            data: {
                model: model,
                make: make,
                url: url,
                user_id_fk: user_id_fk
            },
        });

        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//updates a car
exports.update = async (req, res) => {
    const { id, make, model, url, active } = req.body;

    try {
        const car = await prisma.cars.update({
            where: {
                id: id
            },
            data: {
                make: make,
                model: model,
                url: url,
                active: active
            }
        });
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

