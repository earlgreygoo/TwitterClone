import React from 'react'

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
				<a href="#home">
					<h1>Twitter</h1>
				</a>
				<input placeholder="Search tweets" onKeyDown={this._search} />
			</div>
			)
	}
})

export default Header