$(function () {
    nextPageEvent()
    countPopBtnEvent()
    checkDoneEvent()
    // cellClickEvent()
    openKeyboardEvent()
    // init()
});

// let init = function () {
//     for (let i = 1; i <= 24; i++) {
//         if (i <= $('#sampleNumberInput').val()) {
//             $(`#tdFirst_${i}`).find('.sscircle').removeAttr("disabled");
//         } else {
//             $(`#tdFirst_${i}`).find('.sscircle').attr("disabled", true);
//         }
//     }
// }
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
        // let check = 1
        // for (let i = 1; i <= 24; i++) {
        //     if (i <= $('#sampleNumberInput').val()) {
        //         $(`#tdFirst_${i}`).find('.sscircle').removeAttr("disabled");
        //         if ($(`#tdFirst_${i}`).find('.sscircle').hasClass('active')) {

        //         } else {
        //             check = 0
        //         }
        //     }
        // }
        // if (check) {
        //     $('.nextPage').css('cursor', 'pointer')
        //     $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
        //     $('.nextPage').css('color', 'white')
        // } else {
        //     $('.nextPage').css('cursor', 'not-allowed')
        //     $('.nextPage').css('background-color', '#d8d8d8')
        //     $('.nextPage').css('color', 'rgb(0, 176, 240)')
        // }
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
            // let check = 1
            // for (let i = 1; i <= 24; i++) {
            //     if (i <= $('#sampleNumberInput').val()) {
            //         $(`#tdFirst_${i}`).find('.sscircle').removeAttr("disabled");
            //         if ($(`#tdFirst_${i}`).find('.sscircle').hasClass('active')) {

            //         } else {
            //             check = 0
            //         }
            //     }
            // }
            // if (check) {
            // let s1 = ''
            // let s2 = ''
            // let sn = ''
            // for (let i = 1; i <= 24; i++) {
            //     if (i <= $('#sampleNumberInput').val()) {
            //         $(`#tdFirst_${i}`).find('.sscircle').removeAttr("disabled");
            //         if ($(`#tdFirst_${i}`).find('.sscircle').hasClass('active')) {
            //             s1 = s1 + $(`#tdFirst_${i}`).find('.sscircle').attr('s1') + ','
            //             s2 = s2 + $(`#tdFirst_${i}`).find('.sscircle').attr('s2') + ','
            //             sn = sn + $(`#tdFirst_${i}`).find('.sscircle').attr('sn') + ','
            //         }
            //     }
            // }
            // s1 = s1.substring(0, s1.length - 1);
            // s2 = s2.substring(0, s2.length - 1);
            // sn = sn.substring(0, sn.length - 1);
            // window.location.href = "/secondCheck?id=" + id + "&scount=" + $('#sampleNumberInput').val() + "&s1=" + s1 + "&s2=" + s2 + "&sn=" + sn;
            window.location.href = "/secondCheck?id=" + id + "&scount=" + $('#sampleNumberInput').val();
            // }
        }
    })
}

