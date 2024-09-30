CREATE DATABASE `spring_vs_node`;

CREATE USER 'spring_vs_node'@'%' IDENTIFIED BY 'spring_vs_node';
GRANT Update ON spring_vs_node.* TO 'spring_vs_node'@'%';
GRANT Select ON spring_vs_node.* TO 'spring_vs_node'@'%';
GRANT Insert ON spring_vs_node.* TO 'spring_vs_node'@'%';
GRANT Delete ON spring_vs_node.* TO 'spring_vs_node'@'%';

CREATE TABLE spring_vs_node.record (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	description TEXT NULL,
    created_date DATETIME NULL,
	CONSTRAINT records_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;
