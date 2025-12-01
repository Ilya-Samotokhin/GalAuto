// Изменение фона навигации при прокрутке
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navCenter = document.querySelector('.nav-center');

menuToggle.addEventListener('click', function() {
    navCenter.classList.toggle('active');
    
    // Изменение иконки меню
    const icon = menuToggle.querySelector('i');
    if (navCenter.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
            navCenter.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Плавная прокрутка для всех ссылок с якорями
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Для мобильного меню закрываем его при клике на ссылку
            if (window.innerWidth <= 992 && navCenter.classList.contains('active')) {
                navCenter.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Плавная прокрутка
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Адаптивное поведение при изменении размера окна
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        // На десктопе меню всегда отображается
        navCenter.classList.remove('active');
        navCenter.style.display = '';
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        // На мобильных скрываем меню
        if (!navCenter.classList.contains('active')) {
            navCenter.style.display = 'none';
        }
    }
});

// Инициализация Яндекс карты
function initYandexMap() {
    // Координаты автосервиса GalAuto в Нижнем Новгороде
    const coordinates = [56.347953, 43.804485];
    
    // Создание карты
    ymaps.ready(function() {
        const myMap = new ymaps.Map('map', {
            center: coordinates,
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        // Создание метки
        const myPlacemark = new ymaps.Placemark(coordinates, {
            hintContent: 'GalAuto - автосервис',
            balloonContent: `
                <div style="padding: 10px;">
                    <h3 style="margin: 0 0 10px 0; color: #333;">GalAuto</h3>
                    <p style="margin: 0 0 5px 0;">Автосервис в Нижнем Новгороде</p>
                    <p style="margin: 0 0 5px 0;">ул. Федосеенко, д. 100в</p>
                    <p style="margin: 0 0 5px 0;">Тел: +7 (904) 907-95-57</p>
                    <p style="margin: 0;">Пн-Вс: 8:00-20:00</p>
                </div>
            `
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40]
        });
        
        // Добавление метки на карту
        myMap.geoObjects.add(myPlacemark);
        
        // Открытие балуна при клике на метку
        myPlacemark.events.add('click', function(e) {
            myPlacemark.balloon.open();
        });
        
        // Добавление поиска
        const searchControl = new ymaps.control.SearchControl({
            options: {
                provider: 'yandex#search',
                noPlacemark: true
            }
        });
        
        myMap.controls.add(searchControl);
        
        // Поиск организаций поблизости
        searchControl.search('автосервис');
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем начальную позицию скролла
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }
    
    // Инициализация для мобильных устройств
    if (window.innerWidth <= 992) {
        navCenter.style.display = 'none';
    }
    
    // Инициализация Яндекс карты
    initYandexMap();
    
    console.log('Сайт GalAuto загружен. Яндекс карта инициализирована.');
});