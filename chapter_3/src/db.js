import {databaseSync} from 'node:sqlite';

const db = new databaseSync(':memory:')

// Execute SQL statements from strings;
