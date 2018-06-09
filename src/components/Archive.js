import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import '../css/Archive.css';

class Archive extends Component {
	constructor(props) {
		super(props);
		this.state = {data: null, loading: true}
	}
	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + '/shows')
			.then( (response) => response.json() )
			.then( (requestData) => this.setState({data: requestData, loading: false}) )
			.catch( (error) => console.log(error) );
	}
	render() {
		const showTiles = this.state.data ? this.state.data.map((data, index) =>  <ShowTile key={index} data={data} slugContext={this.props.slugContext}/> ) : null
		return(
			<Container className='archive-container'>
				{showTiles}
			</Container>
		);
	}
}

class ShowTile extends Component {
	render() {
		const slugName = this.props.slugContext.slugTable ? this.props.slugContext.showIdToSlug(this.props.data.id) : this.props.data.id
		return(
			<Link to={'/archive/' + slugName} className='show-tile-link'>
				<div className='show-tile-container'>
					<div className='show-tile-image'>
						SHOW IMAGE
					</div>
					<div className='show-tile-content'>
						<div className='show-tile-item name'>
							{this.props.data.name}
						</div>
						<div className='show-tile-item genre'>
							{this.props.data.genre}
						</div>
						<div className='show-tile-item genre'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

export default Archive;
