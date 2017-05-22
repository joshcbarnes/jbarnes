(function() {
    var $ = window.$;

    function show(elem) {
        elem.hide()
            .removeClass("hidden")
            .fadeIn("slow");
    }

    $(document).ready(function() {
        show($(".greeting-text"));
        $(".greeting-text hr").animate({width: "100%"}, function() {
            $(this).removeClass("collapsed");
        });
        
        var interval = 200;
        var i = interval;
        $(".sections .section").each(function() {
            var that = this;

            setTimeout(function() {
                show($(that));
            }, i);

            i += interval;
        });
    });
}());