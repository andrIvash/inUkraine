Ext.define('inUkraine.model.City', {
    extend: 'Ext.data.Model',
    
    config: {
        
        fields: [
            { name: 'lat', type: 'auto' },
            { name: 'lng', type: 'auto' },
            { name: 'title', type: 'auto' }
        ]
    }
});
