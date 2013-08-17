/*
 * Bootstrap Image Gallery JS Example 2.9
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true */
/*global window, document, $ */

$(function () {
    'use strict';

    // Start slideshow button:
    $('#start-slideshow').button().click(function () {
        var options = $(this).data(),
            modal = $(options.target),
            data = modal.data('modal');
        if (data) {
            $.extend(data.options, options);
        } else {
            options = $.extend(modal.data(), options);
        }
        modal.find('.modal-slideshow').find('i')
            .removeClass('icon-play')
            .addClass('icon-pause');
        modal.modal(options);
    });

    // Toggle fullscreen button:
    $('#toggle-fullscreen').button().click(function () {
        var button = $(this);
        window.open(button.attr('ref'));
    });

    $(function () {
        // Load images via flickr for demonstration purposes:
        var gallery = $('#gallery');
        var url_prefix = "/data?timestart=-10min&timestop=now&application=%5CQsap_server_metrics_0.11%5CE&report=state&reportItem=pernode&legend=metric&brief=1&nonzero=1&timezone=Asia%2FShanghai";
        var clusters = [
            {
                cluster: 'sp',
                server: '110.75.28.193:8000',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            }, 
            {
                cluster: 'sp501',
                server: '110.75.6.7:9999',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            }, 
            {
                cluster: 'sp801',
                server: '110.75.28.193:8000',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            }
        ];
        //gallery.empty();
        clusters.forEach(function (c) {
            var url = 'http://' + c.server + url_prefix
                + '&cluster=' + c.cluster + '_.*';
            var html_url = url + '&view=html&width=750&height=200&multigraph=metric';
            gallery.append('<a id="toggle-fullscreen" class="btn btn-large btn-primary" data-toggle="button" href="' + html_url + '" target="_blank">' + c.cluster + '</a>');
            c.metrics.forEach(function (metric) {
                var img_url = url + '&view=png' + '&metric=' + metric;
                var img_src = img_url + '&width=150&height=75';
                var img_id = 'gallery-' + c.cluster + '-' + metric;
                $('<a data-gallery="gallery"/>')
                    .append($('<img>').prop('src', img_src)
                            .prop('id', img_id))
                    .prop('href', img_url + '&width=750&height=200')
                    .prop('title', c.cluster + ':' + metric)
                    .appendTo(gallery);
                setInterval(function() {
                    $('#'+img_id).attr('src', img_src);
                }, 60000);
            });
            gallery.append('<br>');
        });
    });
});
