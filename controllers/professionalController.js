import Professional from '../models/Professional.js';

// Fetch professionals by city and profession
export const getProfessionalsByCity = async (req, res) => {
    const { city, profession } = req.query;

    try {
        const query = {};
        if (city) query.city = city;
        if (profession) query.profession = profession;

        const professionals = await Professional.find(query);
        if (professionals.length === 0) {
            return res.status(404).json({ message: 'No professionals found for the given criteria' });
        }

        res.status(200).json(professionals);
    } catch (error) {
        console.error('Error fetching professionals:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Get a professional profile by ID
export const getProfile = async (req, res) => {
    try {
        const { id } = req.params; // Assuming user ID is extracted from JWT
        const user = await Professional.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
};

// Update a professional's profile by ID
export const UpdateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await Professional.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile', error });
    }
};
