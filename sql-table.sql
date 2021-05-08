CREATE TABLE logs.userslogs (
	created_at varchar(50) NULL,
	first_name varchar(50) NULL,
	message varchar(1000) NULL,
	second_name varchar(50) NULL,
	user_id int4 NOT NULL,
	CONSTRAINT user_logs_un UNIQUE (user_id)
);