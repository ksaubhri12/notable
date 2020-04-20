var ObjectID = require('mongodb').ObjectID;

module.exports = function (app,db) {

    app.post("/notes",(req,res) => {
            const notes = {'title':req.body.title,'body':req.body.body};
            db.collection('notes').insert(notes,(err,results)=>{
                if (err)
                    return res.send(err.message);
                else
                    res.send((results.ops[0]));
            });
        }
    );

    app.get("/notes/:id",(req,res) => {
            const id = req.params.id;
            const details = {'_id':new ObjectID(id)};
            db.collection('notes').findOne(details,(err,items) => {
                if (err)
                    return res.send(err.message);
                else
                    res.send(items);
            })


        }
    );

    app.delete("/notes/:id",(req,res) => {
        const id = req.params.id;
        const details = {"_id":new ObjectID(id)};
        db.collection('notes').remove(details,(err,item) => {
            if (err)
                return res.send(err.message);
            else
                res.send("Note "+id +" deleted");
        })
    });

    app.put("/notes/:id",(req,res) => {
        const id = req.params.id ;
        const details = {"_id": new ObjectID(id)};
        const notes = {"title":req.body.title,
                        'body':req.body.body};
        db.collection('notes').update(details,notes,(err,results) => {
            if (err)
                return res.send(err.message);
            else
                return res.send(notes);
        })
    })
};


