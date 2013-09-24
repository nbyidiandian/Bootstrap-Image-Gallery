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
        var metrics_details = {
            'avarage_latency': 'application=sp_worker_metrics&report=sp_state&reportItem=pernodeservice&legend=service&legend=metric&brief=5&metric=query_resp_latency&multigraph=key.service&nonzero=1',
            'in_qps': '&application=sp_worker_metrics&report=sp_state&reportItem=pernodesrc&legend=src&multigraph=key.src&brief=1&nonzero=1&graph=STACK',
            'searcher_res': 'application=simond&report=systemstate&reportItem=pernode&metric=cpu_busy%25&metric=mem_user&legend=cluster&legend=metric&legend=node&multigraph=metric&nonzero=1',
            'out_err_qps': 'application=sp_worker_metrics&report=sp_state&reportItem=pernodeapp&legend=app&brief=5&metric=app_qps&multigraph=key.app&nonzero=1'
        };
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
                    + '&report=state&reportItem=pernode&legend=metric'
                    + '&multigraph=metric'
                    + '&metric=' + metric;
                var img_link = img_url + '&timestart=-2h&width=750&height=200&view=png&brief=1';
                var img_src = img_url + '&timestart=-10min&width=150&height=75&view=png&brief=1';
                var details_url = img_url + '&timestart=-2h&width=750&height=200&view=html&legend=node&sort=avg';
                var img_id = 'gallery-' + c.name + '-' + metric;
                var related_url = url_prefix + '&view=html&'
                    + metrics_details[metric]
                    + '&timestart=-10min&width=750&height=200';
                $('<a data-gallery="gallery"/>')
                    .append($('<img>').prop('src', img_src)
                            .prop('id', img_id))
                    .prop('href', img_link + '&timestart=-2h&width=750&height=200')
                    .prop('title', c.name + ':' + metric)
                    .data('details', details_url)
                    .data('related', related_url)
                    .appendTo(gallery);
                setInterval(function() {
                    $('#'+img_id).attr('src', img_src);
                }, 60000);
            });
            gallery.append('<br>');
        });
    });
});
