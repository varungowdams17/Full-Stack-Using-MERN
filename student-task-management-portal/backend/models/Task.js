const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Pending",
        },
    },
    { timestamps: true }
);

taskSchema.virtual("id").get(function () {
    return this._id.toString();
});

taskSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
        return ret;
    },
});

taskSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
        return ret;
    },
});

module.exports = mongoose.model("Task", taskSchema);