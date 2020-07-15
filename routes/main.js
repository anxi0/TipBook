module.exports = (app, Tip, fs) => {
    // [GATE]
    app.get("/", (req, res) => {
        sess = req.session;
        res.render("gate.html");
    });
    //[LOGIN]
    app.get("/login", (req, res) => {
        res.render("login.html");
    });
    app.post("/login", (req, res) => {
        var sess;
        sess = req.session;
        var id = req.body.username;
        var pw = req.body.password;
        fs.readFile(__dirname + "/../data/user.json", "utf8", (err, data) => {
            var users = JSON.parse(data);
            if (users[id]["password"] === pw) {
                sess.username = id;
                sess.name = users[id]["name"];
                res.redirect("/tips")
            } else {
                res.status(401).render("warning.html");
            }
        });

    });

    //[CREATE]
    app.post("/tips/list", (req, res) => {
        var tip = new Tip();
        tip.title = req.body.title;
        tip.category = req.body.category;
        tip.star = req.body.star;
        tip.published_date = new Date(req.body.published_date);

        tip.save((err) => {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }
            res.json({ result: 1 });
        })
    });

    //[RETRIEVE]
    app.get("/tips/:tip_id", (req, res) => {
        Tip.findOne({ _id: req.params.tip_id }, (req, tip) => {
            if (err) return res.status(500).json({ error: err });
            if (!tip) return res.status(404).json({ error: 'book not found' });
            res.json(tip);
        });
    });
    app.get("/tips/:category", (req, res) => {
        res.send();
    });

    //[MODIFY]
    app.put("/tips/:tip_id", (req, res) => {
        res.send();
    });

    //[DELETE]
    app.delete("/tips/:tip_id", (req, res) => {
        res.send();
    });


    // [MAIN]
    app.get("/tips", (req, res) => {
        sess = req.session;
        var name = sess.name;
        var title;
        var index;
        var tipsTemplate = `<button class="collapsible">${title}</button><div class="content">
        <p>${index}</p>
    </div>`
        if (name) {
            res.render('main.html')
            /*Tip.find(function (err, tips) {
                if (err) return res.status(500).send({ error: 'db failure' });
                
                res.json(tips);
            });*/
        } else {
            res.render("warning.html")
        }
        res.end();
    });

    //[LOGOUT]
    app.get('/logout', function (req, res) {
        sess = req.session;
        if (sess.username) {
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            })
        } else {
            res.redirect('/');
        }
    })
}