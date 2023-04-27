# NextAudio Backend

This is the readme for NextAudio backend. This project is responsible for handling the server-side functionality of the NextAudio ecommerce website. It uses [Firebase](https://firebase.google.com/) for database management and [Express](https://expressjs.com/) as the backend framework.

## Installation

After cloning the project, run the following command to install dependencies:

```bash
npm install
```

## Routers

### Complete Order

This router handles the completion of orders. It takes a list of orders with product ids and quantities and updates the number of orders per product in the database.

```typescript
router.post('/complete', async (req, res) => {
    ...
    return res.status(200).json({ message: 'Orders successfully completed' });
});
```

### Get Product by Id

This router returns a single product by its id.

```typescript
router.get('/:id', async (req, res) => {
    ...
    return res.status(200).json(product);
});
```

### Search Products

This router is responsible for finding products based on specific search parameters such as brands, price, categories, and tags. It also allows for sorting the results by different criteria such as featured, top rated or price.

```typescript
router.post('/search', async (req, res) => {
    ...
    return res.status(200).json(products);
});
```

## Conclusion

Thank you for taking the time to read this readme file for NextAudio backend. If you have any questions or concerns, feel free to contact [me] (mailto:mehmet@mehmetfd.dev).
