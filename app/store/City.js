Ext.define('inUkraine.store.City', {
    extend: 'Ext.data.Store',
    //requires: [
    ///    'TweetTheWeather.model.Tweet'
    //],
    
       config: {
        storeId: 'CityStore',    
        model: 'inUkraine.model.City',
            
            autoLoad:true, 
        proxy: {
                    type: 'ajax',
                    url: './resources/city.txt',
                    reader: {
                            type: 'json'
                    }
            }
           
            }
       
    
});
