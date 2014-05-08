Ext.define('inUkraine.view.MapView', {
    extend: 'Ext.Container',
    alias: 'widget.mapview',
    requires: [
        'Ext.tab.Panel',
        'Ext.Map',
        'inUkraine.view.GoogleMapView'
    ],
    config: {
         layout: 'fit',
                       
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Choose the city',
               
            },
            {
                        xtype: 'googlemapview',
                        height: '', 
                       
                        layout: 'fit',
                        id:'map'
                   
                               
            }
        ]
    },
   initialize: function() {
       var me = this;
       var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
       var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
       //console.log(height); расчет ширины и высоты экрана и вывод в консоль
       //console.log(width);
       Ext.getCmp('map').setHeight(height+'px');
       
       //console.log(me.config.items[1].height);
       //console.log(me.config.items[1].width);
   }
});
