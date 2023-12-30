CREATE TABLE IF NOT EXISTS prods_in_cart (
    cart_id TEXT,
    prod_id TEXT,
    FOREIGN KEY(cart_id) REFERENCES cart(id),
    FOREIGN KEY(prod_id) REFERENCES product(id)
);