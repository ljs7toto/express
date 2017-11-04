//해당 포더에 설치 되어 있는 express모듈을 가져옴
const express = require('express');
const port = 80;
const mysql = require('mysql');
const dbInfo = require('./db_info.js');
const bdParse = require('body-parser');

var con = mysql.createConnection(dbInfo);

var expApp = express();
expApp.set("port", port);
expApp.use(bdParse.urlencoded({ extended :false }));
expApp.use(bdParse.json());


var func1 =  function(req,res){
    var id = req.query.id;
    console.log(id + ' 를 요청하셨군요');
    res.send('안녕하세요 ' + id + ' 님');
}


expApp.get("/", func1);
expApp.get("/test", function(req,res){
    res.send('나에게 테스트를 주었구나~');
})


// expApp.get('/user', function(req,res){
//     con.query('select * from user_info', 
//     function(err, rows){

//             if(err) throw err;
//             console.log(rows);
//             var resText = "<table border='1'>";
//             for(var key in rows){
//                 resText+="<tr>";
//                 var row = rows[key];
//                 for(var col in row){
//                     resText += "<td>" + col +":" + row[col] + "</td>";
//                 }
//                 resText += "</tr>";
//             }
//             // res.send(resText);
//             resText += "</table>";
//             res.send(resText);
//     })
// })


var urlrForUserSearch = "/user";
var funcForUserList = function(req,res){
    var userId = req.query.id;
    console.log(userId);
    var userPwd = req.query.pwd;
    console.log(userPwd);

    var resText ="";
    if(!userId){
        res.send("유저 아이디를 입력해주세요.");
    }else if(!userPwd){
        res.send("비밀번호를 입력해주세요.");
    }else{
        var sql = 'select * from user_info where userId=?';
        var values =[userId];
        con.query(sql, values,
        function(err, rows){
            if(err)throw err;
            if(rows.length==0){
                resText = "입력하신 id:" + userId;
                resText += "와 일치하는 id가 없습니다.";
            }else{
                console.log("dbPwd =" + rows[0].userPwd);
                if(userPwd!=rows[0].userPwd){
                    resText = "입력하신 비밀번호가 틀렸습니다."
                }else{
                    resText = userId + "님 환영합니다.";
                }
            } 
            console.log(resText);
            res.send(resText);
        });
    }
    
}

expApp.get(urlrForUserSearch,funcForUserList);
expApp.post(urlrForUserSearch,funcForUserList);
expApp.listen(expApp.get("port")); 
