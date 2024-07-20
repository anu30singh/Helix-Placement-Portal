const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobListingSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ctc: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
