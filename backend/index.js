import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({});

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://fluffy-salmiakki-673e86.netlify.app/',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("*", (req, res) => {
  const options = {
    root: path.join(__dirname, "public/dist"),
    dotfiles: 'deny',
    headers: {
      'Content-Type': 'text/html'
    }
  };
  
  res.sendFile("index.html", options);
});



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})