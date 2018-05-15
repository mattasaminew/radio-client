import React from 'react';

export const AudioContext = React.createContext({
	playing: false,
	loading: false,
	loadedSound: null,
	togglePlay: null,
	playerIcon: null
});
