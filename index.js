const box = document.getElementById('box');
const urls = {
    google:'https://www.google.co.jp/search?q=',
    youtube:'https://www.youtube.com/results?search_query=',
    twitter:'https://twitter.com/search?q=',
    google_maps:'https://www.google.co.jp/maps/search/'
}
function search (site) {
    location.href = urls[site] + encodeURIComponent(box.value);
}