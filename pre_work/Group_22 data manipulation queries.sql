------------------------------------------------------
-- CS340 Project Step 4
-- DML queries
-- GROUP 22
-- Ashley Pettibone and Michael Uchmanowicz
------------------------------------------------------

 

------------------------------------------------------
-------------Family_Members table queries-------------

---------- query to select all family members---------
SELECT * FROM Family_Members;

---------- query to select a family members-----------
SELECT * FROM Family_Members WHERE (first_name, nick_name, last_name) = (:first_nameInput, :nick_nameInput, :last_nameInput);


------- query to insert a new family member------------
INSERT INTO `Family_Members` (`active`, `first_name`, `nick_name`, `last_name`, `birthday`, `primary_number`) VALUES (:activeInput, :first_nameInput, :nick_nameInput, :last_nameInput, :birthdayInput, :primary_numberInput);


----------- query to update a  family member-----------
UPDATE `Family_Members 
SET (`active`, `first_name`, `nick_name`, `last_name`, `birthday`, `primary_number`) VALUES (:activeInput, :first_nameInput, :nick_nameInput, :last_nameInput, :birthdayInput, :primary_numberInput);
WHERE (first_name, nick_name, last_name) = (:first_nameInput, :nick_nameInput, :last_nameInput);


------- query to delete a new family member------------
DELETE FROM `Family_Members WHERE (first_name, nick_name, last_name) = (:first_nameInput, :nick_nameInput, :last_nameInput);

------------------------------------------------------
------------------------------------------------------
 

------------------------------------------------------
-------------Items table queries----------------------

---------- query to select all Items members---------
SELECT * FROM Items;



---------- query to select all Items members----------
SELECT * FROM Items WHERE name = :nameInput;


----------- query to insert a new item----------------
INSERT INTO `Items` (`active`, `item_name`, `item_amount`, `suggested_store`, `note`, `item_owner`) VALUES (:activeInput, :item_nameInput, :item_amountInput, :suggested_storeInput, :noteInput, :item_ownerInput)


----------- query to update a  item-------------------
UDPATE Items
SET (`active`, `item_name`, `item_amount`, `suggested_store`, `note`, `item_owner`) VALUES (:activeInput, :item_nameInput, :item_amountInput, :suggested_storeInput, :noteInput, :item_ownerInput)
WHERE name = :family_idInput;


----------- query to delete a  item------------------
DELETE FROM * FROM Items WHERE name = :nameInput;

------------------------------------------------------
------------------------------------------------------
 

------------------------------------------------------
-------------Announcements table queries--------------

---------- query to select all announcements----------
SELECT * FROM Announcements;



---------- query to select a announcement-------------
SELECT * FROM Announcements where title = :titleInput;



----------- query to insert a new announcement---------
INSERT INTO `Announcements` (`active`, `title`, `note`, `start_date`, `end_date`, `announcement_owner`) VALUES (:activeInput, :titleInput, :noteInput, :start_dateInput, :end_dateInput, :announcement_ownerInput);

----------- query to update an announcement -----------
UPDATE Announcements 
SET (`active`, `title`, `note`, `start_date`, `end_date`, `announcement_owner`) VALUES (:activeInput, :titleInput, :noteInput, :start_dateInput, :end_dateInput, :announcement_ownerInput)
WHERE announcement_id = :announcement_idInput


-----------query to delete an announcement-----------
DELETE FROM FROM Announcements where title = :titleInput;
 
-------------------------------------------------------
-------------------------------------------------------


------------------------------------------------------
-------------Places table queries---------------------

 ---------- query to select all places ----------------
SELECT * FROM Places as P
INNER JOIN Addresses as A
ON p.address = a.address_id
WHERE (name = (:nameInput);


------------- query to insert a new place--------------
INSERT INTO `Places` (`active`, `name`, `address`, `website`, `indoor`, `note`) VALUES (:activeInput, :nameInput, :addressInput, :websiteInput, :IndoorInput, :noteInput);


------------- query to update a place -----------------
UPDATE Places
SET `Places` (`active`, `name`, `address`, `website`, `indoor`, `note`) VALUES (:activeInput, :nameInput, :addressInput, :websiteInput, :IndoorInput, :noteInput)
WHERE (name = (:nameInput)

--------------querey to delete a place ----------------
DELETE FROM Places WHERE (name = (:nameInput);
 
------------------------------------------------------
------------------------------------------------------ 

 
------------------------------------------------------
-------------Addresses table queries------------------

---------- query to select all addresses -------------
 
SELECT * FROM Addresses;


--------- query to select a specific address ---------

SELECT * FROM Addresses where address_id = :address_idInput
 

------------- query to insert a new addresss-----------
INSERT INTO `Addresses` (`city`, `state_province`, `country`) VALUES
(:cityInput, :state_provinceInput, :countryInput);



------------- query to delete a new addresss-----------
DELETE FROM Addresses where address_id = :address_idInput



-----------Announcements for specific user-------------

SELECT * from Announcements WHERE announcement_id IN (Select announcement_id FROM Family_Members_Announcements where family_id = (SELECT * FROM Family_Members WHERE (first_name, nick_name, last_name) = (:first_nameInput, :nick_nameInput, :last_nameInput);