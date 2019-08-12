create database tindev;
use tindev;

create table devs (
id int unsigned auto_increment not null,
nome varchar(100) not null,
bio text not null,
username varchar(50) not null,
avatar varchar(250) not null,
likes text not null,
dislikes text not null,
primary key(id)
);