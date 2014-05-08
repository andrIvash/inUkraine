Ext.define('inUkraine.view.Main', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.main',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'inUkraine.view.MapView',
        'inUkraine.view.GoogleMapView'
    ],
    config: {
        tabBarPosition: 'bottom',
        //layout: 'fit',
        fullscreen: true,
        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to inUkraine'
                },

                html: [
                    "<h2>Travel to Ukraine with...</h2><center>",
                    "<div style='width:",
                    + window.innerWidth-(window.innerWidth*40/100)+"px;height:"+(window.innerWidth-(window.innerWidth*40/100))/2+"px'; >",
                    "<img src='./resources/ukr-tr-copy.png' alt='Ukraine' title='Travel to Ukraine with Instagram and Google Maps'", 
                    "style='width:100%;height:100%;'/></div></center>",
                    
                    "<h4 style='font-weight:bold'>Just choose the city to see the recent images from there...</h4>"
                ].join("")
            },
            {
                title: 'inUkraine',
                iconCls: 'action',
               
                items: [
                    {
                       xtype: 'mapview'
                    }
                ]
            },
            {
                title: 'About',
                iconCls: 'info',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'About'
                },

                html: [
                    "<h4>This app created by Ivashchenko A.</h4>",
                    "<p><b>www: </b> <a href='http://dwarf.dn.ua' target='_blank'>dwarf.dn.ua</a>",
                    "<p><b>e-mail:</b> <a href='mailto:andr.ivas12@gmail.com'>andr.ivas12@gmail.com</a></p>"
                ].join("")
            }
        ]
    }
    
});
