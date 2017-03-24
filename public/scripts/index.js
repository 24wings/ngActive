function addStar(workId) {
    // 首先检查用户是否登录
    $.ajax('/user/isLogin', {
        method: 'GET',
        success: function(rtn) {
            if (rtn.issuccess) {
                $.ajax('/works/star', {
                    method: 'POST',
                    data: {
                        _id: workId
                    },
                    success: function(rtn) {
                        if (rtn.issuccess) {
                            // location.reload();
                        } else {
                            alert(rtn.data);
                        }
                    }
                })

            } else {
                alert('您还没有登录,请先登录');
            }
        }
    });
}