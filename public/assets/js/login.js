
var user = document.querySelector("#user")
var pwd = document.querySelector('#pwd')
var login = document.querySelector('#login')
var form = document.querySelector('#loginForm')

$(function () {
    registerEvent()
});

login.onclick = function (e) {
    if (user.value === '' || pwd.value === '') {
        e.preventDefault()
        alert("Username and password are required......")
    } else {
        form.action = '/api/user/login'
        form.submit()
    }
}

if (typeof $.cookie('user') == 'undefined') {
} else {
    location.href = '/'
}

let registerEvent = function () {
    $('#signup').click(function (e) {
        e.preventDefault();
        var paramObj = {};
        let empty = 1;
        $.each($('#registerForm').serializeArray(), function (_, kv) {
            if (kv.value == "") {
                empty = 0
            }
            paramObj[kv.name] = kv.value;
        });
        if (empty == 0) {
            alert('Please Check Register Infomation')
        } else {
            $.ajax({
                url: '/api/user/register',
                type: "POST",
                data: JSON.stringify(paramObj),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                cache: false,
                processData: false,
                success: function (data) {
                    alert(data.message)
                }, error: function (data) {
                    $('#popMessage').text('伺服器發生錯誤, 請稍後在試')
                }
            })
        }
    })
}
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");

    // 預設隱藏註冊表單
    registerForm.style.display = "none";

    // 點擊"登入"按鈕，顯示註冊表單並隱藏登入表單
    registerButton.addEventListener("click", function () {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const signupButton = document.getElementById("signup");

    // 預設隱藏註冊表單
    registerForm.style.display = "none";

    // 點擊 "SIGN UP" 按鈕，隱藏註冊表單並顯示登入表單
    signupButton.addEventListener("click", function () {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });
});

let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button)
});

/**
 * 當直接更改輸入時，更新 simple-keyboard
 */
document.querySelector(".form-control.form-control-lg").addEventListener("click", event => {
    if (!keyboard) {
        // 初始化虛擬鍵盤
        keyboard = new Keyboard('.keyboard-container', {
            // 設置虛擬鍵盤的其他選項
        });
    }
    // 顯示虛擬鍵盤
    keyboard.open();
});
document.querySelector(".form-control.form-control-lg").addEventListener("input", event => {
    keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
    document.querySelector(".form-control.form-control-lg").value = input;
    console.log("輸入已變更", input);
}

function onKeyPress(button) {
    console.log("按鈕被按下", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
        layoutName: shiftToggle
    });
}