import React, { Component } from 'react';
import { AudioContext } from '../context/audio-context';
import { Icon, Label } from 'semantic-ui-react';

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

export default AudioPlayer;
