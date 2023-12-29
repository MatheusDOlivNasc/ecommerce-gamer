CREATE TABLE IF NOT EXISTS prodsInCart (
    cart_id TEXT,
    prod_id TEXT,
    FOREIGN KEY(cart_id) REFERENCES cart(id),
    FOREIGN KEY(prod_id) REFERENCES product(id)
);