const mysql = require('mysql');

const dbconf = {
    host: "localhost",
    user: "event",
    password: "event",
    database: "project2"
};


function addevent(event,done) {

    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("insert into eventlist (serial, date, month, year, event) values('" + event.s + "','" + event.d + "','" + event.m + "','" + event.y + "','" + event.e + "');",
        function (err, rows, fields) {

            if (err) {

                done("NotExist");
                throw err;

            }

            done(rows);
        })
}

function showevent(done) {

    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("select * from eventlist;",
        function (err, rows, fields) {

            if (err) {
                done("NotExist");
                throw err;
            }
            done(rows);
        })
}

function delete_event(event,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
    conn.query("delete from eventlist where serial=" + event.s + ";",
        function (err, rows, fields) {
            if (err) {
                done("NotExist");
                throw err;
            }
            done(rows);
        })
}

module.exports = {
    addevent,
    showevent,
    delete_event
}
