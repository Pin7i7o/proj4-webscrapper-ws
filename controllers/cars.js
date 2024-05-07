const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCars = async (req, res) => {
    //get car properties from the request
    const { make, model, url} = req.body;
    try {
        //creates a new car
        const car = await prisma.cars.create({
            data: {
                model: model,
                make: make,
                url: url
            },
        })
        //returns created car
        res.status(201).json(car)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}