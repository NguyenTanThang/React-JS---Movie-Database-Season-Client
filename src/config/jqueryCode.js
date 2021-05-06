import $ from 'jquery';
import Plyr from 'react-plyr';
import {measureDeviceWidth} from "../utils/utils";

/**
 * Takes a screenshot from video.
 * @param videoEl {Element} Video element
 * @param scale {Number} Screenshot scale (default = 1)
 * @returns {Element} Screenshot image element
 */
export function getScreenshot(videoURL, scale) {
    scale = scale || 1;

	const videoEl = document.createElement("video");
	const sourceEl = document.createElement("source");
	sourceEl.setAttribute("src", videoURL);
	sourceEl.setAttribute("type", "video/mp4");
	videoEl.innerHTML += sourceEl;
    const canvas = document.createElement("canvas");
    canvas.width = "100px" * scale;
    canvas.height = "100px" * scale;
    canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    const image = new Image()
    image.src = canvas.toDataURL();
    return canvas.toDataURL();
}

export const getCurrentVideoTime = (movieID) => {
	$("#player").on(
		"timeupdate", 
		function(event){
		  const {currentTime, duration} = this;
		  let record = getRecord(movieID);
		  if (record) {
			if (duration - record.currentTime <= 10) {
				removeRecord(movieID);
			  } else {
				setRecord({currentTime, movieID, duration});
			  }
		  }
		
		if (duration - currentTime <= 10) {
			removeRecord(movieID);
		} else {
			setRecord({currentTime, movieID, duration});
			record = getRecord(movieID);
		}
	});
}

export const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

export const playVideo = () => {
	var vid = document.getElementById("player");
	if (vid) {
		vid.play();
	}
}

export const checkVideoStatus = () => {
	var vid = document.getElementById("player");
	if (vid) {
		return vid.paused;
	}
}

export const setCurrentVideoTime = (movieID) => {
	const record = getRecord(movieID);
	if (record) {
		var vid = document.getElementById("player");
		vid.currentTime = record.currentTime;
	}
}

export const getRecord = (movieID) => {
	let records = localStorage.getItem("records");
	let filteredRecords = [];
	if (!records) {
		return null;
	}
	records = JSON.parse(records); 
	filteredRecords = records.filter(recordItem => {
		return recordItem.movieID === movieID;
	})
	return filteredRecords[0];
}

export const removeRecord = (movieID) => {
	let records = localStorage.getItem("records");
	let filteredRecords = [];
	if (!records) {
		return null;
	}
	records = JSON.parse(records); 
	filteredRecords = records.filter(recordItem => {
		return recordItem.movieID !== movieID;
	})
	records = JSON.stringify(filteredRecords);
	localStorage.setItem("records", records);
}

export const setRecord = ({currentTime, movieID, duration}) => {
	let filteredRecords = [];
	let records = localStorage.getItem("records");
	if (records) {
		records = JSON.parse(records);
		filteredRecords = records.filter(recordItem => {
			return recordItem.movieID === movieID;
		})
	} else {
		records = [];
	}
	if (filteredRecords.length > 0) {
		records = records.map(recordItem => {
			if (recordItem.movieID === movieID) {
				return {...recordItem, currentTime, duration}
			}
			return recordItem;
		})
	} else {
		records = [...records, {currentTime, movieID, duration}];
	}
	records = JSON.stringify(records);
	localStorage.setItem("records", records);
}

export const detailBg = () => {
	/*==============================
	Section bg
	==============================*/
	$('.details .details__bg').each( function() {
		if ($(this).attr("databg")){
			$(this).css({
				'background': 'url(' + $(this).data('bg') + ')',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-size': 'cover'
			});
		}
	});
}

export const playerControls = measureDeviceWidth() === "mobile" ? ["progress", "play-large", "play", "rewind", "fast-forward", "current-time", "duration", "captions", "settings", "airplay", "googlecast", "fullscreen"] : ["progress", "play-large", "play", "rewind", "fast-forward", "mute", "volume", "current-time", "duration", "captions", "settings", "pip", "airplay", "googlecast", "fullscreen"]
export const playerControlsSeries = `
<div class="plyr__controls">
<button type="button" class="plyr__control" data-plyr="restart">
	<svg role="presentation"><use xlink:href="#plyr-restart"></use></svg>
	<span class="plyr__tooltip" role="tooltip">Restart</span>
</button>
<button type="button" class="plyr__control" data-plyr="rewind">
	<svg role="presentation"><use xlink:href="#plyr-rewind"></use></svg>
	<span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
</button>
<button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
	<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
	<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
	<span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
	<span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
</button>
<button type="button" class="plyr__control" data-plyr="fast-forward">
	<svg role="presentation"><use xlink:href="#plyr-fast-forward"></use></svg>
	<span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
</button>
<div class="plyr__progress">
	<input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
	<progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
	<span role="tooltip" class="plyr__tooltip">00:00</span>
</div>
<div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
<div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
<button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
	<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
	<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
	<span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
	<span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
</button>
<div class="plyr__volume">
	<input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
</div>

</div>
`
export const playerSettings = ["captions", "speed"];

export const initPlayer = () => {

	const controls = `
		<div class="plyr__controls">
			<button type="button" class="plyr__control" data-plyr="restart">
				<svg role="presentation"><use xlink:href="#plyr-restart"></use></svg>
				<span class="plyr__tooltip" role="tooltip">Restart</span>
			</button>
			<button type="button" class="plyr__control" data-plyr="rewind">
				<svg role="presentation"><use xlink:href="#plyr-rewind"></use></svg>
				<span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
			</button>
			<button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
				<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
				<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
				<span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
				<span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
			</button>
			<button type="button" class="plyr__control" data-plyr="fast-forward">
				<svg role="presentation"><use xlink:href="#plyr-fast-forward"></use></svg>
				<span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
			</button>
			<div class="plyr__progress">
				<input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
				<progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
				<span role="tooltip" class="plyr__tooltip">00:00</span>
			</div>
			<div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
			<div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
			<button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
				<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
				<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
				<span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
				<span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
			</button>
			<div class="plyr__volume">
				<input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
			</div>
			<button type="button" class="plyr__control" data-plyr="captions">
				<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
				<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
				<span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
				<span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
			</button>
			<button type="button" class="plyr__control" data-plyr="fullscreen">
				<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
				<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
				<span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
				<span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
			</button>
		</div>
		`;

	/*==============================
	Player
	==============================*/
		if ($('#player').length) {
			const player = new Plyr('#player', { controls });
		} else {
			return false;
		}
		return false;
}

export const menuNav = () => {
    /*==============================
	Menu
	==============================*/
	$('.header__btn').on('click', function() {
		$(this).toggleClass('header__btn--active');
		$('.header__nav').toggleClass('header__nav--active');
		$('.body').toggleClass('body--active');

		if ($('.header__search-btn').hasClass('active')) {
			$('.header__search-btn').toggleClass('active');
			$('.header__search').toggleClass('header__search--active');
		}
	});
}

export const sectionBG = () => {
	/*==============================
	Section bg
	==============================*/
	$('.section--bg').each( function() {
		if ($(this).attr("data-bg")){
			$(this).css({
				'background': 'url(' + $(this).data('bg') + ')',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-size': 'cover'
			});
		}
	});
}
