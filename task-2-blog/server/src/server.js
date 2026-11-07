import { app } from "./app/app.js";
import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
await connectDB();
app.listen(3000, () => {
    console.log("Server listening on 3000");
})