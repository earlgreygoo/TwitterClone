import React from 'react'
import ReactDOM from 'react-dom'
import WriterView from './writerView'
import $ from 'jquery'

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

				<h1> !TWITTER</h1>

				<input placeholder="Search tweets" onKeyDown={this._search} />
				<WriterView />
			</div>
			)
	}
})

var TweetContainer = React.createClass({
	_displayTweets: function() {
		console.log(this.props.collection)
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

	_tweetDelete: function() {
		$.ajax({
    		url: 'https://twitclone-example.now.sh/api/tweet/'+ this.props.model.get("id"),
    		type: 'DELETE',
    		success: function(){window.location.reload(true)}
    		
    
		})

	},


//<h5>{model.get("content")}</h5>
	render: function() {
		var model = this.props.model
		var hashWord = model.get("content").match(/#\w+/g)
		var res = model.get("content").replace(hashWord, "<a href='google.com'>" + hashWord + "</a>")

		return (
			<div className="tweet">
				<img src={model.get("user").avatarURL} />
				
				<h3> {model.get("content")} </h3>
				
				<button onClick={this._tweetDelete}> X </button> 
			</div>
			)
	}
})

export default TweetView