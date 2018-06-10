import React, { Component } from 'react';
import { AudioContext } from '../context/audio-context';
import '../css/ShowArchive.css';

class ShowArchive extends Component {
	constructor(props) {
		super(props);
		this.state = {data: null, loading: true}
	}
	componentDidMount() {
		let showId = this.props.slugContext.slugToShowId(this.props.match.params.slug)
		if (this.props.slugContext.slugTable) {
			fetch(process.env.REACT_APP_API_URL + '/shows/' + showId)
				.then( (response) => response.json() )
				.then( (requestData) => this.setState({data: requestData, loading: false}) )
				.catch( (error) => console.log(error) );
		}
	}
	render() {
		const mixesAvailable = this.state.data && this.state.data.episodes.length
		const mixTiles = mixesAvailable ? this.state.data.episodes.map((data, index) =>  <MixTile key={index} data={data}/>) : null
		return(
			<div className='show-archive-container'>
				<h2>{this.state.data ? this.state.data.show.name : null}</h2>
				<div>
					{mixTiles}
				</div>
			</div>
		);
	}
}

class MixTile extends Component {
	render() {
		const sourceLink = process.env.REACT_APP_API_URL + "/episode/" + this.props.data.id;
		return(
			<AudioContext.Consumer>
				{(context) => (
						<div className='show-tile' onClick={() => context.changeLoadedHowl(this.props.data.id, sourceLink)}>
							{this.props.data.track_title}
						</div>
				)}
			</AudioContext.Consumer>
		);
	}
}

export default ShowArchive;
