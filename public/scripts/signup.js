var canSignup = false;
var errorMsg;

function signup() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();
    var school = $('#school').val();
    var specil = $('#specil').val();
    var grader = $('#grader').val();

    if (checkPhone() && checkRepeatPassword()) {
        if (name && phone && password && repeatPassword && school && specil && grader) {
            $.ajax('/signup', {
                method: 'POST',
                data: {
                    name: name,
                    phone: phone,
                    password: password,
                    school: school,
                    specil: specil,
                    grader: grader
                },
                success: function (rtn) {
                    if (rtn.issuccess) {
                        location.href = '/'
                    } else {
                        alert(rtn.data);
                    }
                }
            })
            console.log(name, phone, password, repeatPassword, school, specil, grader);

        } else {
            alert('请填写完整信息');
        }


    }
}

function checkPhone() {
    if (/^1[3-9]\d{9}$/.test($('#phone').val())) {
        $('.alert').hide();
        return true;
    } else {
        $('.alert').text('请输入正确的手机号').show();
        return false;
    }
}

function checkRepeatPassword() {
    if ($('#password').val() != $('#repeatPassword').val()) {
        $('.alert').text('两次输入的密码不一致').show();
        return false;
    } else {
        $('.alert').hide();
        return true;
    }
}