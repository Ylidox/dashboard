create table customer(
  customer_id serial primary key,
  name varchar(40) not null,
  lastname varchar(40),
  phone varchar(20),
  email varchar(40),
  expenses numeric default 0,
  blocked boolean default false,
  registration_date date default now()
);
create table address(
  address_id serial primary key,
  customer_id int,
  foreign key (customer_id) references customer (customer_id),
  zipcode numeric,
  country varchar(60) not null,
  county varchar(60),
  city varchar(60),
  house numeric,
  apartment numeric,
  addition_date date default now()
);
insert into customer(name, lastname, expenses, phone, email) values
  ('Lorenz','Johns',82039.02,'+0-812-985-71-69','Fay.Nikolaus@hotmail.com'),
  ('Evangeline','Little',68082.58,'+4-729-319-41-27','Marlene43@hotmail.com'),
  ('Krystal','Medhurst',19894.93,'+8-569-032-47-13','Tia_Feest90@gmail.com'),
  ('Karine','Kulas',52677.62,'+9-137-921-21-63','Barton57@yahoo.com'),
  ('Conor','Swift',29027.04,'+5-186-671-35-77','Gwen_Lind@gmail.com'),
  ('Grady','Howell',92896.41,'+4-409-731-83-96','Lindsay.Yundt88@hotmail.com'),
  ('Edison','Quitzon',76559.24,'+0-838-782-02-18','Margarette26@gmail.com'),
  ('Lula','Hoppe',61720.84,'+4-859-035-79-38','Marc.Cummerata@yahoo.com'),
  ('Paxton','Effertz',4761.46,'+2-105-142-03-26','Neil.Gutkowski74@hotmail.com'),
  ('Luis','Johnson',87560.02,'+8-974-951-74-46','Agustina65@yahoo.com'),
  ('Nichole','Murazik',14481.36,'+3-803-340-49-80','Leda.Kohler-Lind@gmail.com'),
  ('Edgardo','Mayer',62034.42,'+9-635-839-60-28','Rhett_Bahringer@yahoo.com'),
  ('Malinda','Cremin',98857.54,'+7-608-362-40-46','Alexandrea_Lockman@hotmail.com'),
  ('Gonzalo','Morar',36650.9,'+1-529-089-09-25','Odie.Spinka@gmail.com'),
  ('Glen','Cormier',30751.34,'+3-023-439-21-01','Dortha_Leannon@gmail.com'),
  ('Tito','Raynor',54155.96,'+0-518-711-95-29','Valerie94@gmail.com'),
  ('Jeramie','Gislason',38494.89,'+6-626-918-27-73','River.Lang61@hotmail.com'),
  ('Maureen','Abernathy',1371.43,'+9-761-677-85-59','Godfrey73@gmail.com'),
  ('Maurice','Johnston',80147.47,'+6-438-033-03-18','Stephany_Weber36@hotmail.com'),
  ('Armando','Mraz',1291.58,'+6-134-494-25-68','Coralie.Effertz47@hotmail.com'),
  ('Loraine','Nolan',12970.97,'+8-205-883-67-07','Lauren.Glover15@yahoo.com'),
  ('Sylvia','Gleason',18264.43,'+9-555-460-68-45','Fannie25@gmail.com'),
  ('Keon','Toy',34178.09,'+6-398-412-43-51','Constantin_Treutel93@hotmail.com'),
  ('Adolphus','Daniel',99225.34,'+0-604-181-91-90','Brain_Dibbert@hotmail.com'),
  ('Zackery','VonRueden',33825.19,'+1-051-450-00-95','Kristina_Tromp@gmail.com'),
  ('Muriel','Schultz',30086.78,'+8-988-782-15-49','Chaz.Rau90@yahoo.com'),
  ('Devonte','Bayer',50614.41,'+7-948-252-42-43','Tobin.Kohler23@yahoo.com'),
  ('Zella','Schneider',96681.34,'+5-367-651-12-27','Meaghan.Langosh12@hotmail.com'),
  ('Rosalyn','Schamberger',11992.69,'+3-721-622-82-68','Kaden.Glover40@gmail.com'),
  ('Brigitte','Huels',88415,'+8-881-031-14-41','Eve.Prosacco-Connelly@hotmail.com');
insert into address(customer_id, zipcode, country, county, city, house, apartment) values
  (8,'030984','Mongolia','Buckinghamshire','Deerfield Beach',2,87),
  (20,'408158','Turkey','Bedfordshire','North Haleigh',22,60),
  (8,'153710','Poland','Borders','Homenickfort',11,87),
  (14,'971631','Macao','Avon','Memphis',7,153),
  (1,'074093','Bahamas','Cambridgeshire','Highlands Ranch',14,111),
  (27,'525804','Lao Peoples Democratic Republic','Avon','Lloydfurt',37,166),
  (12,'261261','Nepal','Buckinghamshire','Rohanshire',12,33),
  (18,'741121','Bonaire, Sint Eustatius and Saba','Berkshire','Heatherstead',25,13),
  (18,'758380','Saudi Arabia','Borders','Fort Myers',13,57),
  (23,'154757','Liechtenstein','Cambridgeshire','Lake Juddview',15,157),
  (18,'710251','Gambia','Berkshire','Beckerfield',19,32),
  (5,'968822','Guatemala','Berkshire','Ewaldhaven',35,196),
  (4,'965946','Bahrain','Buckinghamshire','North Reeseborough',22,167),
  (2,'590887','South Africa','Berkshire','Weissnatside',29,104),
  (10,'299277','Philippines','Borders','Fort Nickbury',36,56),
  (1,'225681','Russian Federation','Avon','Fort Kelvinshire',24,157),
  (19,'220752','Virgin Islands, British','Borders','South Carsonstead',4,26),
  (23,'682894','United Kingdom','Cambridgeshire','Reesefurt',10,1),
  (16,'959083','Colombia','Cambridgeshire','South Paula',18,91),
  (8,'778261','Azerbaijan','Avon','West Maryjanebury',11,167);