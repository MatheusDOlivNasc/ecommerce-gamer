ALTER TABLE cart
DROP COLUMN createAt;

ALTER TABLE cart
ADD COLUMN createAt TIMESTAMP WITH TIME ZONE NOT NULL;