import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import '../css/Archive.css';

class Archive extends Component {
	constructor(props) {
		super(props);
		this.state = {data: null, loading: true}
	}
	componentDidMount() {
		fetch('http://localhost:3000/shows')
			.then( (response) => response.json() )
			.then( (requestData) => this.setState({data: requestData, loading: false}) )
			.catch( (error) => console.log(error) );
	}
	render() {
		const showTiles = this.state.data ? this.state.data.map((data, index) =>  <ShowTile key={index} data={data} /> ) : null
		return(
			<div>
				{showTiles}
			</div>
		);
	}
}

class ShowTile extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<Link to={'/archive/' + this.props.data.id}>
				<div className='show-tile'>
					{this.props.data.name}
				</div>
			</Link>
		);
	}
}

export default Archive;
