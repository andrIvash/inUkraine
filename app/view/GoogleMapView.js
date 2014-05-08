Ext.define('inUkraine.view.GoogleMapView', {
    extend: 'Ext.Map',
    alias: 'widget.googlemapview',
    requires: [
    'inUkraine.view.InstaView',
    'Ext.navigation.View',
    'Ext.Panel'
    ],
    config: {
        //loc: null, // инициализация переменной конфигурации для дальнейшего использование
        mapOptions: { // конфигурация карты гугл
          
          center: new google.maps.LatLng(52.5148,17.1795),
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          minZoom: '3',
        },
       
        listeners: {  // обработчики событий
            maprender : function(comp, map){             //инициализация карты
                var me = this;
                var marker = Ext.getStore('CityStore');  //создание экземпляра хранилища
                
                bounds = new google.maps.LatLngBounds(null);
                marker.each(function(element) { bounds.extend(new google.maps.LatLng(element.data.lat, element.data.lng))});
                marker.load(function(success) {           // загрузка данных
                    marker.each(function(element) {      // создание элемента для каждой записи
                        var marker = new google.maps.Marker({  // создание маркера на основ полученных данных
                            position: new google.maps.LatLng(element.data.lat,element.data.lng),
                            title : element.data.title,
                            map: map
                        });
                        
                        
                        google.maps.event.addListener(marker,'click',function(){ //вешаем обработчик динамически на создаваемые маркеры
                            //me.setLoc(element.data.title);// вносим данные в локальную переменную
                            //console.log('clicked!');// вывод в консоль клика на объекте
                            //console.log(Ext.ComponentManager.get("locdetail").getLoc());// выводим в консоль содержимое переменной
                            Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
                            Ext.Viewport.setActiveItem(Ext.create('widget.instaview',{// создаем новый вид и переходи в него
                                //cityname:Ext.ComponentManager.get("locdetail").getLoc()
                                cityname: element.data.title // задаем переменную нового вида и помещаем туда данные
                            }));
                            map.fitBounds(bounds);
                            var listener = google.maps.event.addListener(map, "idle", function() { 
                                if (map.getZoom() > 6) map.setZoom(6); 
                                google.maps.event.removeListener(listener); 
                              });
                        });
                    });
                });
                
                
                
                
            },
            centerchange : function(comp, map){
                    
            },
            afterrender: function (comp, map){
          /*      coords = [
    ['49.8378', '24.0825'],
    ['50.4310',  '30.5863'],
    ['48.0431', '37.793'],
    ['46.5181',  '30.7621']
];*/

//bounds = new google.maps.LatLngBounds();
//for (i in coords) {
//    bounds.extend(new google.maps.LatLng(coords[i][0], coords[i][1]));
//}

//map.fitBounds(bounds);
//map.setCenter(bounds.getCenter(), map.fitBounds(bounds));   
// map.panTo(new google.maps(C);
           }
            
        }
        
    },
    
});