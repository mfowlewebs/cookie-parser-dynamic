"use strict"

var cookieParser= require("cookie-parser")

/**
  Cookie Parser Dynamic
  An wrapper middleware around Cookie Parser that can change secret keys.
*/
function cookieParserDynamic(secrets, options){
	var parser
	function cookieParserDynamic(req, res, next) {
		return parser(req, res, next)
	}
	cookieParserDynamic.secrets= function(secrets){
		parser = cookieParser(secrets, options)
	}
	cookieParserDynamic.secrets(secrets)
	return cookieParserDynamic
}

for(var i in cookieParser){
	cookieParserDynamic[i] = cookieParser[i]
}

module.exports = cookieParserDynamic
