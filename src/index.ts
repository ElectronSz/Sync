import express, {Express } from 'express';
import morgan from "morgan";
import fs from "fs"
import path from "path"
import compression from "compression"

import { syncRouter } from './routes/sync.route';
import { userRouter } from './routes/users.route';
import { sourceRouter } from './routes/source.route';
import  { authRouter } from './routes/auth.route';
import { metricsRouter } from './routes/metrics.route';
import { seedDb } from '../prisma/seed';


const app: Express = express();
const port: number = 3000;

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined', { stream: accessLogStream}))
app.use(compression())

// Apply routes
app.use('/api/sync', syncRouter);
app.use("/api/users", userRouter)
app.use("/api/dirs", sourceRouter)
app.use("/api/auth", authRouter)

app.use('/api/metrics', metricsRouter);

const SEED_DB = false

// Start the Express server
app.listen(port, async () => {

    //seed the database
    await seedDb(SEED_DB);

    console.log(`Server listening on port ${port}`);
});
