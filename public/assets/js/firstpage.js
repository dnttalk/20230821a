let status = 0;
const statusArr = ['PCR open', 'PCR opening', 'PCR close', 'PCR closing'];
const $pcrBtn = $('#pcrBtn'); // Cache the button element

$(function () {
    btnAnimation();
    // 選擇事件
    btnChooseEvent();
});

async function statusEvent() {
    status = (status + 1) % 4;
    $pcrBtn.text(statusArr[status]);

    if (statusArr[status] === 'PCR opening') {
        try {
            const response = await $.get("/api/pcrlib/open");
            console.log(response);
        } catch (error) {
            console.error("Error opening PCR:", error);
        }
    }

    if (statusArr[status] === 'PCR closing') {
        try {
            const response = await $.get("/api/pcrlib/close");
            console.log(response);
        } catch (error) {
            console.error("Error closing PCR:", error);
        }
    }
}

function btnAnimation() {
    $pcrBtn.on('click', async function () {
        statusEvent();
        $pcrBtn.prop('disabled', true);

        for (let count = 0; count < 5; count++) {
            await fadeAnimation($pcrBtn, 500);
        }

        statusEvent();
        $pcrBtn.prop('disabled', false);
    });
}

function fadeAnimation($element, duration) {
    return new Promise((resolve) => {
        $element.fadeOut(duration, () => {
            $element.fadeIn(duration, resolve);
        });
    });
}

function btnChooseEvent() {
    $('#leukemia').click(function () {
        window.location.href = "/second?id=" + $(this).attr('id');
    })
    $('#tp53').click(function () {
        window.location.href = "/second?id=" + $(this).attr('id');
    })
    $('#mpn').click(function () {
        window.location.href = "/second?id=" + $(this).attr('id');
    })
}