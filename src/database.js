import { Pool } from 'pg'

export const pool = new Pool({
    host: 'ec2-3-208-157-78.compute-1.amazonaws.com',
    user: 'igrhdkqeuvmjrw',
    password: 'e7f2d01540ea62b9453158e58bc2510ddbd629b94ae763f45b164211e39be267',
    database: 'ddh307bp4q9qok',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})