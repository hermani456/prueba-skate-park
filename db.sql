CREATE DATABASE skatepark_db;

CREATE TABLE skaters (
   id SERIAL,
   email VARCHAR(50) NOT NULL,
   nombre VARCHAR(25) NOT NULL,
   password VARCHAR(25) NOT NULL,
   anos_experiencia INT NOT NULL,
   especialidad VARCHAR(50) NOT NULL,
   foto VARCHAR(255) NOT NULL,
   estado BOOLEAN NOT NULL
);

insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values ('email@email.com', 'julio', '123', 10, 'skate', 'foto.jpg', true);