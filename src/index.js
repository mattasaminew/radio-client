import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import Archive from './components/Archive';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<App>
			<Route path='/archive' component={Archive}/>
		</App>
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
