import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'


var defaultNames = ["theCamelCase", "The Javascript Jerk", "The Mobile Mafioso", "The Dot Net Demolisher", "Hello World of Pain", "The Lorem Ipsum", "Crushing Super Slayer", "He That Makes Losers", "disco Bandit", "helpful boo"]

var TweetModel = Backbone.Model.extend({
	url: "https://twitclone-example.now.sh/api/tweet"
})


var hashParse = function(string) {
	var os = "string "
    var hash = string.match(/#\w+/g)
    if(hash){
    	for (var i=0;i<hash.length;i++){
       	 os += hash[i].slice(1).toLowerCase() + " " 
   	 }
   	}
    return os
}






var WriterView = React.createClass({

	getInitialState: function() {
		return {
			display: "none"
		}
	},

	_toggleSnippet: function(){
		
		this.setState ({
			display: this.state.display === "none" ? "inline-block" : "none",
			
		})
	},

	_logPost: function() {
		var name = document.querySelector(".nameField").value
		var tweet = document.querySelector(".tweetContent").value
		var avatar = document.querySelector(".Uploadimage").value
		var tag = hashParse(tweet)

		console.log(name,tweet,tag)



		if(name === "") {
			var num = Math.floor(Math.random() * 10)
			name = defaultNames[num]
		}

		if(avatar === ""){
			avatar = "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
		}


		if(tweet === ""){
			alert("why didn't you write anything?")
		}
		else {
		var tweetmodel = new TweetModel({
				
			  
			  "content": tweet,
			  "user": {
			    "id": 0,
			    "username": name,
			    "avatarURL": avatar,
			    "createdAt": "2016-11-03T19:59:22.344Z",
			    "tweetId": 0
			  },
			  "replyToTweet": 0,
			  "isRetweet": false,
			   "tags": [
				    {
				      "id": 0,
				      "value": tag,
				      "createdAt": "2016-11-03T19:59:22.344Z",
				      "tweetId": 16
				    }
				  ],
				  "likes": 0,
				  "createdAt": "2016-11-03T19:59:22.344Z"
				
					})

		tweetmodel.save(null,{success:function(){window.location.reload(true)}})
		
		}
	},

		render: function() {
			var inputStyle = {
				display: this.state.display
			}
			return (
				<div className="writer-container">
					<button onClick={this._toggleSnippet}> write a tweet</button> 
					<div className="tweet-input" style={inputStyle}>
						<input className="nameField" placeholder="name" maxLength="14" />
						<input className="tweetContent" type="text" placeholder= "141 characters max" maxLength="141" />
						<input className="Uploadimage" placeholder="imageurl" />
						<button onClick={this._logPost}> post </button>
						<button onClick={this._toggleSnippet}> x </button>
					</div>
				</div>
				)
		}
})



export default WriterView