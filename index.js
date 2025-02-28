import { runBot } from "./contact.js";
import { dbSetup, getList } from "./db.js";

dbSetup();
getList("testing", "U-test");
//runBot();