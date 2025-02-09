import { Database } from "bun:sqlite";

const db = new Database("./World Lists.sqlite");

function dbSetup(){
    const tableChecklistSetupQuery = db.query(
        `CREATE TABLE IF NOT EXISTS Checklists(
            id TEXT NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            ownedBy TEXT
        );`
    );

    const tableChecklistContentsSetupQuery = db.query(
        `CREATE TABLE IF NOT EXISTS ChecklistContents(
            checklistID TEXT NOT NULL,
            URI TEXT NOT NULL
        );`
    );

    const tableVisitsSetupQuery = db.query(
        `CREATE TABLE IF NOT EXISTS Visits(
            URI TEXT NOT NULL,
            UserID TEXT NOT NULL
        );`
    );

    db.run(tableChecklistSetupQuery);
    db.run(tableChecklistContentsSetupQuery);
    db.run(tableVisitsSetupQuery);
}