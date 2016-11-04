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
		var updateState = function() {
			currentMeaningOfThis.setState({
				collection: currentMeaningOfThis.props.collection
			})
		}
		this.props.collection.on("sync",updateState)
		console.log("data from TweetView component:",this.props.collection)
	},
	render: function(){
		return (
			<div className="tweet-view">
				<Header />
				<TweetContainer collection={this.props.collection} />
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
	render: function() {
		return (
			<div className="tweet-container">
				<p> we are getting stuff </p>
			</div>	


			)
	}
})

export default TweetView