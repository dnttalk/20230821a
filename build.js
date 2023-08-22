var rcedit = require('rcedit')

rcedit('./dist/NGS_arm.exe', {
    icon: 'NGS_arm.ico'
}, (err) => {
    console.log(err)
})