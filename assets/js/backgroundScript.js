var saveLink = function(info) {
    $.ajax({
        url: info.linkUrl,
        success: function(data) {
            var title = data.match(/<title>(.*)<\/title>/);
            if (title !== null) {
                var siteTitle = title[0].replace('<title>', '').replace('</title>', '');
            } else {
                var siteTitle = info.linkUrl;
            }
            var siteTitle = $("<div/>").html(siteTitle).text();
            console.log(siteTitle);

            var passThru = {};
            passThru.link = {
                url: info.linkUrl,
                title: siteTitle,
                isRead: 0
            };
            addLink(passThru)
        }
    });
};

var addLink = function(passThru, callBack) {
    var dateAdded = new Date();
    link = {
        'url': passThru.link.url,
        'title': passThru.link.title,
        'isRead': passThru.link.isRead,
        'dateAdded': dateAdded.toISOString()
    };

    var key = passThru.link.title
    var newLink = {};
    newLink[key] = link;
    chrome.storage.sync.set(newLink, function() {
        console.log('Saved', key);
    });
};

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        setTimeout(function(){
            window.open('https://weather.timleland.com/');
         }, 3000);
    }else if(details.reason == "update"){
        setTimeout(function(){
            window.open('https://weather.timleland.com/');
         }, 3000);
    }
});



chrome.contextMenus.create({
    title: "Save Link",
    type: "normal",
    contexts: ["link"],
    onclick: saveLink
});
