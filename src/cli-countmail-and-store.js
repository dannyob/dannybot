/*eslint  no-console: 0, no-unused-vars: 0, no-throw-literal: 0*/

import { get_mail_config } from 'mail';
import sqlite from 'sqlite3';
import Q from 'q';

const DEBUG = 0;

let db = load_database();
console.log(db);

// promisify sqlite
let dbrun = Q.nbind(db.run, db);
let dbget = Q.nbind(db.get, db);

if (DEBUG) {
    process.on('unhandledRejection', function(reason, p) {
        console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });
    db.on('trace', function (a)  { console.log(a); } );
}


function load_database(db_path) {
    if (!db_path) {
        db_path = process.env['HOME'] + '/.local/share/dannybot/history2.db';
    }
    let db = new sqlite.Database(db_path);
    return db;
}

async function create_database(should_droptable) {
    if (should_droptable) {
        await dbrun('drop table if exists searchpatterns');
        await dbrun('drop table if exists mailcounts');
    }
    await dbrun(`CREATE TABLE IF NOT EXISTS searchpatterns (
                searchpattern_id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                searchterms TEXT NOT NULL,
                is_message BOOLEAN,
                UNIQUE(searchterms, is_message)
                )`);
    await dbrun(`CREATE TABLE IF NOT EXISTS mailcounts (
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                count INTEGER,
                searchpattern INTEGER,
                FOREIGN KEY(searchpattern) REFERENCES searchpatterns(searchpattern_id)
                );`);
}

async function id_or_create_searchpattern(o) {
    let row = await dbget('SELECT searchpattern_id, name FROM searchpatterns WHERE (searchterms = $terms AND is_message = $ism) LIMIT 1', { $terms : o.search_terms, $ism : o.message_only });
    if (!row) {
        await dbrun('INSERT INTO searchpatterns (name, searchterms, is_message) VALUES ($name,$search,$message)', { $name: o.description, $search : o.search_terms, $message : o.message_only });
        row = await dbget('SELECT searchpattern_id, name FROM searchpatterns WHERE (searchterms = $terms AND is_message = $ism) LIMIT 1', { $terms : o.search_terms, $ism : o.message_only });
        if (!row) { throw new Error('Could not create insert new search pattern'); }
    }
    if (row.name !== o.description) { throw new Error('Name does not match description in database'); }
    return row.searchpattern_id;
}

async function test_id_or_c() {
    await dbrun('INSERT INTO searchpatterns (name, searchterms, is_message) VALUES ("inbox", "tag:inbox", 1);');
let o = { 'description' : 'inbox', 'message_only' : 1, 'search_terms' : 'tag:inbox' };
    let p = await id_or_create_searchpattern(o);
    console.log(p);
}


async function main() {
    await create_database(0);

    let config = await get_mail_config();

    console.log('config:',config);
    for (let i in config) {
        console.log('search:', config[i].search_terms);
        let id = await id_or_create_searchpattern(config[i]);
        console.log('id:',id);
        let count = await config[i].count();
        console.log('count:', count);
        await dbrun('INSERT INTO mailcounts (searchpattern,count) VALUES ($id,$count);', { $id: id, $count: count });
    }
}

let mainpromise = main();
