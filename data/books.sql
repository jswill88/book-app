DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    authors VARCHAR(255),
    title VARCHAR(255),
    isbn NUMERIC,
    image_url VARCHAR(255),
    description TEXT,
    bookshelf VARCHAR(255)
);

INSERT INTO books (
    authors,
    title,
    isbn,
    image_url,
    description,
    bookshelf
)

SELECT * FROM books;