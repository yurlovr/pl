<template>
	<footer class="footer custom-container">
		<div class="footer__top">
			<div class="footer__right">
				<nuxt-link to="/">
					<img src="~/static/pics/global/svg/nash_plyaj_blue.svg" alt="НашПляж" class="footer__logo">
				</nuxt-link>
			</div>
			<div class="footer__left">
				<div class="footer__part">
					<h4>О проекте</h4>
					<nuxt-link to="/about">О нас</nuxt-link>
					<nuxt-link to="/media">СМИ</nuxt-link>
				</div>
				<div class="footer__part">
					<h4>Партнерство</h4>
					<nuxt-link to="/beach-catalog">Каталог пляжей</nuxt-link>
					<nuxt-link to="/event-catalog">Каталог мероприятий</nuxt-link>
					<nuxt-link to="/partner-info">Информация для партнеров</nuxt-link>
				</div>
				<div class="footer__part">
					<h4>Правила и условия</h4>
					<nuxt-link to="/contacts">Контакты</nuxt-link>
				</div>
				<div class="footer__part">
					<h4>Мы в соцсетях</h4>
					<div class="footer__part__social-links">
						<a class="footer__part__social" href="facebook.com">
							<img src="~/static/pics/global/svg/fb.svg" alt="Facebook">
						</a>
						<a class="footer__part__social" href="odnoklassniki.ru">
							<img src="~/static/pics/global/svg/ok.svg" alt="Odnoklassniki">
						</a>
						<a class="footer__part__social" href="vk.com">
							<img src="~/static/pics/global/svg/vk.svg" alt="VK">
						</a>
						<a class="footer__part__social" href="instagram.com">
							<img src="~/static/pics/global/svg/ig.svg" alt="Instagram">
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="footer__line"></div>
		<div class="footer__bottom">
			<div class="footer__right">
				<span class="footer__bottom__text">© «RussoTouristo»</span>
			</div>
			<div class="footer__left">
				<div class="footer__part">
					<nuxt-link to="/confidentiality" class="footer__bottom__link footer__bottom__text">Конфиденциальность</nuxt-link>
				</div>
				<div class="footer__part">
					<nuxt-link to="/license" class="footer__bottom__link footer__bottom__text">Лицензионное соглашение</nuxt-link>
				</div>
				<div class="footer__part">
					<nuxt-link to="/agreement" class="footer__bottom__link footer__bottom__text">Соглашение об оказании услуг</nuxt-link>
				</div>
				<div class="footer__part">
					<nuxt-link to="/rules" class="footer__bottom__link footer__bottom__text">Правила пользования сайтом</nuxt-link>
				</div>
			</div>
		</div>
	</footer>
</template>
