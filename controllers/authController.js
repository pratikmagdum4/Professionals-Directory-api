import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Professional from '../models/Professional.js';

export const registerProfessional = async (req, res) => {
    const { name, email, password, profession, phoneNumber, city } = req.body;

    try {
        const existingUser = await Professional.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newProfessional = new Professional({
            name,
            email,
            password: hashedPassword,
            profession,
            phoneNumber,
            city,
        });
        console.log("the new is ", newProfessional)
        await newProfessional.save();
        res.status(201).json({ message: 'Professional registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const loginProfessional = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Professional.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
