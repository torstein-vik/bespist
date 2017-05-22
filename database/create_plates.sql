
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
INSERT INTO `plates` (name, content, previewimg, price, category) VALUES ("reker", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "100", "starter"),
                                                                          ("reker1", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "100", "starter"),
                                                                          ("reker2", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "432", "starter"),
                                                                          ("reker3", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "214", "main"),
                                                                          ("reker4", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "6542", "main"),
                                                                          ("reker5", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "6524", "main"),
                                                                          ("reker6", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "54600", "dessert"),
                                                                          ("reker7", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "600", "dessert"),
                                                                          ("reker8", "Nystekte reker i kokende olje, med hvitløk. Blir det bedre?", "/res/placeholder.png", "900", "dessert");
