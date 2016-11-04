import React from 'react'
import ReactDOM from 'react-dom'



var TweetView = React.createClass({
	render: function(){
		console.log("TweetView component", this)
		return (
			<div className="home-view">
				<Header />
				<TweetContainer collection={this.props.collection} />
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
				<h1> !twitter </h1>
				<input placeholder="Search tweets" onKeyDown={this._search} />

			</div>

			)
	}
})

var TweetContainer = React.createClass({
	getInitialState: function() {
		return {
			collection: this.props.collection
		}
	},
	componentWillMount: function() {
		var currentMeaningOfThis = this
		var updateState = function() {
			currentMeaningOfThis.setState({
				collection: currentMeaningOfThis.props.collection
			})
		}
		currentMeaningOfThis.props.collection.on("sync",updateState)
	},
	render: function() {
		return (
			<div className="tweet-container">
				<p> we are getting stuff </p>
			</div>	


			)
	}
})

export default TweetView