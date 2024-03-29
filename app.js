const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const d = new Date();

app.get('/' , (req , res) =>{
    Item.find({}, function(err, foundItems){
        res.render("list", {newListItem: foundItems});
    });
});

app.post('/', (req, res) => {
    const itemName = req.body.n;
    const item = new Item({
        name: itemName
    });
    item.save();
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        }
    });
});

app.listen(3000, () => {
    console.log('app listening on port 3000...');
});
