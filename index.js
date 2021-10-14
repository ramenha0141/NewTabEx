const box = document.getElementById('box');
const urls = {
    google:{url:'https://www.google.co.jp/', search:'search?q='},
    youtube:{url:'https://www.youtube.com/', search:'results?search_query='},
    twitter:{url:'https://twitter.com/', search:'search?q='},
    google_maps:{url:'https://www.google.co.jp/maps/', search:'search/'}
}
function search (site) {
    if (box.value == '') {
        location.href = urls[site].url;
    } else {
        location.href = urls[site].url + urls[site].search + encodeURIComponent(box.value);
    }
}