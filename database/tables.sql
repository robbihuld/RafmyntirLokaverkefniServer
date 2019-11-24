create table users(
  id serial primary key,
  username varchar(128) not null,
  address varchar(256),
  connected boolean default false,
  lat float default null,
  long float default null,
  socketid varchar(256) default null,
  directionsrequested boolean default false
);

create table treasures(
  id serial primary key,
  latitude float,
  longitude float,
  amount integer,
  found boolean default false
);