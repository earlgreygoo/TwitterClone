import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import TweetView from './views/tweetview'

const app = function() {


var TweetCollection = Backbone.Collection.extend({
		url: "https://twitclone-example.now.sh/api/tweet",
		parse: function(rawResponse){
			
			return rawResponse
		}
	})


var Controller = Backbone.Router.extend({
		routes: {
			'home': 'handleHome',
		},

		handleHome: function(){
			var tweetCollection = new TweetCollection()
			var promise = tweetCollection.fetch({})
			console.log(tweetCollection)
			promise.then(
				function(){
					ReactDOM.render(<TweetView collection={tweetCollection} />, document.querySelector('.container'))
			})


		},
		
		initialize: function(){
			Backbone.history.start()
		}

	})
	var controller = new Controller();
}


app()