import React, { Component } from 'react';
import { Howl } from 'howler';
// import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/audio-context';
import AudioPlayer from './AudioPlayer';
import logo from '../img/backspin-logo-dj.png';
import '../css/App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			loading: false,
			loadedHowl: this.liveStream,
			loadedHowls: [{fileId: null, howl: this.liveStream}],
			fileId: null,
			howlId: null,
			togglePlay: this.togglePlay,
			changeLoadedHowl: this.changeLoadedHowl,
			playerIcon: this.playerIcon
		};
	}

	liveStream = new Howl({
		src: [ process.env.REACT_APP_LIVE_STREAM_URL ],
		ext: ['mp3'],
		html5: true,
		onplay: (id) => {this.setState({loading: false, playing: true, howlId: id})},
		onpause: () => {this.setState({playing: false})},
		onstop: () => {this.setState({playing: false, howlId: null})},
		onplayerror: () => {this.setState({loading: false, playing: false, howlId: null})},
		onloaderror: () => {this.setState({loading: false, playing: false, howlId: null})}
	});

	archiveStream = (source) => (
		new Howl({
			src: [ source ],
			ext: ['mp3'],
			format: ['mp3'],
			html5: true,
			onplay: (id) => {this.setState({loading: false, playing: true, howlId: id})},
			onpause: () => {this.setState({playing: false})},
			onstop: () => {this.setState({playing: false, howlId: null})},
			onplayerror: () => {this.setState({loading: false, playing: false, howlId: null})},
			onloaderror: () => {this.setState({loading: false, playing: false, howlId: null})}
		})
	);

	currentHowl = () => {
		let id = this.state.fileId;
		return this.state.loadedHowls.find((howl) => howl.fileId === id ).howl;
	}

	togglePlay = () => {
		if (this.state.playing) {
			this.currentHowl().pause();
		} else {
			this.setState({loading: true}, () => this.playLoadedHowl());
		}
	}

	playLoadedHowl() {
		this.currentHowl().play()
	}

	loadLiveStream = () => {
		if (this.state.fileId === null) {
			if (!this.state.loading && !this.state.playing) { this.playLoadedHowl(); }
			return;
		};
		this.currentHowl().stop();
		this.setState({loading: true, fileId: null}, () => this.playLoadedHowl());
	}

	changeLoadedHowl = (id, source) => {
		if (this.state.fileId === id) { return; };
		this.currentHowl().stop();
		if (this.state.fileId === null) {
			this.currentHowl().unload();
		}
		this.setState((prevState) => ({
			loading: true,
			fileId: id,
			loadedHowls: prevState.loadedHowls.some((howl) => howl.fileId === id) ?
										prevState.loadedHowls :
										prevState.loadedHowls.concat([{fileId: id, howl: this.archiveStream(source)}])
		}), () => this.playLoadedHowl());
	}

  render() {
		return (
			<AudioContext.Provider value={this.state}>
				<div className='app'>
					<AppLogo/>
					<AppHeader loadLiveStream={this.loadLiveStream} />
					<div className='app-body'>
						{this.props.children}
					</div>
					<AudioPlayer />
				</div>
			</AudioContext.Provider>
		);
  }
}

class AppLogo extends Component {
	render() {
		return (
			<Link to='/' className='app-logo'>
				<img src={logo} alt='logo' className='app-logo-img'/>
			</Link>
		);
	}
}

class AppHeader extends Component {
	render() {
		return (
			<div className='app-header'>
				<div className='header-button'>
					<Link to='/archive' className='header-button-link' >
						ARCHIVE
					</Link>
				</div>
				<div className='header-button'>
					<div onClick={this.props.loadLiveStream}>
						LIVE
					</div>
				</div>
			</div>
		);
	}
}

export default App;
