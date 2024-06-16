const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../utils/auth');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: { email: email }
        });

        if (user) {
            if (!user.isActive) {
                return res.status(403).json({ msg: 'User is inactive' });
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.name });
                return res.status(200).json({ name: user.name, token: accessToken });
            } else {
                return res.status(401).json({ msg: 'Invalid password' });
            }

        } else {
            return res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error('Error in signin endpoint:', error);
        res.status(500).json({ msg: error.message });
    }
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 8)
            },
        })

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        const user = await prisma.users.findUnique({
            where: { email: email }
        });

        if (user) {
            if (!user.isActive) {
                return res.status(403).json({ msg: 'User is inactive' });
            }

            const passwordIsValid = await bcrypt.compareSync(oldPassword, user.password);

            if (passwordIsValid) {
                await prisma.users.update({
                    where: { email: email },
                    data: { password: bcrypt.hashSync(newPassword, 8) }
                });
                return res.status(200).json({ msg: 'Password changed successfully' });
            } else {
                return res.status(401).json({ msg: 'Old password is incorrect' });
            }
        } else {
            return res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateVisibility = async (req, res) => {
    try {
        const { id, isActive } = req.body;

        await prisma.users.update({
            where: {
                id: id
            },
            data: {
                isActive: isActive
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updatePermissions = async (req, res) => {
    try {
        const { id, isAdmin } = req.body;

        await prisma.users.update({
            where: {
                id: id
            },
            data: {
                isAdmin: isAdmin
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
