

    jQuery(document).ready(function () {

        jQuery('.past_link, .past_book').click(function () {
            $('html, body').animate({
                scrollTop: $("#past").offset().top
            }, 1000);
        });
        
        jQuery('.active_link, .active_book').click(function () {
            $('html, body').animate({
                scrollTop: $("#active").offset().top
            }, 1000);
        });
        
        jQuery('.zerista_link, .zerista_book').click(function () {
            $('html, body').animate({
                scrollTop: $("#zerista").offset().top
            }, 1000);
        });
        
        jQuery('.ocm_link, .ocm_book').click(function () {
            $('html, body').animate({
                scrollTop: $("#ocm").offset().top
            }, 1000);
        });
        
        jQuery('.bluemodus_link, .bluemodus_book').click(function () {
            $('html, body').animate({
                scrollTop: $("#bluemodus").offset().top
            }, 1000);
        });
        
        jQuery('.future_link, .future_book').click(function () {
            $('html, body').animate({
                scrollTop: $("#future").offset().top
            }, 1000);
        });
        
     });
    
    
