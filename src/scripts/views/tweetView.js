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
            console.log(this)
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