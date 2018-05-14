import React, { Component } from 'react';
import '../css/ShowArchive.css';

class ShowArchive extends Component {
	constructor(props) {
		super(props);
		this.state = {data: null, loading: true}
	}
	componentDidMount() {
		fetch('http://localhost:3000/shows/' + this.props.match.params.id)
			.then( (response) => response.json() )
			.then( (requestData) => this.setState({data: requestData, loading: false}) )
			.catch( (error) => console.log(error) );
	}
	render() {
		const mixTiles = this.state.data ? this.state.data.map((data, index) =>  <MixTile key={index} data={data}/>) : null
		return(
			<div className='show-archive-container'>
				<h2>{this.state.data ? this.state.data[0].artist_name : null}</h2>
				<div>
					{mixTiles}
				</div>
			</div>
		);
	}
}

class MixTile extends Component {
	render() {
		return(
			<div className='show-tile'>
				{this.props.data.track_title}
			</div>
		);
	}
}

export default ShowArchive;
