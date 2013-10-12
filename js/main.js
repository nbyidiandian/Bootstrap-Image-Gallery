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

        var sap_link = 'timezone=Asia%2FShanghai&timestop=now&timestart=-10min&application=%5CQsap_server_metrics_0.11%5CE&report=state&reportItem=pernode&legend=metric&brief=1&width=750&height=200&multigraph=metric&view=html';
        var sap_thumbnail_url = 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=%5CQsap_server_metrics_0.11%5CE&report=state&reportItem=pernode&legend=metric&multigraph=metric&width=120&height=70&view=png&brief=1';
        var sap_fullscreen_url = 'timezone=Asia%2FShanghai&timestart=-2h&timestop=now&application=%5CQsap_server_metrics_0.11%5CE&report=state&reportItem=pernode&legend=metric&multigraph=metric&width=750&height=200&view=png&brief=1';
        var sap_detail_link = 'timezone=Asia%2FShanghai&timestart=-2h&timestop=now&application=%5CQsap_server_metrics_0.11%5CE&report=state&reportItem=pernode&legend=metric&multigraph=metric&width=750&height=200&view=html&legend=node&sort=avg';
        var simond_thumbnail_url = 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=simond&report=systemstate&reportItem=pernode&legend=metric&width=120&height=70&view=png&brief=1';
        var simond_fullscreen_url = 'timezone=Asia%2FShanghai&timestart=-2h&timestop=now&application=simond&report=systemstate&reportItem=pernode&legend=metric&width=750&height=200&view=png&brief=1';
        var simond_detail_link = 'timezone=Asia%2FShanghai&timestart=-2h&timestop=now&application=simond&report=systemstate&reportItem=pernode&legend=metric&multigraph=metric&width=750&height=200&view=html&legend=node&sort=avg';
        var cache_thumbnail_url = 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=memcached_server&report=memcached_state&reportItem=pernode&legend=metric&multigraph=metric&width=120&height=70&view=png&brief=1';
        var cache_fullscreen_url = 'timezone=Asia%2FShanghai&timestart=-2h&timestop=now&application=memcached_server&report=memcached_state&reportItem=pernode&legend=metric&multigraph=metric&width=750&height=200&view=png&brief=1';
        var cache_detail_link = 'timezone=Asia%2FShanghai&timestart=-2h&timestop=now&application=memcached_server&report=memcached_state&reportItem=pernode&legend=metric&multigraph=metric&width=750&height=200&view=html&legend=node&sort=avg';
        var metrics = [
            {
                name: 'avarage_latency',
                thumbnail: sap_thumbnail_url + '&metric=avarage_latency',
                fullscreen: sap_fullscreen_url + '&metric=avarage_latency',
                details: sap_detail_link + '&metric=avarage_latency',
                related: 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=sp_worker_metrics&report=sp_state&reportItem=pernodeservice&legend=service&legend=metric&brief=1&metric=query_resp_latency&multigraph=key.service&nonzero=1&width=750&height=200&view=html'
            },
            {
                name: 'in_qps',
                thumbnail: sap_thumbnail_url + '&metric=in_qps',
                fullscreen: sap_fullscreen_url + '&metric=in_qps',
                details: sap_detail_link + '&metric=in_qps',
                related: 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=sp_worker_metrics&report=sp_state&reportItem=pernodesrc&legend=src&brief=1&multigraph=key.src&nonzero=1&graph=STACK&width=750&height=200&view=html'
            },
            {
                name: 'searcher_res',
                thumbnail: sap_thumbnail_url + '&metric=searcher_res',
                fullscreen: sap_fullscreen_url + '&metric=searcher_res',
                details: sap_detail_link + '&metric=searcher_res',
                related: 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=simond&report=systemstate&reportItem=pernode&metric=mem_.*&legend=cluster&legend=metric&legend=node&multigraph=metric&nonzero=1&width=750&height=200&view=html'
            },
            {
                name: 'out_err_qps',
                thumbnail: sap_thumbnail_url + '&metric=out_err_qps',
                fullscreen: sap_fullscreen_url + '&metric=out_err_qps',
                details: sap_detail_link + '&metric=out_err_qps',
                related: 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=sp_worker_metrics&report=sp_state&reportItem=pernodeapp&legend=app&brief=5&metric=app_err_qps&multigraph=key.app&nonzero=1&width=750&height=200&view=html'
            },
            {
                name: 'cpu_busy',
                thumbnail: simond_thumbnail_url + '&metric=cpu_busy%25',
                fullscreen: simond_fullscreen_url + '&metric=cpu_busy%25',
                details: simond_detail_link + '&metric=cpu_busy%25',
                related: 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=simond&report=systemstate&reportItem=pernode&metric=cpu_.*&legend=cluster&legend=metric&legend=node&multigraph=metric&nonzero=1&width=750&height=200&view=html'
            },
            {
                name: 'cached_items',
                thumbnail: cache_thumbnail_url + '&metric=curr_items&cluster=sp',
                fullscreen: cache_fullscreen_url + '&metric=curr_items',
                details: cache_detail_link + '&metric=curr_items',
                related: 'timezone=Asia%2FShanghai&timestart=-10min&timestop=now&application=memcached_server&report=memcached_state&reportItem=pernode&legend=metric&legend=node&multigraph=metric&nonzero=1&width=750&height=200&view=html'
            }
         ];
        var clusters = [
            {
                cluster: 'sp|sp_.*',
                name: 'SP',
                server: '110.75.28.193:8000'
            }, 
            {
                cluster: 'sp901_.*',
                name: 'SP901',
                server: '115.124.18.70:9999'
            }, 
            {
                cluster: 'sp_test_s004029',
                name:'SP_PRE',
                server: '110.75.18.7:8000'
            } 
        ];
        clusters.forEach(function (c) {
            var url_prefix = 'http://' + c.server + '/data?' + 'cluster=' + c.cluster + '&';
            var sap_url = url_prefix + sap_link;
            var cluster_title = '<a id="toggle-fullscreen" class="btn btn-block btn-primary" data-toggle="button" href="'
                                + sap_url + '" target="_blank">' + c.name + '</a>';
            gallery.append(cluster_title);
            metrics.forEach(function (metric) {
                var img_link = url_prefix + metric.fullscreen;
                var img_src = url_prefix + metric.thumbnail;
                var details_url = url_prefix + metric.details;
                var related_url = url_prefix + metric.related;
                var img_id = 'gallery-' + c.name + '-' + metric;
                $('<a data-gallery="gallery"/>')
                    .append($('<img>').prop('src', img_src)
                            .prop('id', img_id))
                    .prop('href', img_link + '&timestart=-2h&width=750&height=200')
                    .prop('title', c.name + ':' + metric.name)
                    .data('details', details_url)
                    .data('related', related_url)
                    .appendTo(gallery);
                setInterval(function() {
                    $('#'+img_id).attr('src', img_src);
                }, 60000);
            });
            gallery.append('</br>');
        });
    });
});
