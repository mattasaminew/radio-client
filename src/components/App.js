import React, { Component } from 'react';
import { Howl, Howler } from 'howler';
import { Icon } from 'semantic-ui-react';
import '../css/App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			loading: false,
			loadedSound: this.liveStream
		};

		this.togglePlay = this.togglePlay.bind(this);
	}

	liveStream = new Howl({
		src: ['http://airtime.afroasiatic.net:8000/live'],
		ext: ['mp3'],
		html5: true,
		onplay: () => {this.setState({loading: false, playing: true})},
		onpause: () => {this.setState({loading: false, playing: false})},
		onstop: () => {this.setState({loading: false, playing: false})},
		onplayerror: () => {this.setState({loading: false, playing: false})},
		onloaderror: () => {this.setState({loading: false, playing: false})}
	});

	togglePlay() {
		if (this.state.playing) {
			this.state.loadedSound.pause();
		} else {
			this.playLoadedHowl();
		}
	}
	playLoadedHowl() {
		if (this.state.loadedSound.state() !== 'loaded') {
			this.setState({loading: true})
		};
		this.state.loadedSound.play()
	}

	playerIcon = () => {
		if (this.state.loading) {
			return (
				<Icon
					name='circle notched'
					size='huge'
					loading={true}
					className="player-icon"
				/>
			);
		} else {
			if (this.state.playing) {
				return (
					<Icon
						name='pause'
						size='huge'
						className="player-icon"
					/>
				);
			} else {
				return (
					<Icon
						name='play'
						size='huge'
						className="player-icon"
					/>
				);
			}
		}
	}

  render() {

		return (
			<div className='audio-player'>
				<div className="play-icon-container" onClick={this.togglePlay}>
					{this.playerIcon()}
				</div>
			</div>
		);
  }
}

export default App;
