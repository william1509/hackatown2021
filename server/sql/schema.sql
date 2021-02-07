CREATE TABLE types(
id INT PRIMARY KEY,
description VARCHAR(10)
);

CREATE TABLE fountains(
id INT PRIMARY KEY,
arrondissement VARCHAR(50),
parc VARCHAR(50),
repere VARCHAR(50),
type INT,
x NUMERIC(9, 2),
y NUMERIC(9, 2),
longitude NUMERIC(15, 13) NOT NULL,
latitude NUMERIC(15, 13) NOT NULL,
FOREIGN KEY (type) REFERENCES types(id)
);

CREATE TABLE reviews(
id SERIAL PRIMARY KEY,
fountain INT NOT NULL,
rating INT NOT NULL,
FOREIGN KEY (fountain) REFERENCES fountains(id)
);

CREATE TABLE images(
id SERIAL PRIMARY KEY,
fountain INT NOT NULL,
file_name VARCHAR(50) NOT NULL,
FOREIGN KEY (fountain) REFERENCES fountains(id)
);