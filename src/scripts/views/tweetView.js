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
	render: function() {
		return (
			<div className="header">
				<h1> HEY AND STUFF </h1>
				<input type="text" />
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