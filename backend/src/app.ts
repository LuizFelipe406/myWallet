import express from 'express';
import { LoginRouter } from './routers';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

export default class App {
  private app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/login', LoginRouter);

    this.app.use(ErrorMiddleware.handle)
  }

  private config():void {
    this.app.use(express.json());
  }

  public start(PORT: string): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}