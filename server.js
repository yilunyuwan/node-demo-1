// 这些代码就是服务器代码，一般放在服务器上

var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

/*
path 就是不带查询参数的路径 / x
query 是查询参数的对象形式 { a: '1' }
queryString 是查询参数的字符串形式 ? a = 1
pathWithQuery 是带查询参数的路径，一般不用
request 是请求对象
response 是相应对象
*/
var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if (path === '/') {
    // 如果是已知路径，一律返回 200；如果是未知路径，一律返回 404
    response.statusCode = 200
    // Content - Type 表示内容的 1类型;2语法
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // response.write() 写返回的内容
    response.write(`
    <link rel="stylesheet" href="./style">
    <h1>你好</h1>
    `)
    // response.end() 表示将响应发给用户
    response.end()
  } else if (path === '/style') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`h1{color: red;}`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


