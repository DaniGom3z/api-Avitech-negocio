import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter.js';
import loginRouter from './src/routes/loginRouter.js';
import foodRouter from './src/routes/foodRouter.js';
import vaccinesRouter from './src/routes/vaccinesRouter.js';
import waterConsumptionRouter from './src/routes/waterConsumptionRouter.js';
import foodConsumptionRouter from './src/routes/foodConsumptionRouter.js';
import weightRouter from './src/routes/weightRouter.js';
import profitsRouter from './src/routes/profitsRouter.js';
import { swaggerDocs } from './src/documentation/swagger.js';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/alimentos', foodRouter);
app.use('/vacunas', vaccinesRouter);
app.use('/consumo_agua', waterConsumptionRouter);
app.use('/consumo_alimentos', foodConsumptionRouter);
app.use('/pesos', weightRouter);
app.use('/ganancias', profitsRouter);

// Endpoint para mostrar un texto plano sobre el propósito de la API
app.get('/', (req, res) => {
  res.send('API funcionando correctamente en HTTPS');
});

app.get('/quedo', (req, res) => {
  res.send('Ya quedó Kong');
});

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/apinegocio.serveblog.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/apinegocio.serveblog.net/fullchain.pem')
};

https.createServer(httpsOptions, app).listen(443, () => {
  console.log('Servidor en línea en el puerto HTTPS 8443');
  swaggerDocs(app, 443);  // Ajusta la documentación de Swagger si es necesario
});