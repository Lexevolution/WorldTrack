import { Database } from "bun:sqlite";

const db = new Database("./World Visit Lists.sqlite");

export function dbSetup(){
    const tableChecklistSetupQuery = db.query(
        `CREATE TABLE IF NOT EXISTS checklists(
            id TEXT NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            ownedBy TEXT
        );`
    );

    const tableChecklistContentsSetupQuery = db.query(
        `CREATE TABLE IF NOT EXISTS checklistContents(
            checklistID TEXT NOT NULL,
            URI TEXT NOT NULL
        );`
    );

    const tableVisitsSetupQuery = db.query(
        `CREATE TABLE IF NOT EXISTS visits(
            URI TEXT NOT NULL,
            UserID TEXT NOT NULL
        );`
    );

    tableChecklistSetupQuery.run();
    tableChecklistContentsSetupQuery.run();
    tableVisitsSetupQuery.run();
}

const getListNameQuery = db.query(`SELECT * FROM checklists WHERE id IS $inputListID`);
const getListContentsQuery = db.query(`SELECT URI FROM checklistContents WHERE checklistID IS $inputListID`);
export function getList(listID, userID){
    //Grab list name and ownedBy. Check if the ownedBy is from the user retrieving or blank.
    const getListResult = getListNameQuery.get({$inputListID: listID});
    if (userID === getListResult.ownedBy || getListResult.ownedBy == null){
        if (getListResult == null){
            throw new Error("List doesn't exist!");
        }

        const listContents = getListContentsQuery.all({$inputListID: listID});
        return {
            "listName": getListResult.name,
            "worlds": listContents
        }
    }
    else {
        throw new Error("Not authorised to access list");
    }
    //Once that is done, grab and return the list (and maybe the name?)
    // const getListquery = db.query(`SELECT `);
}