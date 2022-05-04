app.component('color-tab', {
	props: {
		hex: {
			type: String,
			required: true,
			default: "#1d2621"
		}
	},

	data() {
		return {
			colorStyle: {
				backgroundColor: this.hex
			}
		}
	},

	template:
	/*html*/
	`
	<div @click="copy" class="flex flex-col items-center bg-white w-52 h-72 rounded-lg">
		<div class="h-56 m-2 self-stretch bg-black rounded-md" :style="colorStyle"></div> <!--:style="{ color: blue }"-->
		<h2 class="font-bold text-lg tracking-wider">{{ colorStyle.backgroundColor }}</h2>
	</div>
	`,

	methods: {
		copy() {
			navigator.clipboard.writeText(this.hex);
			this.$emit('copy-click', this.hex);
		}
	},

	computed: {
	},

	watch: {
		hex(newVal) {
			this.colorStyle.backgroundColor = this.hex;
		}
	},
})