export const state = () => ({
	announcementData: {
		color: '#FCAB2D',
		date: '12-15 июня',
		title: 'Конкурс надувных матрасов',
		description: 'Фестиваль современной культуры и экологии пройдёт в Крыму',
		pic: '/pics/global/pics/announcement.png'
	},

	hugeSliderData: [],

	beachMainData: {
		title: 'Песчаный пляж «Лазурный берег»',
		likes: 56,
		location: 'Евпатория, КРЫМ',
		beachLength: '1,6 км',
		beachPrice: 250,
		beachType: 'Песчаный',
		beachWorktime: '7:00-22:00',
		beachSeabedType: 'Ровное'
	},

	beachSliderData: {
		showArrows: true, // whether to ever show arrows
	slideNumber: 4,
	cardData: [
	{
		temperature: 21,
		favorite: false,
		expensive: false, // ruble sign
		rating: 4.0,
		title: 'Массандровский пляж',
		location: 'Ялта, КРЫМ',
		pic: '/pics/main/section1_beach1.png'
	},
	{
		temperature: 20,
		favorite: false,
		expensive: false,
		rating: 5.0,
		title: 'Пляж «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		pic: '/pics/main/section1_beach2.png'
	},
	{
		temperature: 22,
		favorite: false,
		expensive: true,
		rating: 5.0,
		title: 'Пляж «Лазурный берег»',
		location: 'Евпатория, КРЫМ',
		pic: '/pics/main/section1_beach3.png'
	},
	{
		temperature: 20,
		favorite: false,
		expensive: false,
		rating: 5.0,
		title: 'Массандровский пляж',
		location: 'Ялта, КРЫМ',
		pic: '/pics/main/section1_beach4.png'
	},
	{
		temperature: 21,
		favorite: false,
		expensive: false, // ruble sign
		rating: 5.0,
		title: 'Массандровский пляж',
		location: 'Ялта, КРЫМ',
		pic: '/pics/main/section1_beach1.png'
	},
	{
		temperature: 20,
		favorite: false,
		expensive: false,
		rating: 5.0,
		title: 'Пляж «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		pic: '/pics/main/section1_beach2.png'
	},
	{
		temperature: 22,
		favorite: false,
		expensive: true,
		rating: 5.0,
		title: 'Пляж «Лазурный берег»',
		location: 'Евпатория, КРЫМ',
		pic: '/pics/main/section1_beach3.png'
	},
	{
		temperature: 20,
		favorite: false,
		expensive: false,
		rating: 5.0,
		title: 'Массандровский пляж',
		location: 'Ялта, КРЫМ',
		pic: '/pics/main/section1_beach4.png'
	}
	]
	},

	similarNearAreaData: {
		title: 'Похожие пляжи рядом',
		subtitle: 'Пологий берег, плавный вход в воду, безопасность и инфраструктура',
		beachNumber: 45
	},

	hotelData: {
	showArrows: true, // whether to ever show arrows
	slideNumber: 6,
	tall: true,
	cardData: [
	{
		rating: 5.0,
		title: 'Отель Мрия Резорт & СПА',
		location: 'Ялта, КРЫМ',
		price: 6800,
		priceLink: '/',
		pic: '/pics/main/section11_pic1.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 2500,
		priceLink: '/',
		pic: '/pics/main/section11_pic2.png'
	},
	{
		rating: 5.0,
		title: 'Отель "Вилла Голубой Залив"',
		location: 'Евпатория, КРЫМ',
		price: 1400,
		priceLink: '/',
		pic: '/pics/main/section11_pic3.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 3000,
		priceLink: '/',
		pic: '/pics/main/section11_pic4.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 2500,
		priceLink: '/',
		pic: '/pics/main/section11_pic5.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 2900,
		priceLink: '/',
		pic: '/pics/main/section11_pic6.png'
	},
	{
		rating: 5.0,
		title: 'Отель Мрия Резорт & СПА',
		location: 'Ялта, КРЫМ',
		price: 6800,
		priceLink: '/',
		pic: '/pics/main/section11_pic1.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 2500,
		priceLink: '/',
		pic: '/pics/main/section11_pic2.png'
	},
	{
		rating: 5.0,
		title: 'Отель "Вилла Голубой Залив"',
		location: 'Евпатория, КРЫМ',
		price: 1400,
		priceLink: '/',
		pic: '/pics/main/section11_pic3.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 3000,
		priceLink: '/',
		pic: '/pics/main/section11_pic4.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 2500,
		priceLink: '/',
		pic: '/pics/main/section11_pic5.png'
	},
	{
		rating: 5.0,
		title: 'Гостиница «Ялта – Интурист»',
		location: 'Ялта, КРЫМ',
		price: 2900,
		priceLink: '/',
		pic: '/pics/main/section11_pic6.png'
	}
	]
	},

	hotelAreaData: {
		title: 'Где остановиться в Крыму',
		subtitle: 'Наша подборка отелей, основанная на ваших отзывах',
		beachNumber: 45
	},

	beachInfraData: {
		data1: {
			pic: '/pics/beach/medic.svg',
			title: 'Пункт медицинской помощи',
			slideTitle: 'Пункт медицинской<br>помощи'
		},
		data2: {
			pic: '/pics/beach/rescuer.svg',
			title: 'Спасательный пункт'
		},
		data3: {
			pic: '/pics/beach/shower.svg',
			title: 'Душевые кабины'
		},
		data4: {
			pic: '/pics/beach/closet.svg',
			title: 'Переодевалки'
		},
		data5: {
			pic: '/pics/beach/transportation.svg',
			title: 'Остановка общественного транспорта'
		}
	},

	beachServicesData: {
		data1: {
			pic: '/pics/beach/lounger.svg',
			title: 'Шезлонги'
		},
		data2: {
			pic: '/pics/beach/umbrella.svg',
			title: 'Пляжные зонтики'
		},
		data3: {
			pic: '/pics/beach/equipment.svg',
			title: 'Инвентарь для плавания'
		},
		data4: {
			pic: '/pics/beach/towel.svg',
			title: 'Пляжные полотенца'
		},
		data5: {
			pic: '/pics/beach/sports.svg',
			title: 'Инвентарь для активного отдыха'
		}
	},

	beachAbout: [
		{
			paragraph: 'Пляж был основан в 1983 году. Самый большой пляж на полуострове является домом для невероятной флоры и фауны. Особого внимания заслуживают черепахи из кожи. Залив является одним из самых важных мест, где черепахи откладывают яйца. Каждый год в июне они приезжают в Баия-де-лас-Агилас, чтобы отложить яйца. Помимо черепах, вы также можете встретить исчезающих игуан носорогов или сыт по горло розовыми колониями фламинго. Контраст пустынного пустынного ландшафта, который превращается в тропический тропический лес, также уникален и обязателен для каждого любителя природы и искателя приключений.'
		},
		{
			title: 'Уникальный ландшафт',
			paragraph: 'Чтобы добраться до знаменитой бухты Игл, вы должны пройти по прибрежной дороге 44 примерно за 12 км до Педерналеса, пока не увидите небольшой указатель на Кабо Рохо и указанный залив. Отсюда вы едете в небольшую рыбацкую деревню Ла-Куева - пещеру, которая была названа в честь многочисленных пещер в этом районе. Отсюда вы можете отправиться в поход на пляж или на лодке, что является хорошим выбором, учитывая неопасный путь. Спуск на пляж на машине довольно сложный и официально запрещен. Даже с лодки вы не сможете выбраться изумления. Красивые горные породы выстилают ландшафт на пути к заливу. Сухой лес, богатый флорой и фауной, и ряд красивых рифов дополняют общую картину.'
		},
		{
			title: 'Рай на земле',
			paragraph: 'Всего через 10 минут открывается захватывающий вид на песчаный пляж длиной около 8 км. Мягкий, белый песок, бирюза, кристально чистая вода и совершенно натуральный: идиллический рай на земле. Eagle Bay - это не только один из самых красивых пляжей в Доминиканской Республике, для многих доминиканцев и отдыхающих это также один из самых красивых пляжей в мире. Планы туристических построек постоянно разрабатываются в этом уникальном природном раю, который, благодаря национальным и международным инициативам, до сих пор не удался. Если вы планируете поездку в Доминиканскую Республику, не забудьте посетить эту прекрасную бухту.'
		}
	],

	parkingTransportMapData: []
})