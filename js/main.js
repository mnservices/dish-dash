$(document).ready(function($) {

	"use strict";

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});
	};
	carousel();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.ftco-number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();
	
	

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('#m_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});
	$('#m_time').timepicker();



});

const botToken = '7273224634:AAED35i2B77a-ecjSKIBkWpTVEjZlpKdDIQ';
const chatId = '344614715';

function getUserInfo() {
    const ipApiUrl = 'https://api.ipify.org?format=json';

    return fetch(ipApiUrl)
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const userAgent = navigator.userAgent;
            const dateTime = new Date().toLocaleString();

            return { ipAddress, userAgent, dateTime };
        });
}

function sendToTelegram(message) {
    getUserInfo().then(userInfo => {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const fullMessage = `\n\nDISH & DINE${message}\n\nIP: ${userInfo.ipAddress}\n\nUser Agent: ${userInfo.userAgent}\n\nDatetime: ${userInfo.dateTime}`;
        const data = {
            chat_id: chatId,
            text: fullMessage,
            parse_mode: 'Markdown'
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}

function bookData(event){
	event.preventDefault(); 

	const m_fname = document.getElementById('m_fname').value.trim();
	const m_lname = document.getElementById('m_lname').value.trim();
	const m_people = document.getElementById('m_people').value.trim();
	const m_phone = document.getElementById('m_phone').value.trim();
	const m_date = document.getElementById('m_date').value.trim();
	const m_time = document.getElementById('m_time').value.trim();
	const m_message = document.getElementById('m_message').value.trim();

    if (m_fname === '' || m_lname === '' || m_people === '' || m_phone === '' || m_date === '' || m_time === '' || m_message === '') {
        alert('Please fill in all the fields.');
        return; 
    }
    sendToTelegram(`FOOD ORDER\n\nFirst name:${m_fname}\nLast name:${m_lname}\nHow many people:${m_people}\nPhone number:${m_phone}\nDate:${m_date}\nTime:${m_time}\nMessage:${m_message}`);
	document.getElementById('form1').reset();
	setTimeout(function() {
		window.location.reload(); 
	}, 2000); // Reloads the page after 3 seconds
	
}

function bookDat(event){
	event.preventDefault(); 

	const name = document.getElementById('name').value.trim();
	const phone = document.getElementById('phone').value.trim();
	const message = document.getElementById('message').value.trim();

    if (name === '' || phone === '' || message === '') {
        alert('Please fill in all the fields.');
        return; 
    }
    sendToTelegram(`\n\nENQUIRY\n\nName:${name}\nPhone:${phone}\nMessage:${message}`);
	document.getElementById('ff2').reset();
	setTimeout(function() {
		window.location.reload(); 
	}, 2000); // Reloads the page after 3 seconds
	
}
