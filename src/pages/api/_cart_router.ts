import express, { Request, Response } from 'express';
import { db } from './_firebase';
import { collection, query, where, getDocsFromServer, doc, setDoc } from "firebase/firestore";
const productsRef = collection(db, "products");

const router = express.Router()

router.post('/complete', async (req: Request, res: Response) => {
    //increase number of orders per product by the amount in the cart for each product
    const { orders } = req.body;
    orders.forEach(async (order: any) => {
        const q = query(productsRef, where("id", "==", order.id));
        const querySnapshot = await getDocsFromServer(q);
        if (!querySnapshot.empty) {
            const product = querySnapshot.docs[0].data();
            await setDoc(doc(db, "products", product.id), {
                orders: product.orders + order.quantity
            }, { merge: true });
        }
    });
    return res.status(200).json({ message: 'Orders successfully completed' });
});

export default router