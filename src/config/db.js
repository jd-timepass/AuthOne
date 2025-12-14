import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
    } catch (err) {
        console.log("MongoDB connection error: ", err);

        process.exit(1);  //Why this ?

        /* IMPORTANT TO NOTE THAT ---> 
        Without process.exit(1): Your server might start running,
        but every API call a user makes will fail with database errors.
        The app is technically "alive" but effectively broken (a "zombie" process).
        
        With process.exit(1): You kill the application immediately.
        This forces you to fix the configuration (like a bad Mongo URI)
        before the app even attempts to serve traffic.
        */
    }
}
export default connectDB;