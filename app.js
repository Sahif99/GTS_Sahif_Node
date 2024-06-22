const express = require("express");
const ejs = require("ejs");
const body_parser=require('body-parser')
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./app/config/db");
const errorHandler = require("./app/middleware/Error_handler");
const morgan = require('morgan');
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

dotenv.config();

const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("views", "views");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "GTS API Docs using Swagger",
			version: "1.0.0",
			description: "Employeement Agreement CRUD APIs",
		},
		servers: [
			{
				url: "http://localhost:2468",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



app.use(morgan("tiny"));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*');
  res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
  next();
})


app.use(body_parser.urlencoded({extended:true}))
 app.use(body_parser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const ApiRoute = require("./routes/ApiRouter");
app.use("/api", ApiRoute);

const AuthRouter=require('./routes/AuthRouter');
app.use('/api',AuthRouter)


app.use(errorHandler);

const Port = 2468;
app.listen(Port, () => {
  console.log(`Server is Running On Port http://localhost:${Port}`);
});
