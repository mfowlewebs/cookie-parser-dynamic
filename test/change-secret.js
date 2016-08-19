var assert = require("assert")
var cookieParser = require("..")
var http = require("http")
var request = require("supertest")
var signature = require("cookie-signature")

describe("change secrets", function() {
	describe('when a secret is given', function(){
		var val = signature.sign('foobarbaz', 'keyboard cat');
		// TODO: "bar" fails...

		it('should populate req.signedCookies', function(done){
			request(server)
			.get('/signed')
			.set('Cookie', 'foo=s:' + val)
			.expect(200, '{"foo":"foobarbaz"}', done)
		})
	})

	describe('when multiple secrets are given', function () {
		it('should populate req.signedCookies', function (done) {
			request(createServer(['keyboard cat', 'nyan cat']))
			.get('/signed')
			.set('Cookie', 'buzz=s:foobar.N5r0C3M8W+IPpzyAJaIddMWbTGfDSO+bfKlZErJ+MeE; fizz=s:foobar.JTCAgiMWsnuZpN3mrYnEUjXlGxmDi4POCBnWbRxse88')
			.expect(200, '{"buzz":"foobar","fizz":"foobar"}', done)
		})
	})
})


function createserver(secret) {
	var _parser = cookieparser(secret)
	return http.createserver(function(req, res){
		_parser(req, res, function(err){
			if (err) {
				res.statuscode = 500
				res.end(err.message)
				return
			}

			var cookies = '/signed' === req.url
				? req.signedcookies
				: req.cookies
			res.end(json.stringify(cookies))
		})
	})
}
