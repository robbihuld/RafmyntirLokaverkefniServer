create table users(
  id serial primary key,
  username varchar(128) not null,
  address varchar(256),
  connected boolean default false
);

create table treasures(
  id serial primary key,
  lat float,
  long float,
  amount integer,
  found boolean default false
);