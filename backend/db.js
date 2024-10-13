const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongodbURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        const foodCollection = await mongoose.connection.db.collection("food_items");
        foodCollection.find({}).toArray(async function (err, data) {
            if (err) throw err;
            const categoryCollection = await mongoose.connection.db.collection("Categories");
            categoryCollection.find({}).toArray(async function (err, Catdata) {
                if (err) throw err;
                // console.log("Food Items:", data);
                // console.log("Categories:", Catdata);
            });
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;