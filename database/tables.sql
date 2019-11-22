create table users(
  id serial primary key,
  username varchar(128) not null,
  sendtoaddress varchar(256),
  recieveaddress varchar(256)
);