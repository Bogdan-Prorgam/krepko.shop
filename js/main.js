/* ===================================================================
 * Stellar - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
	"use strict";

	var cfg = {
			scrollDuration: 800, // smoothscroll duration
			mailChimpURL:
				"https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc", // mailchimp url
		},
		$WIN = $(window);

	// Add the User Agent to the <html>
	// will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute("data-useragent", navigator.userAgent);

	// svg fallback
	if (!Modernizr.svg) {
		$(".header-logo img").attr("src", "images/logo.png");
	}

	/* Preloader
	 * -------------------------------------------------- */
	var clPreloader = function () {
		$("html").addClass("cl-preload");

		$WIN.on("load", function () {
			//force page scroll position to top at page refresh
			$("html, body").animate({ scrollTop: 0 }, "normal");

			// will first fade out the loading animation
			$("#loader").fadeOut("slow", function () {
				// will fade out the whole DIV that covers the website.
				$("#preloader").delay(300).fadeOut("slow");
			});

			// for hero content animations
			$("html").removeClass("cl-preload");
			$("html").addClass("cl-loaded");
		});
	};

	/* Move header
	 * -------------------------------------------------- */
	var clMoveHeader = function () {
		var hero = $(".page-hero"),
			hdr = $("header"),
			triggerHeight = hero.outerHeight() - 170;

		$WIN.on("scroll", function () {
			var loc = $WIN.scrollTop();

			if (loc > triggerHeight) {
				hdr.addClass("sticky");
			} else {
				hdr.removeClass("sticky");
			}

			if (loc > triggerHeight + 20) {
				hdr.addClass("offset");
			} else {
				hdr.removeClass("offset");
			}

			if (loc > triggerHeight + 150) {
				hdr.addClass("scrolling");
			} else {
				hdr.removeClass("scrolling");
			}
		});

		// $WIN.on('resize', function() {
		//     if ($WIN.width() <= 768) {
		//             hdr.removeClass('sticky offset scrolling');
		//     }
		// });
	};

	/* Mobile Menu
	 * ---------------------------------------------------- */
	var clMobileMenu = function () {
		var toggleButton = $(".header-menu-toggle"),
			nav = $(".header-nav-wrap");

		toggleButton.on("click", function (event) {
			event.preventDefault();

			toggleButton.toggleClass("is-clicked");
			nav.slideToggle();
		});

		if (toggleButton.is(":visible")) nav.addClass("mobile");

		$WIN.on("resize", function () {
			if (toggleButton.is(":visible")) nav.addClass("mobile");
			else nav.removeClass("mobile");
		});

		nav.find("a").on("click", function () {
			if (nav.hasClass("mobile")) {
				toggleButton.toggleClass("is-clicked");
				nav.slideToggle();
			}
		});
	};

	/* Highlight the current section in the navigation bar
	 * ------------------------------------------------------ */
	var clWaypoints = function () {
		var sections = $(".target-section"),
			navigation_links = $(".header-nav li a");

		sections.waypoint({
			handler: function (direction) {
				var active_section;

				active_section = $("section#" + this.element.id);

				if (direction === "up")
					active_section = active_section.prevAll(".target-section").first();

				var active_link = $(
					'.header-nav li a[href="#' + active_section.attr("id") + '"]'
				);

				navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");
			},

			offset: "25%",
		});
	};

	/* Stat Counter
	 * ------------------------------------------------------ */
	var clStatCount = function () {
		var statSection = $(".s-stats"),
			stats = $(".item-stats__count");

		statSection.waypoint({
			handler: function (direction) {
				if (direction === "down") {
					stats.each(function () {
						var $this = $(this);

						$({ Counter: 0 }).animate(
							{ Counter: $this.text() },
							{
								duration: 4000,
								easing: "swing",
								step: function (curValue) {
									$this.text(Math.ceil(curValue));
								},
							}
						);
					});
				}

				// trigger once only
				this.destroy();
			},

			offset: "90%",
		});
	};

	/* slick slider
	 * ------------------------------------------------------ */
	var clSlickSlider = function () {
		$(".testimonials__slider").slick({
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			pauseOnFocus: false,
			autoplaySpeed: 1500,
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		});
	};

	/* Smooth Scrolling
	 * ------------------------------------------------------ */
	var clSmoothScroll = function () {
		$(".smoothscroll").on("click", function (e) {
			var target = this.hash,
				$target = $(target);

			e.preventDefault();
			e.stopPropagation();

			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $target.offset().top,
					},
					cfg.scrollDuration,
					"swing"
				)
				.promise()
				.done(function () {
					// check if menu is open
					if ($("body").hasClass("menu-is-open")) {
						$(".header-menu-toggle").trigger("click");
					}

					window.location.hash = target;
				});
		});
	};

	/* Placeholder Plugin Settings
	 * ------------------------------------------------------ */
	var clPlaceholder = function () {
		$("input, textarea, select").placeholder();
	};

	/* Alert Boxes
	 * ------------------------------------------------------ */
	var clAlertBoxes = function () {
		$(".alert-box").on("click", ".alert-box__close", function () {
			$(this).parent().fadeOut(500);
		});
	};

	/* Animate On Scroll
	 * ------------------------------------------------------ */
	var clAOS = function () {
		AOS.init({
			offset: 200,
			duration: 600,
			easing: "ease-in-sine",
			delay: 300,
			once: true,
			disable: "mobile",
		});
	};

	/* AjaxChimp
	 * ------------------------------------------------------ */
	var clAjaxChimp = function () {
		$("#mc-form").ajaxChimp({
			language: "es",
			url: cfg.mailChimpURL,
		});

		// Mailchimp translation
		//
		//  Defaults:
		//	 'submit': 'Submitting...',
		//  0: 'We have sent you a confirmation email',
		//  1: 'Please enter a value',
		//  2: 'An email address must contain a single @',
		//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
		//  4: 'The username portion of the email address is invalid (the portion before the @: )',
		//  5: 'This email address looks fake or invalid. Please enter a real email address'

		$.ajaxChimp.translations.es = {
			submit: "Submitting...",
			0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
			1: '<i class="fas fa-exclamation-circle"></i> You must enter a valid e-mail address.',
			2: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
			3: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
			4: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
			5: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
		};
	};

	function show_products_cart() {
		if ($.cookie("txt_product") == "") {
			$.removeCookie("txt_product");
			$.removeCookie("img_product");
			$.removeCookie("price_product");
			$(".menu__box .content").html(
				'<p class="empty">Корзина пуста, пожалуйста добавте товар в корзину, чтобы он здесь появился</p>'
			);
			$(".menu__box .checkout").css("display", "none");
		}
		if ($.cookie("txt_product") != null) {
			let array_title = $.cookie("txt_product").split("./.");
			let final_html = "";
			let amount_cart = 0;
			let final_price = 0;
			for (let i = 0; i < array_title.length; i++) {
				let image = $.cookie("img_product").split("./.")[i];
				let price = $.cookie("price_product").split("./.")[i];
				let title_amount = array_title[i].split("__");
				final_html +=
					"<div class='product_cart'><div class='img_title'><img src='" +
					image +
					"'><h6>" +
					title_amount[0] +
					"</h6></div><div class='amount_cart'><img class='minus' src='images/icons/minus.svg'><input value='" +
					title_amount[1] +
					"'><img class='plus' src='images/icons/plus.svg'><span>Цена: " +
					Number(price) * Number(title_amount[1]) +
					"₽</span></div><img class='delete_product' src='images/icons/close.svg'></div>";
				final_price += Number(price) * Number(title_amount[1]);
				amount_cart += Number(title_amount[1]);
			}
			final_html +=
				"<span class='final_price'>Итого: " + final_price + "₽</span>";
			if (amount_cart >= 10) {
				$(".amount_ico_cart").css("padding", "0 5px");
			}
			$(".amount_ico_cart").html(amount_cart);
			$(".menu__box .content").html(final_html);
			$(".checkout").css("display", "block");
		}
	}

	$(".add_basket").click(function () {
		// $.removeCookie('txt_product');
		// $.removeCookie('img_product');
		// $.removeCookie('price_product');
		let product = $(this).parent();
		let img_product = $(product).find("img").attr("src");
		let txt_product = $(product).find("h4").text();
		let price_product = $(product).find(".price_num").text();
		if ($.cookie("txt_product") == null || $.cookie("txt_product") == "") {
			$.cookie("txt_product", txt_product + "__1");
			$.cookie("img_product", img_product);
			$.cookie("price_product", price_product);
		} else {
			let array_txt_product = $.cookie("txt_product").split("./.");
			let final_txt_product = "";
			for (let i = 0; i < array_txt_product.length; i++) {
				let several_product = array_txt_product[i];
				let col_title = array_txt_product[i].split("__");
				if (several_product == txt_product) {
					several_product += "__2";
				} else if (col_title[0] == txt_product) {
					several_product = col_title[0] + "__" + (Number(col_title[1]) + 1);
				}
				if (i == 0) {
					final_txt_product += several_product;
				} else {
					final_txt_product += "./." + several_product;
				}
			}
			if (final_txt_product == $.cookie("txt_product")) {
				$.cookie(
					"txt_product",
					$.cookie("txt_product") + "./." + txt_product + "__1"
				);
				$.cookie("img_product", $.cookie("img_product") + "./." + img_product);
				$.cookie(
					"price_product",
					$.cookie("price_product") + "./." + price_product
				);
			} else {
				$.cookie("txt_product", final_txt_product);
			}
		}
		console.log($.cookie("img_product"));
		console.log($.cookie("txt_product"));
		console.log($.cookie("price_product"));
		show_products_cart();
	});

	$(".content").on("click", ".product_cart .plus", function () {
		let product_cart = $(this).parent().parent();
		let attr_value = Number(product_cart.find(".amount_cart input").val());
		product_cart.find(".amount_cart input").val(attr_value + 1);
		let title_product = $(product_cart).find("h6").text();
		let array_title = $.cookie("txt_product").split("./.");
		let price_product = $.cookie("price_product").split("./.");
		let sum = Number(
			product_cart
				.find(".amount_cart span")
				.text()
				.replace("Цена: ", "")
				.replace("₽", "")
		);
		let final_cookie = "";
		for (let i = 0; i < array_title.length; i++) {
			let title_amount = array_title[i].split("__");
			if (title_amount[0] == title_product) {
				if (i == 0) {
					final_cookie +=
						title_amount[0] + "__" + (Number(title_amount[1]) + 1);
				} else {
					final_cookie +=
						"./." + title_amount[0] + "__" + (Number(title_amount[1]) + 1);
				}
				sum += Number(price_product[i]);
				product_cart.find(".amount_cart span").html("Цена: " + sum + "₽");
				let final_price = Number(
					product_cart
						.parent()
						.find(".final_price")
						.text()
						.replace("Итого: ", "")
						.replace("₽", "")
				);
				product_cart
					.parent()
					.find(".final_price")
					.html("Итого: " + (final_price + Number(price_product[i])) + "₽");
			} else if (i == 0) {
				final_cookie += array_title[i];
			} else {
				final_cookie += "./." + array_title[i];
			}
		}
		console.log(final_cookie);
		$.cookie("txt_product", final_cookie);
		$(".amount_ico_cart").html(Number($(".amount_ico_cart").text()) + 1);
	});

	$(".content").on("click", ".product_cart .minus", function () {
		let product_cart = $(this).parent().parent();
		let attr_value = Number(product_cart.find(".amount_cart input").val());
		product_cart.find(".amount_cart input").val(attr_value - 1);
		let title_product = $(product_cart).find("h6").text();
		let array_title = $.cookie("txt_product").split("./.");
		let price_product = $.cookie("price_product").split("./.");
		let img_product = $.cookie("img_product").split("./.");
		let sum = Number(
			product_cart
				.find(".amount_cart span")
				.text()
				.replace("Цена: ", "")
				.replace("₽", "")
		);
		let final_cookie = "";
		let img_cookie = "";
		let price_cookie = "";
		for (let i = 0; i < array_title.length; i++) {
			let title_amount = array_title[i].split("__");
			if (title_amount[0] == title_product) {
				if (attr_value != 1) {
					if (i == 0) {
						final_cookie +=
							title_amount[0] + "__" + (Number(title_amount[1]) - 1);
						img_cookie += img_product[i];
						price_cookie += price_product[i];
					} else {
						final_cookie +=
							"./." + title_amount[0] + "__" + (Number(title_amount[1]) - 1);
						img_cookie += "./." + img_product[i];
						price_cookie += "./." + price_product[i];
					}
				}
				sum -= Number(price_product[i]);
				product_cart.find(".amount_cart span").html("Цена: " + sum + "₽");
				let final_price = Number(
					product_cart
						.parent()
						.find(".final_price")
						.text()
						.replace("Итого: ", "")
						.replace("₽", "")
				);
				$(".final_price").html(
					"Итого: " + (final_price - Number(price_product[i])) + "₽"
				);
			} else if (i == 0) {
				final_cookie += array_title[i];
				img_cookie += img_product[i];
				price_cookie += price_product[i];
			} else if (i == 1 && final_cookie == "") {
				final_cookie += array_title[i];
				img_cookie += img_product[i];
				price_cookie += price_product[i];
			} else {
				final_cookie += "./." + array_title[i];
				img_cookie += "./." + img_product[i];
				price_cookie += "./." + price_product[i];
			}
		}
		if (attr_value == 1) {
			product_cart.remove();
		}
		console.log(final_cookie);
		console.log(img_cookie);
		console.log(price_cookie);
		$.cookie("txt_product", final_cookie);
		$.cookie("img_product", img_cookie);
		$.cookie("price_product", price_cookie);
		$(".amount_ico_cart").html(Number($(".amount_ico_cart").text()) - 1);
	});

	$(".content").on("click", ".product_cart .delete_product", function () {
		let product_cart = $(this).parent();
		let title_product = product_cart.find(".img_title h6").text();
		let minus_price = Number(
			product_cart
				.find(".amount_cart span")
				.text()
				.replace("Цена: ", "")
				.replace("₽", "")
		);
		let final_price =
			Number($(".final_price").text().replace("Итого: ", "").replace("₽", "")) -
			minus_price;
		$(".final_price").html("Итого: " + final_price + "₽");
		let minus_amount = Number(
			product_cart.find(".amount_cart input").attr("value")
		);
		$(".amount_ico_cart").html(
			Number($(".amount_ico_cart").text()) - minus_amount
		);
		product_cart.remove();
		let array_title = $.cookie("txt_product").split("./.");
		let img_product = $.cookie("img_product").split("./.");
		let price_product = $.cookie("price_product").split("./.");
		let title_final_cookie = "";
		let img_final_cookie = "";
		let price_final_cookie = "";
		for (let i = 0; i < array_title.length; i++) {
			if (array_title[i].split("__")[0] != title_product) {
				if (i == 0) {
					title_final_cookie += array_title[i];
					img_final_cookie += img_product[i];
					price_final_cookie += price_product[i];
				} else if (i == 1 && title_final_cookie == "") {
					title_final_cookie += array_title[i];
					img_final_cookie += img_product[i];
					price_final_cookie += price_product[i];
				} else {
					title_final_cookie += "./." + array_title[i];
					img_final_cookie += "./." + img_product[i];
					price_final_cookie += "./." + price_product[i];
				}
			}
		}
		$.cookie("txt_product", title_final_cookie);
		$.cookie("img_product", img_final_cookie);
		$.cookie("price_product", price_final_cookie);
	});

	$(".menu__box .content").on(
		"keyup paste",
		".product_cart .amount_cart input",
		function () {
			let title = $(this).parent().parent();
			let array_title = $.cookie("txt_product").split("./.");
			let img = $.cookie("img_product").split("./.");
			let price = $.cookie("price_product").split("./.");
			console.log(array_title);
			let final_title = "";
			let price_cookie = "";
			let img_cookie = "";
			setTimeout(() => {
				if ($(this).val() >= 1) {
					for (let i = 0; i < array_title.length; i++) {
						let title_amount = array_title[i].split("__");
						if (title_amount[0] == $(title).find(".img_title h6").text()) {
							if (i == 0) {
								final_title += title_amount[0] + "__" + $(this).val();
							} else {
								final_title += "./." + title_amount[0] + "__" + $(this).val();
							}
						} else if (i == 1 && final_title == "") {
							final_title += array_title[i];
						} else if (i == 0) {
							final_title += array_title[i];
						} else {
							final_title += "./." + array_title[i];
						}
					}
					$.cookie("txt_product", final_title);
					show_products_cart();
				} else {
					for (let i = 0; i < array_title.length; i++) {
						let title_amount = array_title[i].split("__");
						if (title_amount[0] != $(title).find(".img_title h6").text()) {
							if (i == 0) {
								final_title += array_title[i];
								img_cookie += img[i];
								price_cookie += price[i];
							} else if (i == 1 && final_title == "") {
								final_title += array_title[i];
								img_cookie += img[i];
								price_cookie += price[i];
							} else {
								final_title += "./." + array_title[i];
								img_cookie += "./." + img[i];
								price_cookie += "./." + price[i];
							}
						}
					}
					console.log(final_title);
					$.cookie("txt_product", final_title);
					$.cookie("img_product", img_cookie);
					$.cookie("price_product", price_cookie);
					show_products_cart();
				}
			}, 1000);
		}
	);

	setTimeout(() => {
		$("#send-modal").fadeIn(500);
	}, 11000);
	$(window).click(function () {
		$("#order-modal").fadeOut(500);
		$("#succes-cart").fadeOut(500);
	});
	$(".menu__box .checkout").click(function (event) {
		event.stopPropagation();
		$("#order-modal").fadeIn(500);
	});
	$(".add_basket").click(function (event) {
		event.stopPropagation();
		$("#succes-cart").fadeIn(500);
	});
	$(".order-box").click(function (event) {
		event.stopPropagation();
	});
	$(".send-box").click(function (event) {
		event.stopPropagation();
	});
	$("#order-modal .close").click(function () {
		$("#order-modal").fadeOut(500);
	});
	$("#send-modal .close").click(function () {
		$("#send-modal").fadeOut(500);
	});
	$("#succes-cart .close").click(function () {
		$("#succes-cart").fadeOut(500);
	});
	$("#continie-shop").click(function () {
		$("#succes-cart").fadeOut(500);
	});
	$("#succes-order").click(function () {
		$("#succes-cart").fadeOut(500);
		$("#order-modal").fadeIn(500);
	});
	$(".order-box").on("click", ".close_reload", function () {
		location.reload();
	});

	function setCursorPosition(pos, e) {
		e.focus();
		if (e.setSelectionRange) e.setSelectionRange(pos, pos);
		else if (e.createTextRange) {
			var range = e.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select();
		}
	}

	function mask(e) {
		//console.log('mask',e);
		var matrix = this.placeholder, // .defaultValue
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		def.length >= val.length && (val = def);
		matrix = matrix.replace(/[_\d]/g, function (a) {
			return val.charAt(i++) || "_";
		});
		this.value = matrix;
		i = matrix.lastIndexOf(val.substr(-1));
		i < matrix.length && matrix != this.placeholder
			? i++
			: (i = matrix.indexOf("_"));
		setCursorPosition(i, this);
	}
	window.addEventListener("DOMContentLoaded", function () {
		var input = document.querySelector("#phone");
		input.addEventListener("input", mask, false);
		input.focus();
		setCursorPosition(3, input);
	});

	/* Initialize
	 * ------------------------------------------------------ */
	(function clInit() {
		clPreloader();
		clMoveHeader();
		clMobileMenu();
		clWaypoints();
		clStatCount();
		clSlickSlider();
		clSmoothScroll();
		clPlaceholder();
		clAlertBoxes();
		clAOS();
		clAjaxChimp();
		show_products_cart();
		$WIN.on("resize", function () {
			clMoveHeader();
		});
	})();
})(jQuery);
