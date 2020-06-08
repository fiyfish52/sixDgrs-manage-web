var login = {
    init: function () {
    },
    login: function (obj) {
        var username = $("#login-username").val();
        var password = $("#login-password").val();
        if (!(username && password)) {
            $("#login-info").html("用户名或密码不能为空");
            return false;
        }
        var data = sixDgrs.form.getFormJson("login-form");
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: BaseConstant.HTTP_URL + "/signApiService/signin",
            data: data,
            success: function (json) {
                if (BaseConstant.HTTP_RES_CODE_200_VALUE == json.code) {
                    //token登陆成功
                    localStorage.setItem("token", json.data);
                    location.href = BaseConstant.RootPath + '/index.html';
                } else {
                    $("#login-info").html("用户名或密码有误");
                    return;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                var msg = xhr.responseText;
                var response = JSON.parse(msg);
                $("#info").html(response.message);
                $(obj).attr("disabled", false);
            }
        });
        console.log(data);
    }
};

var token = localStorage.getItem("token");
if (token) {
    $.ajax({
        type: 'POST',
        url: BaseConstant.HTTP_URL + '/signApiService/obtainUser',
        data: {"token": token},
        success: function (json) {
            if (BaseConstant.HTTP_RES_CODE_200_VALUE == json.code) {
                location.href = BaseConstant.RootPath + '/index.html';
            } else {
                $("#login-info").html("token已失效");
                return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var msg = xhr.responseText;
            var response = JSON.parse(msg);
            var code = response.code;
            var message = response.message;
            if (code == 401) {
                localStorage.removeItem("token");
            }
        }
    });
}