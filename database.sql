CREATE TABLE person (
    "id" serial primary key,
    "username" varchar(50) unique,
    "password" varchar(200), 
    "email_address" varchar(100),
    "first_name" varchar (50)
);
CREATE TABLE debts (
    "id" serial primary key,
    "name" varchar (50),
    "balance" float, 
    "rate" float,
    "user_id" int foreign key references "person" (id)
);

