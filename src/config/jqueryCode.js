import $ from 'jquery';
import Plyr from 'react-plyr';

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
	console.log(videoEl);
	console.log(sourceEl);
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
				setRecord({currentTime, movieID});
			  }
		  }
		
		if (duration - currentTime <= 10) {
			removeRecord(movieID);
		} else {
			setRecord({currentTime, movieID});
			record = getRecord(movieID);
		}
		console.log({currentTime, duration});
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
	return vid.paused;
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

export const setRecord = ({currentTime, movieID}) => {
	let filteredRecords = [];
	let records = localStorage.getItem("records");
	if (records) {
		records = JSON.parse(records);
		filteredRecords = records.filter(recordItem => {
			return recordItem.movieID === movieID;
		})
		console.log(filteredRecords);
	} else {
		records = [];
	}
	if (filteredRecords.length > 0) {
		records = records.map(recordItem => {
			console.log(recordItem.movieID === movieID);
			if (recordItem.movieID === movieID) {
				return {...recordItem, currentTime}
			}
			return recordItem;
		})
	} else {
		records = [...records, {currentTime, movieID}];
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

export const initPlayer = () => {
	/*==============================
	Player
	==============================*/
		if ($('#player').length) {
			const player = new Plyr('#player');
			console.log(player);
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
