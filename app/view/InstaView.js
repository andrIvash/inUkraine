Ext.define('inUkraine.view.InstaView', {
    extend: 'Ext.Carousel',
    alias: 'widget.instaview',
    requires: [
        'Ext.data.JsonP'
    ],
    
    config: {
	direction: 'horizontal', // горизонтальная прокрутка 
        cityname: null, // инициализация переменной настройки в которую передаються данные из предидущего вида
        
        defaults: {
            styleHtmlContent: true
        },	
        
        delay: 3000, // задержка между показам фото в галерее
	start: true, // само не начинает просмотр фото
        items: [ // вывод тайтла с кнопкой возврата
            {
                xtype: 'toolbar',
                id: 'bar',
                docked: 'top',
                title: '',
                items: [
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'back',
                        handler: function () { // обработка нажатия на кнопку
                            Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true); //удалаяет текущий вид
                            Ext.Viewport.setActiveItem(Ext.create('widget.main',{
                               activeItem: 1
                            })); //cоздаем нвый вид и выбираем активное окно
                        }
                    }
                ]
            }
        ],
            
	listeners: { // обработчики событий при прокручивании фото галереи
            tap: {
                fn: function() {
                    this.pause();
                },
                element: 'element'
            },
            
	    swipe: {
		fn: function() {
		    this.start();
		},
		element: 'innerElement'
	    },
            
            initialize: function(me, eOpts) { // запуск авто прокрутки при инициализации окна текущего вида
	    if (this.config.start) {
	    	this.start();
	    };
            
            var cityName = true; // флаг - выводить фото городов или нет
            console.log(me.config.cityname); // выводит название города в консоль 
            Ext.getCmp('bar').setTitle('#'+me.config.cityname); // Устанавливает имя тайтла в соответствии с названием города
            
                if(cityName){ //проверка флага
                    Ext.data.JsonP.request(
                        { // загрузка фото в соответствии с тэгом
                            url: 'https://api.instagram.com/v1/tags/'+me.config.cityname+'/media/recent?access_token=268342863.1fb234f.b72ea21b28654213bd215515fd1a875d ',
                            params: {
                                format: 'json'
                            },
                            callbackKey: 'callback',
                            callback: function(successful, data ){
                                //console.log(data); //вывод полученного объекта в консоль
                                for(var i=0; i< 5; i++){ //data.data.length если выводить все
                                    //console.log(data.data[i].images.low_resolution.url); // вывод ссылок на фотографии
                                    me.add({// добавление и вывод элементов (фото) на страницу
                                        html : '<center><img src='+ data.data[i].images.low_resolution.url + '></img></ceneter>'
                                    });
                                }
                            },
                            failure: function(){//обработка отказа в соединении
                                me.add({
                                    html : '<center><h3>Sorry, connection refused<br><br>Try later...</h3></center>'
                                });
                            }
                        }
                    );
                }
            }
        }
    },
 // блок создания анимации автомотического прокручивания фотографий
    rotate: function() {
	if (this.timeout) {
            clearTimeout(this.timeout);
	}
	if (this.getActiveIndex() === this.getMaxItemIndex()) {
            this.setActiveItem(0, 'slide');
	}
	else {
	this.next();
	}
	this.timeout = Ext.defer(this.rotate, this.config.delay, this);
    },
        
    start: function(delayStart) {
        this.timeout = Ext.defer(this.rotate, delayStart || this.config.delay, this);
    },

    pause: function(delayStart) {
        if (this.timeout) {
            clearTimeout(this.timeout);
	}
	if (delayStart) {
	    this.start(delayStart);
	}
	return this;
    },
        
    stop: function(delayStart) {
        this.pause(delayStart);
        this.setActiveItem(0, 'slide');
        return this;
    }

});
 
