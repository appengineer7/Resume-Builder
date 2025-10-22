import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    message : {
        type : String, 
        required : true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Contact", contactSchema);