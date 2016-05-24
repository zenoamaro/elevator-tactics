export default {

	lobby: {
		id: 'lobby',
		tileset: 'offices',
		range: [0, 1],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#FFFF55 32px,
			#FFFF55 34px,
			white 34px,
			white 36px,
			#AA0000 36px
		`,
	},

	offices: {
		id: 'offices',
		tileset: 'offices',
		range: [5, Infinity],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#FFFF55 32px,
			#FFFF55 34px,
			white 34px,
			white 36px,
			#5555FF 36px
		`,
	},

	residential: {
		id: 'residential',
		tileset: 'offices',
		range: [1, Infinity],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#FFFF55 32px,
			#FFFF55 34px,
			white 34px,
			white 36px,
			#AA5500 36px
		`,
	},

	'underground-parking': {
		id: 'undergroundParking',
		tileset: 'offices',
		range: [-Infinity, 0],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#FFFF55 32px,
			#FFFF55 34px,
			white 34px,
			white 36px,
			#5555FF 36px
		`,
	},

};
