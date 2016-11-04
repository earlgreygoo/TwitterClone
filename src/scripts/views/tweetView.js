import React from 'react'
import ReactDOM from 'react-dom'

var TweetView = React.createClass({
	getInitialState: function() {
		return {
			collection: this.props.collection
		}
	},
	componentWillMount: function() {
		var currentMeaningOfThis = this
		var updateState = function(){
			currentMeaningOfThis.setState({
				collection: currentMeaningOfThis.props.collection
			})
		}
		this.props.collection.on("sync", updateState)
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
	render: function() {
		return (
			<div className="header">
				<h1> HEY AND STUFF </h1>
				<input placeholder="Search tweets"/>

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

var Tweet = React.createClass({
	render: function() {
		var model = this.props.model
		return (
			<div className="tweet">
				<h5>{model.get("content")}</h5> 
			</div>
			)
	}
})

export default TweetView