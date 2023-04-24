import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cartRouter from "./_cart_router"
import productRouter from "./_product_router"


const app: Express = express();
app.use(cors())

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Next-Nuxt-Audio API is running</h1>');
});

app.use('/cart', cartRouter);
app.use('/product', productRouter);


export default app;