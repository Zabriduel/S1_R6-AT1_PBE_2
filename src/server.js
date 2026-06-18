import express from 'express';
import router from './routes/routes.js';
import 'dotenv/config';
import { initializeDatabase } from './config/db.js';

const app = express();

app.use(express.json());

app.use('/', router)

app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

initializeDatabase().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
});
