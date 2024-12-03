import Professional from '../models/Professional.js';

export const getProfessionalsByCity = async (req, res) => {
    const { city, profession } = req.query;

    try {
        const professionals = await Professional.find({
            'location.city': city,
            profession: profession,
        });

        res.status(200).json(professionals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
