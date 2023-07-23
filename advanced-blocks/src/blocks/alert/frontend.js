(function( $ ){

    var notifs = $('.bokez-notification');
    
    notifs.each(function(){

        var self = $( this );

        if ( localStorage.getItem('bokez-notif-' + self.attr('id') ) === 'hide' ) {
            self.slideUp();
        }
        else{
            self.slideDown();
        }
        
    });

    notifs.find('.bokez-notification-close').on( 'click', function(){

        var self = $( this );
        var parent = self.parent();

        localStorage.setItem( 'bokez-notif-' + parent.attr('id'), 'hide');
        parent.slideUp();
    });

})( jQuery );