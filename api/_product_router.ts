import express from 'express';
import { db } from './_firebase';
import { collection, query, where, getDocsFromServer } from "firebase/firestore";
const productsRef = collection(db, "products");

const router = express.Router()

router.get('/:id', async (req, res) => {
    const q = query(productsRef, where("id", "==", req.params.id));
    const querySnapshot = await getDocsFromServer(q);
    if (!querySnapshot.empty) {
        const product = querySnapshot.docs[0].data();
        return res.status(200).json(product);
    }
    return res.status(400).json({ message: 'Invalid product id' });
});

router.post('/search', async (req, res) => {
    //given a list of brands, max price, list of categories, type of order as string, return all products that match
    const { brands, maxPrice, categories, order, tags } = req.body;
    let q = query(productsRef);
    if (brands && brands.length > 0) {
        q = query(productsRef, where("brand", "in", brands));
    }
    if (maxPrice && maxPrice > 0) {
        q = query(q, where("price", "<=", maxPrice));
    }
    if (categories && categories.length > 0) {
        q = query(q, where("category", "in", categories));
    }
    if (tags && tags.length > 0) {
        q = query(productsRef, where("tag", "in", tags));
    }
    const querySnapshot = await getDocsFromServer(q);
    let products: any[] = []
    if (!querySnapshot.empty) {
        products = querySnapshot.docs.map(doc => doc.data());
        if (order) {
            switch (order) {
                case "Latest":
                    products = products.slice(0, 5);
                    break;

                case "Featured":
                    products = products.filter(
                        (item) => item.tag === "featured"
                    );
                    break;

                case "Top Rated":
                    products = products.filter(
                        (item) => item.rating > 4
                    );
                    break;

                case "Price(Lowest First)":
                    products = products.sort(
                        (a, b) => a.price - b.price
                    );
                    break;

                case "Price(Highest products)":
                    products = products.sort(
                        (a, b) => b.price - a.price
                    );
                    break;

                default:
                    break;
            }
        }

    }
    return res.status(200).json(products);
});

export default router