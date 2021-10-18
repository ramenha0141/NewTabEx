const search_page = document.getElementById('search');
const box = document.getElementById('box');
const sites = document.getElementById('sites');
const send_icon = document.getElementById('send_icon');
const settings_open = document.getElementById('settings_open');
const settings = document.getElementById('settings');
const settings_background_radio = document.getElementsByClassName('settings_background_radio');
const settings_background_color = document.getElementById('settings_background_color');
const settings_background_image = document.getElementById('settings_background_image')
const settings_background_fileinput = document.getElementById('settings_background_fileinput');
const urls = {
    google:{url:'https://www.google.co.jp/', search:'search?q='},
    youtube:{url:'https://www.youtube.com/', search:'results?search_query='},
    twitter:{url:'https://twitter.com/', search:'search?q='},
    google_maps:{url:'https://www.google.co.jp/maps/', search:'search/'},
    wikipedia:{url:'https://ja.wikipedia.org/', search:'wiki/'},
    default:'google',
    entry:[
        'google',
        'youtube',
        'twitter',
        'google_maps',
        'wikipedia'
    ]
}
function search (site) {
    if (box.value == '') {
        location.href = urls[site].url;
    } else {
        location.href = urls[site].url + urls[site].search + encodeURIComponent(box.value);
    }
}
function load () {
    box.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            if (box.value) {
                if (box.value.slice(0, 1) === '/') {
                    location.href = 'http://' + box.value.slice(1);
                } else {
                    search(urls.default);
                }
            }
        }
    });
    send_icon.addEventListener('click', () => {
        if (box.value.slice(0, 1) === '/') {
            location.href = 'http://' + box.value.slice(1);
        } else {
            search(urls.default);
        }
    })
    init_send_icon();
    for (let i = 0; i < urls.entry.length; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        const img = document.createElement('img');
        img.src = './img/' + urls.entry[i] + '.svg';
        button.appendChild(img);
        sites.appendChild(button);
        button.addEventListener('click', () => {
            search(urls.entry[i]);
        });
    }
    init_settings();
    set_background();
}
function init_send_icon () {
    send_icon.src = './img/' + urls.default + '.svg';
}
function set_background () {
    if (localStorage.background == 'color') {
        search_page.style.backgroundColor = localStorage.background_color;
    } else if (localStorage.background == 'image') {
        search_page.style.backgroundImage = 'url(' + localStorage.background_image + ')';
    }
}
function init_settings () {
    if (!localStorage.background) {
        localStorage.background = 'color';
    }
    if (!localStorage.background_color) {
        localStorage.background_color = '#ffffff';
    }
    if (localStorage.background == 'color') {
        settings_background_radio[0].checked = true;
    } else if (localStorage.background == 'image') {
        settings_background_radio[1].checked = true;
    } else {
        settings_background_radio[0].checked = true;
    }
    settings_background_color.value = localStorage.background_color;
    settings_background_image.value = localStorage.background_image;
}
function open_settings () {
    settings_open.style.display = 'none';
    settings.className = 'fadeUpAnimation';
}
function close_settings () {
    settings.className = 'fadeOutAnimation';
}
function apply_settings () {
    if (settings_background_radio[0].checked) {
        localStorage.background = 'color';
    } else if (settings_background_radio[1].checked) {
        localStorage.background = 'image';
    }
    localStorage.background_color = settings_background_color.value;
    localStorage.background_image = settings_background_image.value;
    close_settings();
    set_background();
    init_settings();
}
const fileReader = new FileReader();
settings_background_fileinput.addEventListener('change', () => {
    if (settings_background_fileinput.files[0]) {
        fileReader.readAsDataURL(settings_background_fileinput.files[0]);
    }
});
fileReader.onload = () => {
    settings_background_image.value = fileReader.result;
    set_background();
}
load();