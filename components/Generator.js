const { data } = require("autoprefixer");

import colorTab from './ColorTab'

app.component('generator', {
	components: {
		colorTab
	},

	template:
	/*html*/`
	<script src="./components/ColorTab.js"></script>

	<div class="flex flex-row justify-between">
		<colorTab></colorTab>
		<colorTab></colorTab>
		<colorTab></colorTab>
		<colorTab></colorTab>
		<colorTab></colorTab>
	</div>
	`,

	data() {
		return {
			color1: '',
			color2: '',
			color3: '',
			color4: '',
			color5: ''
		}
	},

	methods: {
		queryColors() {
			var url = "http://colormind.io/api/";
			var data = {
				model : "default",
				input : [[44,43,44],[90,83,82],"N","N","N"]
			}

			var http = new XMLHttpRequest();

			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					var palette = JSON.parse(http.responseText).result;
				}
			}

			http.open("POST", url, true);
			http.send(JSON.stringify(data));
		}
	}
})