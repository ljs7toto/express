//http 모듈을 가져옴
//npm install시 기본적으로 제공하는 모듈이 있고
//package.json에 설정하거나 npm install 명령어로 외부 모듈을 설치하여
//사용할 수 도 있다.
var http = require('http');
console.log('Server openning');


//req 요청객체
//res 응답객체
http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello Http');
}).listen(3000);
console.log('Server running');