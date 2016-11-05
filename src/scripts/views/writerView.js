import React from 'react'
import ReactDOM from 'react-dom'



var WriterView = React.createClass({

	getInitialState: function() {
		return {
			display: "none"
		}
	},

	_toggleSnippet: function(){
		
		console.log("woohoo")
		this.setState ({
			display: this.state.display === "none" ? "inline-block" : "none",
			
		})
	},

		render: function() {
			var inputStyle = {
				display: this.state.display
			}
			return (
				<div className="writer-container">
					<button onClick={this._toggleSnippet}> write a tweet</button> 
					<div className="tweet-input" style={inputStyle}>
						<input type="text" placeholder= "250 characters max!" />
						<button> post </button>
						<button> x </button>
					</div>
				</div>
				)
		}
})



export default WriterView