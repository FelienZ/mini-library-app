const fs = require('fs/promises');
const path = require('path');
const { Pool } = require('pg');
const pool = new Pool()

async function getItems() {
    const result = await pool.query('SELECT * FROM books ORDER BY title')
    return result.rows;
}

async function postItems({id, title, genre, year, description}) {
    const newData = {
        id, title, genre, year, description
    }
    if(title.trim() === '' || genre.trim() === '' || isNaN(year) || year <= 0 || year > 2025){
        console.log('Data Tidak Valid')
        return {payload: newData, status: 'fail', message: 'Data Tidak Valid'}
    }
    const checkQuery = {
        text: 'SELECT title FROM books WHERE LOWER(title)=LOWER($1)',
        values: [title.trim()]
    }
    const checkResult = await pool.query(checkQuery);
    if(checkResult.rowCount > 0){
        console.log('Duplikasi Judul')
        return {payload: newData, status: 'duplicated', message: 'Duplikasi Judul'}
    }
    const query = {
        text: 'INSERT INTO books (id, title, genre, year, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [id, title, genre, year, description]
    }
    const result = await pool.query(query)
    return {payload: result.rows[0], status: 'success', message: 'Berhasil Menambahkan'}
}

async function putItems({ id, title, genre, year, description }) {
    const newData = {
        id, title, genre, year, description
    }
    if(title.trim() === '' || genre.trim() === '' || isNaN(year) || year <= 0 || year > 2025){
        console.log('Data Tidak Valid')
        return {payload: newData, status: 'fail', message: 'Data Tidak Valid'}
    }
    const checkQuery = {
        text: 'SELECT title FROM books WHERE LOWER(title)=LOWER($1) AND id!=$2',
        values: [title.trim(), id]
    }
    const checkResult = await pool.query(checkQuery);
    if(checkResult.rowCount > 0){
        console.log('Duplikasi Judul')
        return {payload: newData, status: 'duplicated', message: 'Duplikasi Judul'}
    }
    const updateQuery = {
        text: 'UPDATE books SET title=$1, genre=$2, year=$3, description=$4 WHERE id=$5 RETURNING *',
        values: [title, genre, year, description, id]
    }
    const result = await pool.query(updateQuery);
    return {payload: result.rows[0], status: 'success', message: 'Berhasil Memperbarui'}
}

async function deleteItems(id) {
    await pool.query({
        text: 'DELETE FROM books WHERE id=$1',
        values: [id]
    })
}

module.exports = {
    getItems, postItems, putItems, deleteItems
}