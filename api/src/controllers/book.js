var axios = require('axios');
const Book = require('../models/Book')


exports.availableBooks = async(req,res)=>{
    try{
        var books = await Book.find().populate({
            path:'copies',
            match:{
                isOrdered:false
            }
        });
        var availableBooks = books.filter((book)=>{
            return book.copies.length>0;
        })

        return res.json(availableBooks)

    }
    catch(err){
        return res.status(500).json({'err':err.toString()});
    }
}

exports.searchBooks = async(req,res)=>{
    try{
        let key,author;
        const filters = req.query;
        const availablebooks = await axios.get("http://localhost:5000/api/books/availableBooks");
        console.log(availablebooks)
        const filteredBooks = availablebooks.data.filter((book)=>{
            let isValid = true;
            for(key in filters){
                if(key == 'authors'){
                    for(author in book[key]){
                        console.log(filters[key],filters[key]==book.authors[author], book.authors[author])
                        if(filters[key]==book.authors[author]){
                            isValid = isValid && book.authors[author] == filters[key];
                            break;
                        }
                    }
                }
                else{
                    // console.log(key, book[key], filters[key]);
                    isValid = isValid && book[key].toUpperCase() == filters[key].toUpperCase();
                }
            }
            return isValid;
        })
        res.json(filteredBooks);
    }
    catch(err){
        return res.status(500).json({'err':err.toString()})
    }
}
