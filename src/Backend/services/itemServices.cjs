const fs = require('fs/promises');
const path = require('path')

const filePath = path.join(__dirname, "../data/Book.json")

async function getItems() {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    return data;
}

async function postItems({id, title, genre, year, description}) {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    const newData = {
        id, title, genre, year, description
    }
    if(title.trim() === '' || genre.trim() === '' || isNaN(year) || year <= 0 || year > 2025){
        console.log('Data Tidak Valid')
        return {payload: newData, status: 'fail', message: 'Data Tidak Valid'}
    }
    const checkData = data.some(i => i.title.trim().toLowerCase() === title.trim().toLowerCase());
    if(checkData){
        console.log('Duplikasi Judul')
        return {payload: newData, status: 'duplicated', message: 'Duplikasi Judul'}
    }
    data.push(newData);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return {payload: newData, status: 'success', message: 'Berhasil Menambahkan'}
}

async function putItems({ id, title, genre, year, description }) {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    const newData = {
        id, title, genre, year, description
    }
    if(title.trim() === '' || genre.trim() === '' || isNaN(year) || year <= 0 || year > 2025){
        console.log('Data Tidak Valid')
        return {payload: newData, status: 'fail', message: 'Data Tidak Valid'}
    }
    const checkData = data.some(i => i.title.trim().toLowerCase() === title.trim().toLowerCase() && i.id !== id);
    if(checkData){
        console.log('Duplikasi Judul')
        return {payload: newData, status: 'duplicated', message: 'Duplikasi Judul'}
    }
    const mapData = data.map(i => {
        if(i.id === id){
            return {...newData}
        }
        return i
    })
    await fs.writeFile(filePath, JSON.stringify(mapData, null, 2))
    return {payload: newData, status: 'success', message: 'Berhasil Memperbarui'}
}

async function deleteItems(id) {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    const filterData = data.filter(i => i.id !== id)
    await fs.writeFile(filePath, JSON.stringify(filterData, null, 2))
}

module.exports = {
    getItems, postItems, putItems, deleteItems
}