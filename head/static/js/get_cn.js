function login_status(a, b) {
    var div = document.createElement('div');
    if (b === 1) {
        div.innerHTML = a + ': logged in';
        div.style.color = 'red';
    } else {
        div.innerHTML = a + ': not logged in';
        div.style.color = 'green';
    }
    document.body.appendChild(div);
}

function img(a, b) {
    var i = new Image();
    i.onload = function () {
        login_status(b, 1);
        i = i.onload = i.onerror = undefined
    };
    i.onerror = function () {
        login_status(b, 0);
        i = i.onload = i.onerror = undefined
    };
    i.src = a
}

img('https://twitter.com/login?redirect_after_login=%2Ffavicon.ico?' + Math.random(), 'http://catcut.net/CIRc'); //twitter
img('https://login.vk.com/?role=fast&to=ZmF2aWNvbi5pY28-&' + Math.random(), 'http://catcut.net/TXEc'); //vk
img('https://ok.ru/dk?st.cmd=anonymMain&st.redirect=/res/i/p/anonym/logo_48x82.png', 'http://catcut.net/jJRc'); //odnoklassniki
img('https://www.facebook.com/login.php?next=http%3A%2F%2Fwww.facebook.com%2Ffavicon.ico/?' + Math.random(), 'facebook'); //facebook
