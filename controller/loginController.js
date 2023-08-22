// 20230718修改================================
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/user.json');

let login = async (req, res) => {
    try {
        const { user, pwd } = req.body;

        fs.readFile(dataPath, 'utf-8', (error, data) => {
            if (error) {
                res.send("<h1 style='color:orange'>! 伺服器錯誤</h1>" + error);
                return;
            }
            const arr = JSON.parse(data);
            const userObj = arr.find(obj => obj.user === user && obj.pwd === pwd);

            if (userObj) {
                res.render('loadingPage', { u: user, title: '登入成功' });
            } else {
                res.send(`<h1 style='color:red'>! 登入失敗</h1> 登入失敗！3秒後將自動返回登入介面.....<script>setTimeout(() => {window.location = '/login';}, 3000);</script>`);
            }
        });
    } catch (err) {
        console.log(err)
        res.send(`<h1 style='color:red'>! 發生錯誤</h1> 發生錯誤！3秒後將自動返回登入介面.....<script>setTimeout(() => {window.location = '/login';}, 3000);</script>`);
    }
}

let register = async (req, res) => {
    try {
        fs.readFile(dataPath, 'utf-8', (error, data) => {
            let arr = JSON.parse(data)
            let userObj = arr.find(obj => obj.user === req.body.ruser)
            if (userObj) {
                res.json({ status: 2, message: 'User Exist' })
            } else {
                if (req.body.rpwd == req.body.rcpwd) {
                    arr.push({ user: req.body.ruser, pwd: req.body.rpwd })
                    let data = JSON.stringify(arr)
                    fs.writeFileSync(dataPath, data);
                    res.json({ status: 1, message: 'Register Success' })
                } else {
                    res.json({ status: 1, message: 'Confirm Password Not Same' })
                }

            }
        })
    } catch (err) {
        console.log(err)
        res.json({ status: 0, message: 'Server Error' })
    }
}

module.exports = {
    login: login,
    register: register,
}
