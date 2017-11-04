const mysql = require('mysql');

const dbInfo = {
    host : 'localhost',
    user : 'root',
    password : 'love2463',
    port : '3306',
    database : 'ang2'
}

var connection = mysql.createConnection(dbInfo);
console.log('디비 접속 시작');
connection.connect(); //DB접속

console.log("user_info select"); //쿼리문 작성
var id = 'tt2';
var pwd = '1';
var sql = "select * from user_info"
sql += " where userid=? and userpwd=?"; //파라미터 바인딩
var values = [id,pwd];
connection.query(sql, values, function( //쿼리문 답 보여주기
 err, rows, fields
){
    if(!err){
        // console.log(rows);
    }else{
        console.log(err);
    }
});

sql = "select ui.*, uh.userdata";
sql += " from user_info as ui,";
sql += " user_his as uh";
sql += " where ui.userno=uh.userno";

var printRows = function(rows){
    if(rows.length==0){
        console.log("검색된 데이터가 없습니다.");
    }else{
        for(var key in rows){
            var row = rows[key];
            for(var col in row){
                console.log("컬럼명 :" + col);
                console.log("데이터 :" + row[col]);
            }
        }
    }
}
connection.query(sql, function( //쿼리문 답 보여주기
    err, rows, fields
   ){
       if(!err){
           printRows(rows);
       }else{
           console.log(err);
       }
   });

//쿼리 종류
console.log("디비 종류");
connection.end();