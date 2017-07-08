import * as Datastore from 'nedb';

declare var __dirname;
export const db = new Datastore({filename: __dirname + 'dnd-tv-db', autoload: true});
