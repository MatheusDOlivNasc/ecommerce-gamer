CREATE TABLE IF NOT EXISTS product (
    id TEXT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    img TEXT NOT NULL,
    price NUMERIC NOT NULL,
    promo NUMERIC
)