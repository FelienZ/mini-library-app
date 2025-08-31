const { nanoid } = require('nanoid');
const itemServices = require('../services/itemServices.cjs')

exports.getBook = async(req, res)=> {
    const book = await itemServices.getItems();
    res.json(book)
}
exports.addBook = async(req, res)=> {
    try {
        const { title, genre, year, description } = req.body;
        const id = nanoid(16);
        const book = await itemServices.postItems({ id, title, genre, year, description })
        if(book.status !== 'success'){
            return res.status(400).json(book)
        }
        return res.status(201).json(book)
    } catch (error) {
        res.status(500).json({message: `Gagal Menambahkan Buku ${error.message}`})
    }
}
exports.updateBook = async(req, res)=> {
    try {
        const { title, genre, year, description } = req.body;
        const id = req.params.id;
        const book = await itemServices.putItems({ id, title, genre, year, description })
        if(book.status !== 'success'){
            return res.status(400).json(book)
        }
        return res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: `Gagal Memperbarui Buku ${error.message}`})
    }
}
exports.deleteBook = async(req, res)=> {
    const id = req.params.id;
    await itemServices.deleteItems(id)
    res.status(200).json({message: 'Berhasil menghapus'})
}