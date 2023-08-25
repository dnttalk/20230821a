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

// sampleNumberInput.addEventListener('click', () => {
//     keyboard.style.display = 'grid';
//     const inputValue = parseInt(sampleNumberInput.value);

//     // 取得所有的 tdFirst 和 tdSecond 元素
//     const tdFirstElements = document.querySelectorAll("[id^='tdFirst_']");
//     const tdSecondElements = document.querySelectorAll("[id^='tdSecond_']");

//     // 移除所有單元格的綠色樣式
//     tdFirstElements.forEach(td => td.classList.remove("green"));
//     tdSecondElements.forEach(td => td.classList.remove("green"));

//     // 將對應數量的單元格設置為綠色
//     for (let i = 1; i <= inputValue; i++) {
//         const tdFirst = document.getElementById(`tdFirst_${i}`);
//         const tdSecond = document.getElementById(`tdSecond_${i}`);

//         if (tdFirst) {
//             tdFirst.classList.add("green");
//         }

//         if (tdSecond) {
//             tdSecond.classList.add("green");
//         }
//     }
// });

let updateSscircleBtnEvent = function () {
    for (let i = 1; i <= 24; i++) {
        if (i <= sampleNumberInput.value) {
            $(`#tdFirst_${i}`).find('.sscircle').addClass('active')
            $(`#tdSecond_${i}`).find('.sscircle').addClass('active')
        } else {
            $(`#tdFirst_${i}`).find('.sscircle').removeClass('active')
            $(`#tdSecond_${i}`).find('.sscircle').removeClass('active')
        }

    }
}

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
        updateSscircleBtnEvent()
    });
});
