import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/backspin-logo-dj.png';
import '../css/AppHeader.css';

const AppLogo = () => {
	return (
		<Link to='/' className='app-logo'>
			<img src={logo} alt='logo' className='app-logo-img'/>
		</Link>
	);
}

class AppHeader extends Component {
	render() {
		return (
			<div className='app-header-container'>
				<AppLogo />
				<div className='header-buttons-container'>
					<div className='header-button' onClick={this.props.loadLiveStream}>
						<a className='header-button-link'>
							LIVE
						</a>
					</div>
					<div className='header-button'>
						<Link to='/archive' className='header-button-link' >
							ARCHIVE
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default AppHeader;
