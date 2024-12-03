import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    location: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
    },
}, { timestamps: true });

const Professional = mongoose.model('Professional', professionalSchema);

export default Professional;
