$(function () {
    nextPageEvent()
    countPopBtnEvent()
    checkDoneEvent()
    openKeyboardEvent()
});

// 檢查項
let checkDoneEvent = function () {
    $('#cancleChoose').click(function () {
        $(`#${$('#cancleChoose').attr('dataId')}`).removeClass('active')
        checkEvent()
    })
    $('#doneChoose').click(function () {
        $(`#${$('#cancleChoose').attr('dataId')}`).addClass('active')
        checkEvent()
    })
}

// 試算µl
let countPopBtnEvent = function () {
    $('.countPopBtn').click(function () {
        $(".showModelName").children().text($(this).text())
        let count = parseInt($('#sampleNumberInput').val())
        $('#masterMix').text((10 * (count + 1)).toString() + 'µl')
        $('#primerPool').text((2 * (count + 1)).toString() + 'µl')
        $('#total').text(((10 * (count + 1)) + (2 * (count + 1))).toString() + 'µl')
        $('#cancleChoose').attr('dataId', $(this).attr('id'))
        $('#doneChoose').attr('dataId', $(this).attr('id'))
    })
}

// 檢查是否全部按鈕都Active
let checkEvent = function () {
    if ($('#pm1').hasClass('active') && $('#mb').hasClass('active') && $('#pm2').hasClass('active')) {
        $('.nextPage').css('cursor', 'pointer')
        $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
        $('.nextPage').css('color', 'white')

    } else {
        $('.nextPage').css('cursor', 'not-allowed')
        $('.nextPage').css('background-color', '#d8d8d8')
        $('.nextPage').css('color', 'rgb(0, 176, 240)')
    }
}
// 下一頁允許事件
let nextPageEvent = function () {
    $('.nextPage').css('cursor', 'not-allowed')
    $('.nextPage').click(function () {
        let id = getUrlParameter('id')
        if ($('#pm1').hasClass('active') && $('#mb').hasClass('active') && $('#pm2').hasClass('active')) {
            window.location.href = "/secondCheck?id=" + id + "&scount=" + $('#sampleNumberInput').val();
            // }
        }
    })
}

let openKeyboardEvent = function () {
    $('#sampleNumberInput').click(function () {
        $('#keyboardContainer').css('display', 'block')
    })
}


const sampleNumberInput = document.getElementById('sampleNumberInput');
const keyboard = document.getElementById('keyboard');
const keys = document.querySelectorAll('.key');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const ok = document.getElementById('ok');

sampleNumberInput.addEventListener('click', () => {
    keyboard.style.display = 'grid';
});

keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.textContent;
        if (value === '←') {
            if (sampleNumberInput.value.slice(0, -1) == '') {
                sampleNumberInput.value = 1
            } else {
                sampleNumberInput.value = sampleNumberInput.value.slice(0, -1);
            }
        } else if (value === 'C') {
            sampleNumberInput.value = 1;
        } else if (value === 'OK') {
            $('#keyboardContainer').css('display', 'none')

        } else {
            if (parseInt(sampleNumberInput.value) + parseInt(value) >= parseInt($('#sampleNumberInput').attr('max'))) {
                sampleNumberInput.value = parseInt($('#sampleNumberInput').attr('max'))
            } else {
                sampleNumberInput.value = parseInt(sampleNumberInput.value) + parseInt(value);
            }
        }
    });
});