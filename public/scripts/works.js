function deleteWork(_id) {
    $.ajax('/works/' + _id, {
        method: 'DELETE',
        success: function(rtn) {
            if (rtn.issuccess) {
                location.reload()
            } else {
                alert(rtn.data);
            }
        }
    })
}