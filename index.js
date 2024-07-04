import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRouter.js";
import loginRouter from "./src/routes/loginRouter.js";
import foodRouter  from "./src/routes/foodRouter.js";
import vaccinesRouter  from "./src/routes/vaccinesRouter.js";
import waterConsumptionRouter  from "./src/routes/waterConsumptionRouter.js";
import foodConsumptionRouter  from "./src/routes/foodConsumptionRouter.js";
import weightRouter  from "./src/routes/weightRouter.js";
import profitsRouter  from "./src/routes/profitsRouter.js";
import { swaggerDocs } from "./src/documentation/swagger.js"; 

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json());
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/alimentos", foodRouter);
app.use("/vacunas", vaccinesRouter);
app.use("/consumo_agua", waterConsumptionRouter);
app.use("/consumo_alimentos", foodConsumptionRouter);
app.use("/pesos",weightRouter);
app.use("/ganancias",profitsRouter);




app.listen(process.env.PORT, () => {
  console.log("Server online in port: " + process.env.PORT);
  swaggerDocs(app, process.env.PORT);
});

