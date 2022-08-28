<script lang="ts">

export let width: string = "100%";
export let height: string = "100%";
export let relative: boolean = false;
export let classes: string = "";

const _style = {
	width,
	height,
};
const style = Object
	.keys(_style)
	.map(k => `${k}:${_style[k as keyof typeof _style]};`)
	.join('')
;
const _relative = relative ? "relative" : "absolute";

</script>

<span
	class="skeleton {_relative} rounded {classes}"
	style={style}
></span>

<style>

@keyframes Skeleton {
	0% { background-color: #E1E1E1; }
	50% { background-color: #FAFAFA; }
	100% { background-color: #E1E1E1; }
}

.skeleton {
	animation-name: Skeleton;
	animation-duration: 2s;
	animation-iteration-count: infinite;
}

</style>
