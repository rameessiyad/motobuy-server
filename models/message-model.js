const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        message: {
            type: String,
            required: true,
        },

        isRead: {
            type: Boolean,
            required: true,
        },
    },
    { timeStamps: true }
);

messageSchema.index({ chatId: 1 });

module.exports = mongoose.model("Message", messageSchema);
