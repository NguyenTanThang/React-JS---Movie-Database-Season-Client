import $ from 'jquery';
import Plyr from 'react-plyr';

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
