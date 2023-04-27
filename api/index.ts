import express from 'express';
import cors from 'cors';
import cartRouter from "./_cart_router"
import productRouter from "./_product_router"


const app = express();
app.use(cors())

app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).send('<h1>Next-Nuxt-Audio API is running</h1>');
});

app.use('/api/cart', cartRouter);
app.use('/api/product', productRouter);


export default app;