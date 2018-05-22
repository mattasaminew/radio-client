import React, { Component } from 'react';
import { Howl } from 'howler';
// import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/audio-context';
import { Icon, Label } from 'semantic-ui-react';
import logo from '../backspin-logo-dj.png';
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
		onpause: () => {this.setState({loading: false, playing: false})},
		onstop: () => {this.setState({loading: false, playing: false, howlId: null})},
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
			onpause: () => {this.setState({loading: false, playing: false})},
			onstop: () => {this.setState({loading: false, playing: false, howlId: null})},
			onplayerror: () => {this.setState({loading: false, playing: false, howlId: null})},
			onloaderror: () => {this.setState({loading: false, playing: false, howlId: null})}
		})
	);

	currentHowl = () => {
		let id = this.state.fileId;
		return this.state.loadedHowls.find((howl) => howl.fileId === id ).howl;
	}

	playLoadedHowl() {
		if (this.currentHowl().state() !== 'loaded') {
			this.setState({loading: true})
		};
		this.currentHowl().play()
	}

	togglePlay = () => {
		if (this.state.playing) {
			this.currentHowl().pause();
		} else {
			this.playLoadedHowl();
		}
	}

	loadLiveStream = () => {
		if (this.state.fileId === null) {
			if (!this.state.loading && !this.state.playing) { this.playLoadedHowl(); }
			return;
		};
		this.currentHowl().stop()
		this.setState({fileId: null}, () => this.playLoadedHowl());
	}

	changeLoadedHowl = (id, source) => {
		if (this.state.fileId === id) { return; };
		this.currentHowl().stop();
		if (this.state.fileId === null) {
			this.currentHowl().unload()
		}
		this.setState((prevState) => ({
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
					<AppLogo loadLiveStream={this.loadLiveStream} />
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
				<img src={logo} alt='logo' />
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

class AudioPlayer extends Component {
	render() {
		return (
			<AudioContext.Consumer>
				{(context) => (
						<div className='audio-player'>
							<div className="play-icon-container" onClick={context.togglePlay}>
								<Icon
									name={context.loading ? 'spinner' : (context.playing ? 'pause' : 'play')}
									size='big'
									loading={context.loading}
									className="player-icon"
								/>
							</div>
							<OnAirDisplay onAir={true} playing={context.playing} />
						</div>
				)}
			</AudioContext.Consumer>
		);
	}
}

function OnAirDisplay(props) {
	return (
		<Label className='on-air-display'>
			<Icon
				name='refresh'
				loading={props.playing}
				style={{color: props.onAir ? 'green' : 'red'}}
			/>
			Live
		</Label>
	);
}

export default App;
