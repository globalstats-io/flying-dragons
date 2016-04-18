/**
 * Created by a1rwulf on 14.04.16.
 */
var globalstats = {
    at: null,
    current_gtd: null,

    init: function(client_id, client_secret) {
        var me = this;

        $.ajax({
            type: 'POST',
            url: 'https://api.globalstats.io/oauth/access_token',
            data: 'grant_type=client_credentials&scope=endpoint_client&client_id=' + client_id + '&client_secret=' + client_secret,
            dataType: 'text',
            processData: false,
            contentType: 'application/x-www-form-urlencoded',
            async: false,
            success: function (data)
            {
                try {
                    var tmp = JSON.parse(data);
                    me.at = tmp.access_token;
                }
                catch(e) {
                    console.log('Could not parse access token');
                }

            },
            error: function(req, status, ex)
            {

            },
            timeout:60000
        });
    },

    close: function() {

    },

    create: function(username, gtd, score) {
        var me = this;
        $.ajax({
            type: 'POST',
            url: 'https://api.globalstats.io/v1/statistics',
            headers: { 'Authorization': 'Bearer ' + me.at },
            data: '{ "name": "' + username + '", "values": { "' + gtd + '":' + score + '} }',
            dataType: 'text',
            processData: false,
            contentType: 'application/json',
            success: function (data)
            {
                try {
                    me.current_gtd = JSON.parse(data);
                    console.log(me.current_gtd);
                }
                catch(e) {
                    console.log('Could not parse create response');
                }

            },
            error: function(req, status, ex)
            {

            },
            timeout:60000
        });
    },

    update: function(username, gtd, score) {
        var me = this;
        $.ajax({
            type: 'PUT',
            url: 'https://api.globalstats.io/v1/statistics/' + me.current_gtd._id,
            headers: { 'Authorization': 'Bearer ' + me.at },
            data: '{ "name": "' + username + '", "values": { "' + gtd + '":' + score + '} }',
            dataType: 'text',
            processData: false,
            contentType: 'application/json',
            success: function (data)
            {
                try {
                    console.log('Sucessfully updated GTD');
                }
                catch(e) {
                    console.log('Could not parse access token');
                }

            },
            error: function(req, status, ex)
            {

            },
            timeout:60000
        });
    },

    get: function(gtd_id) {
        var me = this;
        $.ajax({
            type: 'GET',
            url: 'https://api.globalstats.io/v1/statistics/' + gtd_id,
            headers: { 'Authorization': 'Bearer ' + me.at },
            dataType: 'text',
            processData: false,
            contentType: 'application/json',
            success: function (data)
            {
                try {
                    var tmp = JSON.parse(data);
                    console.log(tmp);
                    console.log('Sucessfully retrieved GTD');
                }
                catch(e) {
                    console.log('Could not parse access token');
                }

            },
            error: function(req, status, ex)
            {

            },
            timeout:60000
        });
    }
};