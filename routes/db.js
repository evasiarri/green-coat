let express = require('express');
let router = express.Router();
// const sql = require('mssql');
var mysql = require('mysql');
import {DB_CONSTS, DB_COLUMN_NAMES} from './../src/resources'


var connection = mysql.createConnection({
        host: DB_CONSTS.SERVER_NAME,
        database: DB_CONSTS.DB_NAME,
        user: DB_CONSTS.USERNAME,
        password: DB_CONSTS.PASSWORD,

    }
);

var pool = mysql.createPool({
        host: DB_CONSTS.SERVER_NAME,
        database: DB_CONSTS.DB_NAME,
        user: DB_CONSTS.USERNAME,
        password: DB_CONSTS.PASSWORD,

    },
);

/* GET users listing. */
// router.get('/order-list', (req, res, next) => {
//     console.log("starting sql server");
//     const pool = sql.ConnectionPool(connectionUserPassAuth);
//     const query = "select * from Customer";
//     new Promise((resolve, reject) => {
//         pool.connect().then(() => {
//             console.log("connected");
//             return pool.request.query(query)
//         })
//             .then(queryRes => queryRes => {
//                 if (queryRes.length > 1) {
//                     let fullArr = [];
//                     queryRes.forEach((result) => {
//                         fullArr = fullArr.concat(result.recordset)
//                     });
//                     resolve(fullArr);
//                 }
//                 else if (queryRes.recordset) {
//                     resolve(queryRes.recordset);
//                 } else reject({status: 200, error: "No results for query"});
//             }).catch((err) => {
//             reject({status: 500, error: err});
//         })
//     }).then(data => {
//         let boardSnOptions = data.map(column => {
//             return column[DB_COLUMN_NAMES.NAME];
//         });
//         res.send({data: new Set(boardSnOptions)});
//         sql.close();
//     }).catch(err => {
//         if (err.status && err.error) {
//             res.status(err.status).send({error: err.error});
//         } else {
//             res.status(500).send({error: err.toString()});
//         }
//         sql.close();
//     });
// });

router.get('/order-list', (req, res, next) => {
    connection.connect(function (err) {
        if (err) console.log(err.message);
        console.log('You are now connected...')
    });
    connection.query("SELECT distinct Ordered.oID, date_format(In_Relation.Time_to_Delivery, '%m/%d/%Y') " +
        "as Time_to_Delivery from Ordered, In_Relation WHERE Ordered.cID=5 AND In_Relation.iID=Ordered.iID", function (err, result) {
        if (err) {
            console.log(err.message);
            res.send({orders: -1})
        }
        console.log(result);
        res.send({orders: result})

    });

});

router.get('/get-stages', (req, res, next) => {
    connection.connect(function (err) {
        if (err) console.log(err.message);
        console.log('You are now connected...')
    });
    connection.query("SELECT Stage.sID, Stage.Name, Stage.Process_Time FROM `Stage`, `Has_Stage`, `Ordered` WHERE Ordered.oID=0 and Has_Stage.iID = Ordered.iID and Stage.siD = Has_Stage.sID ORDER BY sID", function (err, result) {
        if (err) {
            console.log(err.message);
            res.send({stages: null, status: false})
        }
        console.log(result);
        if(result.length <= 0){
            res.send({stages: null, status: false});
            return;
        }
        res.send({stages: result[0].Name, status: true})

    });

});

router.get('/update-stage', (req, res, next) => {
    connection.connect(function (err) {
        if (err) console.log(err.message);
        console.log('You are now connected...')
    });
    // connection.query("SELECT Stage.sID, Stage.Name, Stage.Process_Time FROM `Stage`, `Has_Stage`, `Ordered` WHERE Ordered.oID=0 and Has_Stage.iID = Ordered.iID and Stage.siD = Has_Stage.sID ORDER BY sID", function (err, result) {
    //     if (err) {
    //         console.log(err.message);
    //         res.send({stages: null})
    //     }
    //     console.log(result);
    //     if(result.length <= 0){
    //         res.send({stages: null});
    //         return;
    //     }
    res.send({status: true})

    // });

});

router.get('/current-order-details', (req, res, next) => {
    connection.connect(function (err) {
        if (err) console.log(err.message);
        console.log('You are now connected...');
    });
    console.log(req.headers.order);
    const query = "SELECT distinct date_format(In_Relation.Start_Date, '%m/%d/%Y') as Start_Date, " +
        "date_format(In_Relation.End_Date, '%m/%d/%Y') as End_Date, " +
        "date_format(In_Relation.Stage_Start_Date, '%m/%d/%Y') as Stage_Start_Date, " +
        "date_format(In_Relation.Stage_End_Date, '%m/%d/%Y') as Stage_End_Date " +
        "FROM In_Relation, Ordered " +
        // "WHERE Ordered.oID=" + `${req.orderNumber}`;
        "WHERE Ordered.oID=" + req.headers.order + " AND Ordered.iID=In_Relation.iID AND Ordered.cID=In_Relation.cID";
    console.log(query);
    connection.query(query, function (err, result) {
            if (err) {
                console.log(err.message);
                res.send({startDate: -1, endDate: -1, stageStartDate: -1, stageEndDate: -1})
            }
            console.log(result);
            res.send({
                startDate: result[0].Start_Date,
                endDate: result[0].End_Date,
                stageStartDate: result[0].Stage_Start_Date,
                stageEndDate: result[0].Stage_End_Date
            })
        }
    )

});

router.get('/current-account-details', (req, res, next) => {
    connection.connect(function (err) {
        if (err) console.log(err.message);
        console.log('You are now connected...');
    });
    connection.query("SELECT * FROM Customer WHERE Email=" + req.headers.username, function (err, result) {
        if (err) {
            console.log(err.message);
            res.send({company: -1, name: -1, phone: -1, fax: -1, email: -1})
        }
        console.log(result);
        res.send({
            company: result[0].Company,
            name: result[0].Name,
            phone: result[0].Phone,
            fax: result[0].Fax,
            email: result[0].Email
        })

    })

});


module.exports = router;
