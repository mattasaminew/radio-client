import React, { Component } from 'react';
import { AudioContext } from '../context/audio-context';
import { Container, Segment, Icon } from 'semantic-ui-react';
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
			<Container className='show-archive-container'>
				<div className='show-archive-tile-container'>
					<div className='show-archive-tile-image'>
						SHOW IMAGE
					</div>
					<div className='show-archive-tile-content'>
						<div className='show-archive-tile-item name'>
							{this.state.data ? this.state.data.show.name : null}
						</div>
						<div className='show-archive-tile-item genre'>
							{this.state.data ? this.state.data.show.genre : null}
						</div>
						<div className='show-archive-tile-item genre'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</div>
					</div>
				</div>
				<div>
					<Segment.Group>
						{mixTiles}
					</Segment.Group>
				</div>
			</Container>
		);
	}
}

class MixTile extends Component {
	render() {
		const sourceLink = process.env.REACT_APP_API_URL + "/episode/" + this.props.data.id;
		return(
			<AudioContext.Consumer>
				{(context) => (
						<Segment className='show-tile' onClick={() => context.changeLoadedHowl(this.props.data.id, sourceLink)}>
							<Icon
								name={context.fileId === this.props.data.id ? 'refresh' : 'file audio'}
								loading={context.playing && (context.fileId === this.props.data.id)}
							/>
							{this.props.data.track_title}
						</Segment>
				)}
			</AudioContext.Consumer>
		);
	}
}

export default ShowArchive;
