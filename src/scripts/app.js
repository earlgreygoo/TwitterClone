import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import TweetView from './views/tweetView'

var app = function() {

	//MODEL
	var TweetCollection = Backbone.Collection.extend({
		url: "https://twitclone-example.now.sh/api/tweet"
	})


	var SearchCollection = Backbone.Collection.extend({
		url: "https://twitclone-example.now.sh/api/tweet/search"
	})
	//CONTROLLER
	var Controller = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"search/:term": "handleSearch",
			"*default": "handleDefault",
		},
		handleHome: function(){
			var tweetCollection = new TweetCollection()
			tweetCollection.fetch()
			ReactDOM.render(<TweetView collection={tweetCollection} />, document.querySelector('.container'))
		},

		handleSearch: function(term) {
			var searchCollection = new SearchCollection()
			searchCollection.fetch({
				data: {
					"term": term
				}
			}).then(function(){ReactDOM.render(<TweetView collection={searchCollection} />, document.querySelector('.container'))})
		},
		handleDefault: function() {
			location.hash = "home"
		},

		initialize: function(){
			Backbone.history.start()
		}
	})
	var controller = new Controller()
}
app()