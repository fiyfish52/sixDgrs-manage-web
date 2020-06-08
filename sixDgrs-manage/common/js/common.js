/** 表单序列化成json字符串的方法  */
var sixDgrs = {};
sixDgrs.form = {};
sixDgrs.form.getFormJson = function (formId) {
    var paramArray = $('#' + formId).serializeArray();
    /*请求参数转json对象*/
    var jsonObj = {};
    $(paramArray).each(function () {
        jsonObj[this.name] = this.value;
    });
    console.log(jsonObj);
    // json对象再转换成json字符串
    return JSON.stringify(jsonObj);

}