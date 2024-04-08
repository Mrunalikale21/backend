import mongoose from "mongoose"

export const connetDB = () => {
mongoose.connect(process.env.MONGO_URL, 
{dbName: "backendapi",
}).then((c) => console.log(`Database connected with ${c.connection.host}`)).catch((e) => console.log(e))
}