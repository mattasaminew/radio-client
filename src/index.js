import React from 'react';
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

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route path='/archive/:id' component={ShowArchive}/>
				<Route path='/archive' component={Archive}/>
				<Route exact path='/' component={ViewRootPath} />
				<Route component={View404} />
			</Switch>
		</App>
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
