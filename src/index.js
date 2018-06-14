import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import App from './components/App';
import Archive from './components/Archive';
import ShowArchive from './components/ShowArchive';
import View404 from './components/View404';
import RootPathView from './components/RootPathView';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function LoadingScreen() {
	return (
		<div className='loading-screen'>
			<h2>LOADING</h2>
			<Icon
				name='spinner'
				size='huge'
				loading
				className="loading-screen-icon"
			/>
		</div>
	);
}

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			slugTable: null,
			showIdToSlug: this.showIdToSlug,
			slugToShowId: this.slugToShowId
		};
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + '/client/slug_table')
			.then( (response) => response.json() )
			.then( (json) => this.setState({slugTable: json, loading: false}) )
			.catch( (error) => console.log('Slug table for routing could not load', error) );
	}

	showIdToSlug = (id) => {
		let table = this.state.slugTable ? this.state.slugTable.find((item) => item.id === id) : null
		return table ? table.slug_name : id
	}

	slugToShowId = (slug) => {
		let table = this.state.slugTable ? this.state.slugTable.find((item) => item.slug_name === slug) : null
		return table ? table.id : slug
	}

	render() {
		return (
			this.state.loading ?

			<LoadingScreen/>
			:
			<Router>
				<App>
					<Switch>
						<Route path='/archive/:slug' component={ (props) =>
							<ShowArchive {...props} slugContext={this.state}/>
						}/>
						<Route path='/archive/' component={ (props) =>
							<Archive {...props} slugContext={this.state}/>
						}/>
						<Route exact path='/' component={RootPathView} />
						<Route component={View404} />
					</Switch>
				</App>
			</Router>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
