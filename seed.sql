DROP DATABASE postgres;
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
\connect docker;
CREATE TABLE "roles" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE "students" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    ra VARCHAR(10) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
INSERT INTO "roles" (name) VALUES ('admin'), ('student');
INSERT INTO "users" (username, password, role_id) VALUES ('admin', '$2a$10$hih/GP0Yfc54AtvPReAeKu.ovAZgwjgGUz4yMk./JXDpnbwfA9.ay', 1), ('student', '$2a$10$hih/GP0Yfc54AtvPReAeKu.ovAZgwjgGUz4yMk./JXDpnbwfA9.ay', 2);
INSERT INTO "students" (name, email, ra, cpf)
VALUES 
    ('John Doe', 'johndoe@email.com', '123456', '77396311080'), 
    ('Jane Doe', 'janedoe@email.com', '654321', '35478331082'), 
    ('Alice Doe', 'alicedoe@email.com', '987654', '66434392052'),
    ('Bob Doe', 'bobdoe@email.com', '456789', '63270149093'),
    ('Charlie Doe', 'charliedoe@email.com', '789123', '01274020042'),
    ('David Doe', 'daviddoe@email.com', '321654', '44840752028'),
    ('Evette Doe', 'evettedoe@email.com', '654987', '68288439080'),
    ('Fiona Doe', 'fionadoe@email.com', '987321', '63665877016'),
    ('George Doe', 'georgedoe@email.com', '789654', '78379095006'),
    ('Helen Doe', 'helendoe@email.com', '456123', '64394305055'),
    ('Igor Doe', 'igordoe@email.com', '321987', '02401567062'),
    ('Julia Doe', 'juliadoe@email.com', '654789', '82310806005'),
    ('Kevin Doe', 'kevindoe@email.com', '987456', '06609917051'),
    ('Lara Doe', 'laradoe@email.com', '456987', '87458897082'),
    ('Miguel Doe', 'migueldoe@email.com', '789456', '07986340061'),
    ('Nina Doe', 'ninadoe@email.com', '123987', '41505815096'),
    ('Oliver Doe', 'oliverdoe@email.com', '654456', '07506421062'),
    ('Paul Doe', 'pauldoe@email.com', '987789', '66916745029'),
    ('Quinn Doe', 'quinndoe@email.com', '456654', '89042678038'),
    ('Rita Doe', 'ritadoe@email.com', '321456', '96603341093'),
    ('Steve Doe', 'stevedoe@email.com', '654123', '53098441046'),
    ('Tina Doe', 'tinadoe@email.com', '987987', '22373094002');