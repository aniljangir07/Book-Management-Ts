"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const BookSchema = new mongoose_1.Schema({
    bookName: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    authorName: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        default: false
    }
}, { versionKey: false, timestamps: true });
exports.default = (0, mongoose_1.model)("Books", BookSchema);
