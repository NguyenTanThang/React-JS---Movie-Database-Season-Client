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
	$('.section--bg, .details__bg').each( function() {
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
