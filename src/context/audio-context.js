import React from 'react';

export const AudioContext = React.createContext({
	playing: false,
	loading: false,
	loadedHowls: [],
	fileId: null,
	howlId: null,
	togglePlay: null,
	playerIcon: null
});
