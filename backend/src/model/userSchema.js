import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: false, 
        unique: true,
        sparse: true, // Allows null/undefined for unique field
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "please enter valid phone number"]
    },
    phone: {
        type: String,
        required: false, 
        unique: true,
        sparse: true, // Allows null/undefined for unique field
        match: [/^\+?[1-9]\d{1,14}$/, "please enter valid phone number"] // E.164 format
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    DOB: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        enum: ['Man','Woman','Prefer not to say','Non-binary','Something else'],
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    isBlocked: {
        type: Boolean,
        required: false,
        default: false
    },
    profilePicture: {
        type: String,
        default: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
    },
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
    googleId: {
        type: String,
        default: null
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;