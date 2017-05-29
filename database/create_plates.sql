
-- SQL script for adding attractions

-- If you get Error Code 1175, Go to Edit -> Preferences -> "SQL Editor" -> "Other" -> uncheck "Safe Updates". Then go to Query -> Reconnect to Server

USE `bespist`;

-- Deleting all previous entries
SET FOREIGN_KEY_CHECKS=0;
DELETE FROM `plates`;
SET FOREIGN_KEY_CHECKS=1;

-- Reseting auto_increment
ALTER TABLE `plates` AUTO_INCREMENT = 1;



-- Adding plates
INSERT INTO `plates` (name, content, previewimg, price, category) VALUES ("Squash", "Squash med noe funky hvite greier inni", "/res/forrett1.jpg", "99", "starter"),
                                                                         ("Laks", "Fine røykede lakseskiver, med masse grønt støff oppå", "/res/forrett2.jpg", "149", "starter"),
                                                                         ("Aspargesbacon", "Asparges med bacon rundt. Blir det virkelig bedre?", "/res/forrett3.jpg", "99", "starter"),
                                                                         ("Spaghetti", "Sprudlende spaghetti med masse støff oppi", "/res/hovedrett1.jpg", "199", "main"),
                                                                         ("Hamburger", "Svær hamburger med ost og kjøtt", "/res/hovedrett2.jpg", "299", "main"),
                                                                         ("Spareribs", "Ribber med masse støff på sida", "/res/hovedrett3.jpg", "999", "main"),
                                                                         ("Bløtkake", "Kake med krem og san bbløtkakestøff", "/res/dessert1.jpeg", "599", "dessert"),
                                                                         ("Sjokoladekake", "Sjokoladekake med sjokolade og glassur", "/res/dessert2.jpg", "599", "dessert"),
                                                                         ("Crème Brûlée", "Crème Brûlée med masse Crème og masse Brûlée", "/res/dessert3.jpg", "999", "dessert");
