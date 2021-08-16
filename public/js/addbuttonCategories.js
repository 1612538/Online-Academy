function updateClick(id) {
    $(`#catID${id}`).val(id);
    $(`#frmHidden${id}`).attr('action', `/management/main-categories/updateCategory/${id}`);
    $(`#frmHidden${id}`).submit();
}

function delClick(id) {
    $(`#catID${id}`).val(id);
    $(`#frmHidden${id}`).attr('action', `/management/main-categories/deleteCategory/${id}`);
    $(`#frmHidden${id}`).submit();
}

function addClick() {
    $(`#frmHidden`).attr('action', '/management/main-categories/addCategory');
    $(`#frmHidden`).submit();
}

function editClick(id) {
    document.getElementById(`edit${id}`).style.display = 'none';
    document.getElementById(`del${id}`).style.display = 'none';
    document.getElementById(`update${id}`).style.display = 'inline-block';
    document.getElementById(`remove${id}`).style.display = 'inline-block';
    $(`#formName${id}`).show();
    $(`#name${id}`).hide();
}

function removeClick(id) {
    if (id === -1)
        document.getElementById('newrow').style.display = 'none';
    else {
        $(`#formName${id}`).hide();
        $(`#name${id}`).show();
        document.getElementById(`edit${id}`).style.display = 'inline-block';
        document.getElementById(`del${id}`).style.display = 'inline-block';
        document.getElementById(`update${id}`).style.display = 'none';
        document.getElementById(`remove${id}`).style.display = 'none';
    }
}