import React from 'react'
import ReactDOM from 'react-dom'
import Header from './header'

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

var TweetContainer = React.createClass({
	getInitialState: function() {
		return {
			collection: this.props.collection,
			numberTweetsToDisplay: 0,
			displayButton: "block"
		}
	},
	_calculateRemainingTweets: function () {
		var numTweets = this.state.numberTweetsToDisplay,
			totalTweets = this.state.collection.length
		
		return (numTweets + 5 <= totalTweets ? numTweets + 5 : totalTweets)
	},
    _listenToCollection: function(collection) {
        var currentThis = this
        var updateState = function() {
            currentThis.setState({
                collection: currentThis.props.collection,
                numberTweetsToDisplay: currentThis._calculateRemainingTweets()
            })
        }
        collection.on('update', updateState)
    },
    componentWillMount: function() {
        this._listenToCollection(this.props.collection)
    },
	_displayTweets: function() {
		var jsxArr = [],
			tweetCollection = this.props.collection,
			numTweetsToDisplay = this.state.numberTweetsToDisplay

		for(var i = 0; i < numTweetsToDisplay; i++){
			var tweetModel = tweetCollection.models[i]
			if(tweetModel.get("user")){
				jsxArr.push(<Tweet model={tweetModel} />)
			}
		}
		return jsxArr;
	},
	_displayMoreTweets: function() {
		this.setState({
			numberTweetsToDisplay: this._calculateRemainingTweets()
		})
	},
	_getRemainingTweets: function() {
		var numTweets = this.state.numberTweetsToDisplay,
			totalTweets = this.state.collection.length,
			numToShow = 5

		if(numTweets + 5 >= totalTweets){
			numToShow = totalTweets % numTweets
		}
		return "Show " + numToShow + " more tweets"
	},
	render: function() {
		var moreTweetsButton = {
			display: this.state.displayButton
		}
		console.log("numberTweets:",this.props.collection.models.length)
		console.log("numberTweetstoShow:",this.state.numberTweetsToDisplay)
		return (
			<div className="tweet-container">
				{this._displayTweets()}
				<button style={moreTweetsButton} onClick={this._displayMoreTweets}>
					{this._getRemainingTweets()}
				</button>
			</div>	
			)
	}
})

var Tweet = React.createClass({
	_getAvatarUrl: function() {
		var model = this.props.model
		if(model.get("user").hasOwnProperty("avatarURL") &&
			model.get("user").avatarURL.match(/(com|org|net)\g/)){
			return model.get("user").avatarURL
		} else {
			return "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
		}
	},
	_getUsername: function() {
		var model = this.props.model
		if(model.get("user").hasOwnProperty("username")){
			return model.get("user").username
		} else {
			return "Unknown"
		}
	},
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
					<img src={this._getAvatarUrl()} />
					<strong>{this._getUsername()}</strong>
					<span>{this._getTimeElapsed(model.get("createdAt"))}</span>
				</div>
				<h5>{model.get("content")}</h5> 
				<div className="tweet-nav">
					<span>{"replies " + model.get("replyToTweet")}</span>
					<span>{"likes " + model.get("likes")}</span>
				</div>
			</div>
			)
	}
})

export default TweetView