
function addReferrer( event ) {
    var ref = url || false;
    if ( ! ref && (m = window.location.href.match(/\&?referrer=([^&]+)/)) )
        ref = decodeURIComponent(m[1]);
    if (! ref || ref.indexOf('support.dmeng.net/') != -1) 
        return false;

    var target = event.target ? event.target : event.srcElement,
        url = target.href;
    
    if (url.indexOf('?') !== -1) {
        url = url.replace(/\&?referrer=[^&]+/, '').replace('?&', '?') + '&';
    } else {
        url += '?';
    }
    
    target.href = url + 'referrer=' + encodeURIComponent(ref);
}

var links = document.getElementsByTagName('a');
for (i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.href.indexOf('support.dmeng.net/') !== -1) {
        if (link.addEventListener) {
            link.addEventListener('click', addReferrer, false);
        } else if (link.attachEvent) {
            link.attachEvent('onclick', addReferrer);
        }
    }
}

if (typeof lasturl === 'string') {
    
    var now = new Date(); 
    var time = now.getTime(); 
        time += 3600 * 1000; 
        now.setTime(time); 
    
    lasturl += window.location.search.replace(/\&?auth_key=[0-9a-zA-Z-]+/, '');
    
    document.cookie = 'lasturl=' + encodeURIComponent(lasturl) 
                        + '; expires=' + now.toUTCString() 
                        + ';  path=/';
}
