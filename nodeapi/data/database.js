import mongoose from "mongoose"

export const connetDB = () => {
mongoose.connect(process.env.MONGO_URL, 
{dbName: "backendapi",
}).then(() => console.log("Database connected")).catch((e) => console.log(e))
}