import React from 'react'
import ReactDOM from 'react-dom'

var TweetView = React.createClass({
	getInitialState: function() {
		return {
			collection: this.props.collection
		}
	},
    _listenToCollection: function(collection) {
        var currentMeaningOfThis = this
        var updateState = function() {
            currentMeaningOfThis.setState({
                collection: currentMeaningOfThis.props.collection
            })
        }
        collection.on('sync', updateState)
    },
    componentWillMount: function() {
        this._listenToCollection(this.props.collection)
    },
	componentWillReceiveProps: function(newProps) {
        this._listenToCollection(newProps.collection)
    },
	render: function() {
		return (
			<div className="tweet-view">
				<Header />
				<TweetContainer collection={this.state.collection}/>
			</div>
			)
	}
})

var Header = React.createClass({

	_search: function(event){
		if(event.keyCode === 13){
			console.log("searching")
			location.hash = "search/" + event.target.value
			event.target.value = ""
		}
	},
	render: function() {
		return (
			<div className="header">
				<h1> HEY AND argghh </h1>
				<input placeholder="Search tweets" onKeyDown={this._search} />
			</div>
			)
	}
})

var TweetContainer = React.createClass({
	_displayTweets: function() {
		var jsxArr = [],
			tweetCollection = this.props.collection

		for(var i = 0; i < tweetCollection.models.length; i++){
			var tweetModel = tweetCollection.models[i]
			jsxArr.push(<Tweet model={tweetModel} />)
		}
		return jsxArr;
	},
	render: function() {
		return (
			<div className="tweet-container">
				{this._displayTweets()}
			</div>	
			)
	}
})
/*SportsCenter ‏
@SportsCenter
31m31 minutes ago
A look back at the KD-Westbrook beef as told by a high schooler.

 {
    "id": 2,
    "content": "This.",
    "user": {
      "id": 1,
      "username": "ironicdolphin",
      "avatarURL": "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pbs.org%2Fnewshour%2Fwp-content%2Fuploads%2F2014%2F03%2Fdolphin.jpg&f=1",
      "createdAt": "2016-11-05T19:03:29.074864+00:00",
      "tweetId": 2
    },
    "replyToTweet": 1,
    "isRetweet": true,
    "tags": [
      {
        "id": 1,
        "value": "tacos",
        "createdAt": "2016-11-05T19:03:29.081231+00:00",
        "tweetId": 2
      }
    ],
    "likes": 2,
    "createdAt": "2016-11-05T19:03:29.282826+00:00"
  },

 */

var Tweet = React.createClass({
	_getTimeElapsed: function(timeTweetCreated) {
		var then = new Date(timeTweetCreated),
			now = new Date(),
			millisecondsElapsed = (now-then)

		return this._getTimeFromMilliseconds(millisecondsElapsed)
	},
	_getTimeFromMilliseconds: function(milliseconds) {
		var seconds = Math.floor(milliseconds / 1000),
			minutes = Math.floor(seconds / 60),
			hours = Math.floor(minutes / 60),
			days = Math.floor(hours / 24),
			weeks = Math.floor(days / 7)

		if(seconds < 60){
			return seconds + "s"
		} else if(minutes < 60){
			return minutes + "m"
		} else if(hours < 24){
			return hours + "h"
		} else if(days < 7){
			return days + "d"
		} else{
			//replace this with the date tweet was posted
			//'57w', for example, is not helpful
			return weeks + "w"
		}
	},
	render: function() {
		var model = this.props.model
		return (
			<div className="tweet">
				<div className="tweet-header">
					<img src={model.get("user").avatarURL} />
					<strong>{model.get("user").username}</strong>
					<span>{this._getTimeElapsed(model.get("createdAt"))}</span>
				</div>
				<h5>{model.get("content")}</h5> 
			</div>
			)
	}
})

export default TweetView