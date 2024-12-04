import Professional from '../models/Professional.js';

export const getProfessionalsByCity = async (req, res) => {
    const { city, profession } = req.query;

    try {
        // Construct the query object dynamically
        const query = {};
        if (city) query.city = city;
        if (profession) query.profession = profession;

        // Fetch professionals matching the query
        const professionals = await Professional.find(query);
        if (professionals.length === 0) {
            return res.status(404).json({ message: 'No professionals found for the given criteria' });
        }

        console.log("Retrieved professionals:", professionals);
        res.status(200).json(professionals);
    } catch (error) {
        console.error("Error fetching professionals:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
export const
    getProfile = async (req, res) => {
        try {
            const { id } = req.params // Assuming user ID is extracted from JWT
            console.log("the id is", id)
            const user = await Professional.findById(id);
            console.log("the user is", user)
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch profile' });
        }
    }
export const UpdateProfile = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body;
        console.log("the id is u", id)
        const user = await Professional.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile' });
    }
}