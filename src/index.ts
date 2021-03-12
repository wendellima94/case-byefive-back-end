import express from 'express';
import cors from 'cors';
import { AddressInfo } from "net";

import connect from '../src/database/Database';
import { router } from './router/UserRouter';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/user', router)

const server = app.listen(4000 || 4003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

const db = 'mongodb+srv://wdl-db:100295@cluster0.eolip.mongodb.net/register?retryWrites=true&w=majority';
connect({db});