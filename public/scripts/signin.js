function signin() {
    $.ajax('/signin', {
        method: 'POST',
        data: {
            phone: $('#phone').val(),
            password: $('#password').val()
        },
        success: function (rtn) {
            if (rtn.issuccess) {
                location.href = '/';
            } else {
                alert(rtn.data);
            }
        }
    })
}