// 帶入座標位子給Modal
// let cellClickEvent = function () {
//     $('.sscircle').click(function () {
//         if ($(this).parent().attr('id').indexOf("tdFirst") >= 0) {
//             $('#cancleChoose2').attr('dataNumber', $(this).parent().attr('id').split('First_')[1])
//             $('#doneChoose2').attr('dataNumber', $(this).parent().attr('id').split('First_')[1])
//             $('#showSampleIndexCell').text($(this).attr('rowName') + '-' + $(this).attr('colName'))
//             $('.siBtnContainer').empty()
//             $('#sName').val('')
//             for (let i = 0; i < arr1.length; i++) {
//                 $('.siBtnContainer').append(`
//                 <div class="col-3">
//                     <button class="selectionBtn1">${arr1[i]}</button>
//                 </div>
//                 `)
//             }
//             for (let i = 0; i < arr2.length; i++) {
//                 $('.siBtnContainer').append(`
//                 <div class="col-3">
//                     <button class="selectionBtn2">${arr2[i]}</button>
//                 </div>
//                 `)
//             }
//             let attr1 = $(this).attr('sn');
//             let attr2 = $(this).attr('s1');
//             let attr3 = $(this).attr('s2');
//             if (typeof attr1 !== 'undefined' && attr1 !== false) {
//                 $('#sName').val(attr1)
//             }
//             if (typeof attr2 !== 'undefined' && attr2 !== false) {
//                 $(".selectionBtn1").each(function (index) {
//                     if ($(this).text() == attr2) {
//                         $(this).addClass('active')
//                     }
//                 })
//             }
//             if (typeof attr3 !== 'undefined' && attr3 !== false) {
//                 $(".selectionBtn2").each(function (index) {
//                     if ($(this).text() == attr3) {
//                         $(this).addClass('active')
//                     }
//                 })
//             }
//         }
//     })
//     $(document).on('click', '.selectionBtn1', async function (e) {
//         if (arr1.includes($(this).text()) && arr2.includes($('.selectionBtn2.active').text())) {
//             let check = 0
//             for (let i = 1; i <= 24; i++) {
//                 if ($(`#tdFirst_${i}`).find('.sscircle').attr('s1') == $(this).text() && $(`#tdFirst_${i}`).find('.sscircle').attr('s2') == $('.selectionBtn2.active').text()) {
//                     check = 1
//                 }
//             }
//             if (check) {
//                 alert('Selected primer combination conflicts with the other sample. Please choose different primers.')
//             } else {
//                 $('.selectionBtn1').removeClass('active')
//                 $(this).addClass('active')
//             }
//         } else {
//             $('.selectionBtn1').removeClass('active')
//             $(this).addClass('active')
//         }

//     })
//     $(document).on('click', '.selectionBtn2', async function (e) {
//         if (arr1.includes($('.selectionBtn1.active').text()) && arr2.includes($(this).text())) {
//             let check = 0
//             for (let i = 1; i <= 24; i++) {
//                 if ($(`#tdFirst_${i}`).find('.sscircle').attr('s1') == $('.selectionBtn1.active').text() && $(`#tdFirst_${i}`).find('.sscircle').attr('s2') == $(this).text()) {
//                     check = 1
//                 }
//             }
//             if (check) {
//                 alert('Selected primer combination conflicts with the other sample. Please choose different primers.')
//             } else {
//                 $('.selectionBtn2').removeClass('active')
//                 $(this).addClass('active')
//             }
//         } else {
//             $('.selectionBtn2').removeClass('active')
//             $(this).addClass('active')
//         }

//     })
//     $('#cancleChoose2').click(function () {
//         $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').removeAttr('sn')
//         $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').removeAttr('s1')
//         $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').removeAttr('s2')
//         $(`#tdFirst_${$('#cancleChoose2').attr('dataNumber')}`).find('.sscircle').removeClass('active')
//         $(`#tdSecond_${$('#cancleChoose2').attr('dataNumber')}`).find('.sscircle').removeClass('active')
//         checkEvent()
//     })
//     $('#doneChoose2').click(function () {
//         if ($('#sName').val() != '' && arr1.includes($('.selectionBtn1.active').text()) && arr2.includes($('.selectionBtn2.active').text())) {
//             $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').attr('sn', $('#sName').val())
//             $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').attr('s1', $('.selectionBtn1.active').text())
//             $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').attr('s2', $('.selectionBtn2.active').text())
//             $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').addClass('active')
//             $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).find('.sscircle').addClass('active')
//             checkEvent()
//         } else {
//             alert('Please Check Sample Number and Selection !')
//         }

//     })
// }

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
            // for (let i = 1; i <= 24; i++) {
            //     if (i <= sampleNumberInput.value) {
            //         $(`#tdFirst_${i}`).find('.sscircle').removeAttr("disabled");
            //     } else {
            //         $(`#tdFirst_${i}`).find('.sscircle').attr("disabled", true);
            //     }
            // }
        } else {
            if (parseInt(sampleNumberInput.value) + parseInt(value) >= parseInt($('#sampleNumberInput').attr('max'))) {
                sampleNumberInput.value = parseInt($('#sampleNumberInput').attr('max'))
            } else {
                sampleNumberInput.value = parseInt(sampleNumberInput.value) + parseInt(value);
            }
        }
    });
});