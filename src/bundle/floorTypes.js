export default {

	lobby: {
		id: 'lobby',
		tileset: null,
		range: [0, 1],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#FFFF55 32px,
			#FFFF55 34px,
			#FFFFFF 34px,
			#FFFFFF 36px,
			#AA0000 36px
		`,
	},

	offices: {
		id: 'offices',
		tileset: null,
		range: [5, Infinity],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#FFFF55 32px,
			#FFFF55 34px,
			#FFFFFF 34px,
			#FFFFFF 36px,
			#5555FF 36px
		`,
	},

	residential: {
		id: 'residential',
		tileset: 'residential',
		range: [1, Infinity],
	},

	'underground': {
		id: 'underground',
		tileset: null,
		range: [-Infinity, 0],
		background: `
			#AAAAAA 8px,
			#555555 8px,
			#555555 32px,
			#00AAAA 32px,
			#00AAAA 34px,
			#00AAAA 34px,
			#00AAAA 36px,
			#000000 36px
		`,
	},

};
