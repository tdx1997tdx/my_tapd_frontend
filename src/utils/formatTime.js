function formatDate(datetime) {
    var date = new Date(datetime);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var sdate = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    return year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
}

export default formatDate;