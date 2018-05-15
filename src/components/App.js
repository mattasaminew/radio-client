import React, { Component } from 'react';
import { Howl } from 'howler';
// import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/audio-context';
import { Icon, Label } from 'semantic-ui-react';
import '../css/App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			loading: false,
			loadedSound: this.liveStream,
			togglePlay: this.togglePlay,
			playerIcon: this.playerIcon
		};
	}

	liveStream = new Howl({
		src: ['http://afroasiatic.net:8000/live'],
		ext: ['mp3'],
		html5: true,
		onplay: () => {this.setState({loading: false, playing: true})},
		onpause: () => {this.setState({loading: false, playing: false})},
		onstop: () => {this.setState({loading: false, playing: false})},
		onplayerror: () => {this.setState({loading: false, playing: false})},
		onloaderror: () => {this.setState({loading: false, playing: false})}
	});

	playLoadedHowl() {
		if (this.state.loadedSound.state() !== 'loaded') {
			this.setState({loading: true})
		};
		this.state.loadedSound.play()
	}

	togglePlay = () => {
		if (this.state.playing) {
			this.state.loadedSound.pause();
		} else {
			this.playLoadedHowl();
		}
	}

  render() {
		return (
			<AudioContext.Provider value={this.state}>
				<div className='app'>
					<div className='app-header'>
						<div className='header-button'>
							<Link to='/archive' className='header-button-link' >
								ARCHIVE
							</Link>
						</div>
						<div className='header-button'>
							<Link to='/' className='header-button-link' >
								LIVE
							</Link>
						</div>
					</div>
					<div className='app-body'>
						{this.props.children}
					</div>
					<AudioPlayer />
				</div>
			</AudioContext.Provider>
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
