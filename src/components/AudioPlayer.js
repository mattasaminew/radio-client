import React, { Component } from 'react';
import { AudioContext } from '../context/audio-context';
import { Icon, Label } from 'semantic-ui-react';
import '../css/AudioPlayer.css';

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
							<OnAirDisplay context={context} />
						</div>
				)}
			</AudioContext.Consumer>
		);
	}
}

function OnAirDisplay(props) {
	const liveStream = props.context.fileId === null;
	return (
		<Label className='on-air-display'>
			<Icon
				name={liveStream ? 'refresh' : 'file audio outline'}
				loading={liveStream && props.context.playing}
				style={{color: 'green'}}
			/>
			{liveStream ? 'LIVE' : 'ARCHIVE'}
		</Label>
	);
}

export default AudioPlayer;
