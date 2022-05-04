const app = Vue.createApp({
	data() {
		return {
			colors: [
				{color : "#1d2621"},
				{color : "#1d2621"},
				{color : "#1d2621"},
				{color : "#1d2621"},
				{color : "#1d2621"}
			],
			fullPallete: "",
			selectedColor : " ",
			showToast : false
		}
	},

	methods: {
		refreshColors() {
			var url = "http://colormind.io/api/";
			var data = {
				model : "default",
				input : ["N","N","N","N","N"]
			}

			var http = new XMLHttpRequest();

			
			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					var palette = JSON.parse(http.responseText).result;
					for(let i = 0; i < 5; ++i) {
						this.colors[i].color = this.rgbToHex(palette[i][0],palette[i][1],palette[i][2]);
						this.fullPallete = this.fullPallete + " " + this.colors[i].color;
					}
				} else {
					console.log(http.status + " " + http.readyState);
				}
			}.bind(this);

			http.open("POST", url, true);
			http.send(JSON.stringify(data));
		},

		showNotification(hexName) {
			this.selectedColor = hexName;
			this.showToast = true;
			setTimeout(() => this.showToast = false, 3000)
		},

		testStuff() {
			console.log(this.colors[0]);
		},

		rgbToHex(r,g,b) {
			r = r.toString(16);
			g = g.toString(16);
			b = b.toString(16);
		  
			if (r.length == 1)
			  r = "0" + r;
			if (g.length == 1)
			  g = "0" + g;
			if (b.length == 1)
			  b = "0" + b;
		  
			return "#" + r + g + b;
		}
	},

	created() {
        window.addEventListener('keyup', function(e) {
			console.log(e);
			if(e.code == 'Space') {
				this.refreshColors();
			} else if(e.code == 'KeyC') {
				navigator.clipboard.writeText(this.fullPallete);
				this.showNotification("palette");
			}
		}.bind(this), false);
    },

    beforeDestroy() {
        window.removeEventListener('keyup', function(e) {
			if(e.code == 'Space') {
				this.refreshColors();
			}
		}.bind(this), false);
    }
})