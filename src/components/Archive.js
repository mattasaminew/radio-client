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
		const showTiles = this.state.data ? this.state.data.map((data, index) =>  <ShowTile key={index} data={data} /> ) : null
		return(
			<Container className='archive-container'>
				{showTiles}
			</Container>
		);
	}
}

class ShowTile extends Component {
	render() {
		return(
			<Link to={'/archive/' + this.props.data.id} className='show-tile-link'>
				<div className='show-tile-container'>
					<div className='show-tile-image'>
						SHOW IMAGE
					</div>
					<div className='show-tile-content'>
						<div>
							{this.props.data.name}
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

export default Archive;
