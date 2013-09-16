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
        var clusters = [
            {
                cluster: 'sp_s.*',
                name: 'SP',
                server: '110.75.28.193:8000',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            }, 
            {
                cluster: 'sp901_.*',
                name: 'SP901',
                server: '115.124.18.70:9999',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            }, 
            {
                cluster: 'sp801_.*',
                name:'SP801',
                server: '110.75.28.193:8000',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            },
            {
                cluster: 'sp_test_s004029',
                name:'SP_PRE',
                server: '110.75.18.7:8000',
                metrics: ['avarage_latency', 'in_qps', 'searcher_res', 'out_err_qps']
            } 
        ];
        clusters.forEach(function (c) {
            var url_prefix = 'http://' + c.server + '/data?'
                + 'cluster=' + c.cluster
                + '&timezone=Asia%2FShanghai&timestop=now';
            var sap_url = url_prefix + '&timestart=-10min'
                + '&application=%5CQsap_server_metrics_0.11%5CE'
                + '&report=state&reportItem=pernode&legend=metric&brief=1'
                + '&width=750&height=200&multigraph=metric&view=html';
            gallery.append('<a id="toggle-fullscreen" class="btn btn-large btn-primary" data-toggle="button" href="' + sap_url + '" target="_blank">' + c.name + '</a>');
            c.metrics.forEach(function (metric) {
                var img_url = url_prefix + '&application=%5CQsap_server_metrics_0.11%5CE'
                    + '&report=state&reportItem=pernode&legend=metric&brief=1'
                    + '&multigraph=metric&view=png'
                    + '&metric=' + metric;
                var img_link = img_url + '&timestart=-2h&width=750&height=200';
                var img_src = img_url + '&timestart=-10min&width=150&height=75';
                var img_id = 'gallery-' + c.name + '-' + metric;
                $('<a data-gallery="gallery"/>')
                    .append($('<img>').prop('src', img_src)
                            .prop('id', img_id))
                    .prop('href', img_link + '&timestart=-2h&width=750&height=200')
                    .prop('title', c.name + ':' + metric)
                    .appendTo(gallery);
                setInterval(function() {
                    $('#'+img_id).attr('src', img_src);
                }, 60000);
            });
            var service_url = url_prefix
                + '&timestart=-10min'
                + '&application=sp_worker_metrics&report=sp_state&reportItem=pernodeservice'
                + '&legend=service&brief=5'
                + '&cluster' + c.cluster
                + '&metric=query_resp_latency&multigraph=key.service&view=html'
                + '&width=750&height=200';
            gallery.append('<a id="toggle-fullscreen" class="btn btn-primary" data-toggle="button" href="' + service_url + '" target="_blank">services</a>');
            gallery.append('<br>');
        });
    });
});
