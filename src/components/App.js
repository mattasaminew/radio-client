import React, { Component } from 'react';
import recordLogo from '../img/logo-record.png';
import '../css/App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false
		};

		this.togglePlay = this.togglePlay.bind(this);
	}
	togglePlay() {
		this.setState((prevState) => { return {
			playing: !prevState.playing
		}})
	}
  render() {
    return (
      <div className="app">
				<div className="app-container">
					<div className="app-header">
						ቀንድ
					</div>
					<AudioPlayer
						playing={this.state.playing}
						togglePlay={this.togglePlay}
					/>
				</div>
      </div>
    );
  }
}

class AudioPlayer extends Component {
	render() {
		return(
			<div className='audio-player'>
				<img src={recordLogo} className={this.props.playing ? "player-indicator active" : "player-indicator"} alt="logo" />
				<div className="play-button" onClick={this.props.togglePlay}>
					{this.props.playing ? 'Pause' : 'Play'}
				</div>
			</div>
		);

	}
}

export default App;
