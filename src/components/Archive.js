import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import '../css/Archive.css';

class Archive extends Component {
	constructor(props) {
		super(props);
		this.state = {data: null, loading: true}
	}
	componentDidMount() {
		fetch('http://api.afroasiatic.net/shows')
			.then( (response) => console.log(response) )
			.catch( (error) => console.log(error) );
	}
	render() {
		return(
			<div>
				ARCHIVE
			</div>
		);
	}
}

export default Archive;
