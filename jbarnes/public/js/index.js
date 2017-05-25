(function() {
    var $ = window.$;

    jQuery.fn.extend({
        conceal: function(delay, speed) {
            return this.each(function() {
                $(this).css({opacity: 1.0});
                if (!delay) {
                    $(this).animate({opacity: 0}, speed || 0);
                    return;
                }

                var that = $(this);
                setTimeout(function() {
                    that.animate({opacity: 0}, speed || 0);
                }, delay || 0);
            });
        },
        reveal: function(delay, speed) {
            return this.each(function() {
                $(this).css({opacity: 0});
                if (!delay) {
                    $(this).animate({ opacity: 1.0 }, speed || 0);
                    return;
                }

                var that = $(this);
                setTimeout(function() {
                    that.animate({ opacity: 1.0 }, speed || 0);
                }, delay || 0);
            });
        }
    });

    function get(url, callback, errorCallback) {
        var baseUrl = "/rest";
        $.ajax({
            url: baseUrl + url,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Cache-Control": "no-cache"
            },
            success: callback,
            error: errorCallback || function(xhr, status, errorResult) {
                console.log(errorResult);
            }
        })
    }

    $(document).ready(function() {
        $(".greeting-text").removeClass("hidden").hide().fadeIn("slow");
        $(".greeting-text hr").animate({width: "100%"}, 1000, function() {
            $(this).removeClass("collapsed");
        });

        get(
            "/services",
            function (result) {
                var revealDelayMs = 200;
                var sections = $(".sections");
                for (var i = 0; i < result.length; i++) {
                    var section = $("<div/>")
                    section.addClass("section");
                    if (i != 0 && i != result.length - 1) {
                        section.addClass("droopy");
                    }

                    var service = result[i];

                    var icon = $("<div/>");
                    icon.addClass("fa");
                    icon.addClass(service.icon || "fa-book");
                    section.append(icon);

                    var title = $("<div/>");
                    title.html(service.name || "Untitled");
                    section.append(title);
                    section.conceal();
                    sections.append(section);
                }

                $(".sections .section").each(function() {
                    var delay = $(".sections .section").index($(this)) * revealDelayMs;
                    var speed = "slow";
                    $(this).reveal(delay, speed);
                });
            }
        );
    });
}());