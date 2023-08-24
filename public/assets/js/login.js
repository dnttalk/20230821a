
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

let curryInput = '#user'
let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
    baseClass: 'custom-keyboard',
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button)
});

/**
 * Update simple-keyboard when input is changed directly
 */
$(".input").click(function () {
    curryInput = '#' + $(this).attr('id')
    document.querySelector(curryInput).addEventListener("input", event => {
        keyboard.setInput(event.target.value);
    });
    // 显示虚拟键盘
    document.querySelector(".simple-keyboard").style.display = "block";
})
// 添加点击事件监听器到 document
document.addEventListener("click", function (event) {
    // 获取点击的元素
    const clickedElement = event.target;

    // 获取虚拟键盘元素
    const keyboardElement = document.querySelector(".simple-keyboard");

    // 获取所有具有 input 类的元素
    const inputElements = document.querySelectorAll(".input");

    // 检查点击的元素是否是输入元素之外的区域
    if (!keyboardElement.contains(clickedElement) && !isInputElement(clickedElement, inputElements)) {
        // 隐藏虚拟键盘
        keyboardElement.style.display = "none";
    }
});

// 辅助函数：检查元素是否是输入元素
function isInputElement(element, inputElements) {
    for (const inputElement of inputElements) {
        if (inputElement.contains(element)) {
            return true;
        }
    }
    return false;
}
function onChange(input) {
    // document.querySelector(curryInput).value = input;
    // console.log(input)
    // console.log("Input changed", input);
}

function onKeyPress(button) {
    if (button == '{bksp}') {
        document.querySelector(curryInput).value = document.querySelector(curryInput).value.substring(0, document.querySelector(curryInput).value.length - 1);
    } else if (button == '{lock}' || button == '{shift}' || button == '{tab}' || button == '{enter}') {

    } else if (button == '{space}') {
        document.querySelector(curryInput).value = document.querySelector(curryInput).value + ' '
    } else {
        document.querySelector(curryInput).value = document.querySelector(curryInput).value + button
    }
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
        layoutName: shiftToggle,
        physicalKeyboardHighlight: true, // 可以高亮显示与物理键盘相对应的虚拟键
        debug: true // 启用调试模式，方便调试样式和位置
    });
}
document.getElementById("closePage").addEventListener("click", function () {
    // Check if the window was opened by a script
    if (window.opener) {
        window.close(); // Close the current window or tab
    } else {
        alert("This window was not opened by a script and cannot be closed.");
        document.getElementById("content").classList.toggle("minimized");
    }

});