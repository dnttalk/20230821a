$(function () {
    initData()
    nextPageEvent()
    prevPageEvent()
    tdEvent()
});

let initData = function () {
    let scount = getUrlParameter('scount')
    // let sn = getUrlParameter('sn')
    // let s1 = getUrlParameter('s1')
    // let s2 = getUrlParameter('s2')
    // let snArr = sn.split(',')
    // let s1Arr = s1.split(',')
    // let s2Arr = s2.split(',')
    $('#sampleNumberInput').val(scount)
    // for (let i = 1; i <= scount; i++) {
    //     $(`#tdFirst_${i}`).text(snArr[i - 1])
    //     $(`#tdSecond_${i}`).text(s1Arr[i - 1] + ',' + s2Arr[i - 1])
    // }
}

// 下一頁允許事件
let nextPageEvent = function () {
    // $('.nextPage').css('cursor', 'pointer')
    // $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
    // $('.nextPage').css('color', 'white')
    $('.nextPage').click(function () {
        let check = 1
        for (let i = 1; i <= 24; i++) {
            if (i <= $('#sampleNumberInput').val()) {
                let attr = $(`#tdFirst_${i}`).attr('sn');
                if (typeof attr !== 'undefined' && attr !== false) {
                } else {
                    check = 0
                }
            }
        }
        if (check) {
            let id = getUrlParameter('id')
            window.location.href = "/third?id=" + id;
        } else {
            alert('Please Complate Sample&Index Setting!')
        }

    })
}
// 上一頁事件
let prevPageEvent = function () {
    $('.prevPage').click(function () {
        let id = getUrlParameter('id')
        window.location.href = "/second?id=" + id;
    })
}

let checkEvent = function () {
    let check = 1
    for (let i = 1; i <= 24; i++) {
        if (i <= $('#sampleNumberInput').val()) {
            let attr = $(`#tdFirst_${i}`).attr('sn');
            if (typeof attr !== 'undefined' && attr !== false) {
            } else {
                check = 0
            }
        }
    }
    if (check) {
        $('.nextPage').css('cursor', 'pointer')
        $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
        $('.nextPage').css('color', 'white')
    } else {
        $('.nextPage').css('cursor', 'not-allowed')
        $('.nextPage').css('background-color', '#d8d8d8')
        $('.nextPage').css('color', 'rgb(0, 176, 240)')
    }
}

let tdEvent = function () {
    $('td').click(function () {
        if (parseInt($(this).attr('id').split('First_')[1]) <= $('#sampleNumberInput').val()) {
            $('#cancleChoose2').attr('dataNumber', $(this).attr('id').split('First_')[1])
            $('#doneChoose2').attr('dataNumber', $(this).attr('id').split('First_')[1])
            $('#showSampleIndexCell').text($(this).attr('rowName') + '-' + $(this).attr('colName'))
            $('.siBtnContainer').empty()
            $('#sName').val('')
            for (let i = 0; i < arr1.length; i++) {
                $('.siBtnContainer').append(`
                    <div class="col-3">
                        <button class="selectionBtn1">${arr1[i]}</button>
                    </div>
                `)
            }
            for (let i = 0; i < arr2.length; i++) {
                $('.siBtnContainer').append(`
                    <div class="col-3">
                        <button class="selectionBtn2">${arr2[i]}</button>
                    </div>
                `)
            }
            let attr1 = $(this).attr('sn');
            let attr2 = $(this).attr('s1');
            let attr3 = $(this).attr('s2');
            if (typeof attr1 !== 'undefined' && attr1 !== false) {
                $('#sName').val(attr1)
            }
            if (typeof attr2 !== 'undefined' && attr2 !== false) {
                $(".selectionBtn1").each(function (index) {
                    if ($(this).text() == attr2) {
                        $(this).addClass('active')
                    }
                })
            }
            if (typeof attr3 !== 'undefined' && attr3 !== false) {
                $(".selectionBtn2").each(function (index) {
                    if ($(this).text() == attr3) {
                        $(this).addClass('active')
                    }
                })
            }
            let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop2'), {
                keyboard: true
            });
            myModal.show();
        }

    })
    $(document).on('click', '.selectionBtn1', async function (e) {
        if (arr1.includes($(this).text()) && arr2.includes($('.selectionBtn2.active').text())) {
            let check = 0
            for (let i = 1; i <= 24; i++) {
                if ($(`#tdFirst_${i}`).attr('s1') == $(this).text() && $(`#tdFirst_${i}`).attr('s2') == $('.selectionBtn2.active').text()) {
                    check = 1
                }
            }
            if (check) {
                alert('Selected primer combination conflicts with the other sample. Please choose different primers.')
            } else {
                $('.selectionBtn1').removeClass('active')
                $(this).addClass('active')
            }
        } else {
            $('.selectionBtn1').removeClass('active')
            $(this).addClass('active')
        }

    })
    $(document).on('click', '.selectionBtn2', async function (e) {
        if (arr1.includes($('.selectionBtn1.active').text()) && arr2.includes($(this).text())) {
            let check = 0
            for (let i = 1; i <= 24; i++) {
                if ($(`#tdFirst_${i}`).attr('s1') == $('.selectionBtn1.active').text() && $(`#tdFirst_${i}`).attr('s2') == $(this).text()) {
                    check = 1
                }
            }
            if (check) {
                alert('Selected primer combination conflicts with the other sample. Please choose different primers.')
            } else {
                $('.selectionBtn2').removeClass('active')
                $(this).addClass('active')
            }
        } else {
            $('.selectionBtn2').removeClass('active')
            $(this).addClass('active')
        }

    })
    $('#cancleChoose2').click(function () {
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).removeAttr('sn')
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).removeAttr('s1')
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).removeAttr('s2')
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).text('')
        $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).text('')
        // $(`#tdFirst_${$('#cancleChoose2').attr('dataNumber')}`).removeClass('active')
        // $(`#tdSecond_${$('#cancleChoose2').attr('dataNumber')}`).removeClass('active')
        checkEvent()
    })
    $('#doneChoose2').click(function () {
        if ($('#sName').val() != '' && arr1.includes($('.selectionBtn1.active').text()) && arr2.includes($('.selectionBtn2.active').text())) {
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).attr('sn', $('#sName').val())
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).attr('s1', $('.selectionBtn1.active').text())
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).attr('s2', $('.selectionBtn2.active').text())
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).text($('#sName').val())
            $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).text($('.selectionBtn1.active').text() + ',' + $('.selectionBtn2.active').text())
            // $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).addClass('active')
            // $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).addClass('active')
            checkEvent()
        } else {
            alert('Please Check Sample Number and Selection !')
        }
    })
}