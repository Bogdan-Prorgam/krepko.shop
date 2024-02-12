function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function isPhone(phone) {
	return /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(phone);
}

$("#send_order").click(function () {
	let name = $("#name").val();
	let email = $("#email").val();
	let phone = $("#phone").val();
	let city = $("#address").val();
	let comment = $("#comment").val();
	if (name == "") {
		$(".massage_result").html("Пожалуйста введите Ваше Имя");
	} else if (!isPhone(phone)) {
		$(".massage_result").html("Пожалуйста введите Ваш номер телефона");
	} else if (isEmail(email) == "") {
		$(".massage_result").html("Пожалуйста введите Вашу электронную почту");
	} else {
		let products = $(".menu__box .content");
		let data_box = '<h4 class="title_email" style="font-size: 32px;color: #fff;margin: 0;margin-bottom: 20px;">Ваш заказ</h4><div style="width: 350px;color: #fff;" class="data_box"> \
			<p style="color: #48a148;">Ваш заказ успешно оформлен, в ближайшее время наш менеджер с вами свяжется!</p> \
			<p style="color: #fff;margin: 10px 0;">Имя: ' + name + '</p> \
			<p style="color: #fff;margin: 10px 0;">Телефон: ' + phone + '</p> \
			<p style="color: #fff;margin: 10px 0;">Email: ' + email + '</p>'
		if (city != ""){
			data_box += '<p style="color: #fff;margin: 10px 0;">Адрес: ' + city + '</p></div>'
		} else{
			data_box += "</div>"
		}
		let massage = products[0].outerHTML
			.replaceAll(
				'<img class="delete_product" src="images/icons/close.svg">',
				""
			)
			.replaceAll('"><img class="plus" src="images/icons/plus.svg">', "шт</p>")
			.replaceAll(
				'<img class="minus" src="images/icons/minus.svg"><input value="',
				'<p class="amount_email">Количество: '
			).replaceAll("images/", "http://cy54278-wordpress.tw1.ru/images/").replace('class="final_price"', 'style="text-transform: uppercase;font-weight: 700;margin-bottom: 20px;color: #fff;font-size: 30px;"').replace('class="content">', 'style="font-family: Arial, Helvetica, sans-serif;background: linear-gradient(-45deg, rgba(60, 59, 71, 1) 0%, rgba(48, 48, 48, 1) 23%, rgba(48, 48, 48, 1) 70%, rgba(60, 59, 71, 1) 100%);display: flex;justify-content: center;align-items: center;flex-direction: column;padding: 30px;border-radius: 20px;">' + data_box).replaceAll('class="product_cart"', 'style="position: relative;background: #eee;width: 350px;color: #303030;border-radius: 15px;margin-bottom: 20px;padding: 10px;"').replaceAll("<span>", '<span style="margin-left: 20px;color: #cb5b26;font-weight: 700;">').replaceAll('class="amount_cart"', 'style="display: flex;align-items: center;"').replaceAll('class="img_title"', 'style="display: flex;align-items: center;padding-bottom: 15px;"').replaceAll("src", 'style="width: 100px;margin: 0;border-radius: 10px;margin-right: 10px;" src').replaceAll("<h6>", '<h6 style="margin: 0;font-size: 18px;line-height: 1.3125;text-transform: uppercase;letter-spacing: 0.16rem;font-weight: 600;color: #000000;text-rendering: optimizeLegibility;">')
		$.ajax({
			url: '/send_mail.php',         /* Куда пойдет запрос */
			method: 'post',             /* Метод передачи (post или get) */
			dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
			data: {'text': massage,
					'email': email,
					"sub": "Ваш заказ на сайте krepko.shop оформлен"},     /* Параметры передаваемые в запросе. */
			success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
				$(".order-box").html(data['mes'] + '<span class="close_reload">×</span>')        /* В переменной data содержится ответ от index.php. */
				$.removeCookie('txt_product');
				$.removeCookie('img_product');
				$.removeCookie('price_product');
			},
			error: function() {
				$(".order-box").html('<p style="color: rgb(249 58 0);font-size: 16px; font-family: \'Montserrat\', sans-serif; text-align: center;font-weight: 600;margin: 0;padding: 20px;">Заказ к сожалению не удалось оформить, пожалуйста попробуйте еще раз или чуть позже:</p>' + '<span class="close_reload">×</span>');
			}
		});
		if (comment != ""){
			comment = '<p style="color: #fff;margin: 10px 0;">Комментарий от заказчика: ' + comment + "</p>"
		}
		$.ajax({
			url: '/send_mail.php',         /* Куда пойдет запрос */
			method: 'post',             /* Метод передачи (post или get) */
			dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
			data: {'text': massage.replace('<p style="color: #48a148;">Ваш заказ успешно оформлен, в ближайшее время наш менеджер с вами свяжется!</p>', comment).replace("Ваш заказ", "У вас новая заявка"),
					'email': "musixin.bogdan@gmail.com",
					"sub": "У вас новая заявка на сайте krepko.shop"},     /* Параметры передаваемые в запросе. */
		});
	}
});

$("#send_mail").click(function () {
	let email = $("#email_send").val();
	if (isEmail(email) == "") {
		$(".massage_result_mailing").html("Пожалуйста введите Вашу электронную почту");
		$(".massage_result_mailing").css("color", "rgb(249 58 0)")
	} else{
		$.ajax({
			url: '/send_mail.php',         /* Куда пойдет запрос */
			method: 'post',             /* Метод передачи (post или get) */
			dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
			data: {'text': "<p ='padding: 50px; border-radius: 20px; font-family: Arial; text-align: center; font-size: 20px; background: linear-gradient(-45deg, rgba(60,59,71,1) 0%, rgba(48,48,48,1) 23%, rgba(48,48,48,1) 70%, rgba(60,59,71,1) 100%); color: #fff'>У вас новая подписка на рассылки от сайта krepko.shop: " + email + "</p>",
					'email': "musixin.bogdan@gmail.com",
					"sub": "У вас новая подписка на рассылки от сайта krepko.shop"},     /* Параметры передаваемые в запросе. */
			success: function(){   /* функция которая будет выполнена после успешного запроса.  */
				$(".massage_result_mailing").html('Благодарим вас за подписку!')        /* В переменной data содержится ответ от index.php. */
				$(".massage_result_mailing").css("color", "#48a148");
			},
			error: function() {
				$(".massage_result_mailing").html('К сожалению, что-то пошло не так попробуйте позже еще раз');
				$(".massage_result_mailing").css("color", "rgb(249 58 0)");
			}
		});
	}
});
