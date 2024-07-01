const bcrypt = require('bcryptjs/dist/bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

exports.updateVisibility = async (req, res) => {
    try {
        const { id, isActive } = req.body;

        const user = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                isActive: isActive
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updatePermissions = async (req, res) => {
    try {
        const { id, isAdmin } = req.body;

        const user = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                isAdmin: isAdmin
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
