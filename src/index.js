import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import Archive from './components/Archive';
import ShowArchive from './components/ShowArchive';
import View404 from './components/View404';
import ViewRootPath from './components/ViewRootPath';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slugTable: null,
			showIdToSlug: this.showIdToSlug,
			slugToShowId: this.slugToShowId
		};
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + '/shows')
			.then( (response) => response.json() )
			.then( (json) => this.mapSlugTable(json) )
			.then( (mappedJson) => this.setState({slugTable: mappedJson}) )
			.catch( (error) => console.log('Slug table for routing could not load', error) );
	}

	mapSlugTable = (arr) => {
		return arr.map((object) => { return {
			showId: object.id,
			slugName: object.name.toLowerCase().replace(/[\s]/, '-').replace(/[^a-z0-9-]/g, '')
		}})
	}

	showIdToSlug = (id) => {
		let table = this.state.slugTable ? this.state.slugTable.find((item) => item.showId === id) : null
		return table ? table.slugName : id
	}

	slugToShowId = (slug) => {
		let table = this.state.slugTable ? this.state.slugTable.find((item) => item.slugName === slug) : null
		return table ? table.showId : slug
	}

	render() {
		return (
			<Router>
				<App>
					<Switch>
						<Route path='/archive/:slug' component={ (props) =>
							<ShowArchive {...props} slugContext={this.state}/>
						}/>
						<Route path='/archive/' component={ (props) =>
							<Archive {...props} slugContext={this.state}/>
						}/>
						<Route exact path='/' component={ViewRootPath} />
						<Route component={View404} />
					</Switch>
				</App>
			</Router>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
