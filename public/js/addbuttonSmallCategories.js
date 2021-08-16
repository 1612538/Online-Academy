function updateClick(id, idsmall) {
    $(`#catID${idsmall}`).val(idsmall);
    $(`#frmHidden${idsmall}`).attr('action', `/management/categories/${id}/updateSCategory/${idsmall}`);
    $(`#frmHidden${idsmall}`).submit();
}

function delClick(id, idsmall) {
    $(`#catID${idsmall}`).val(idsmall);
    $(`#frmHidden${idsmall}`).attr('action', `/management/categories/${id}/deleteSCategory/${idsmall}`);
    $(`#frmHidden${idsmall}`).submit();
}

function addClick(id) {
    $(`#frmHidden`).attr('action', `/management/categories/${id}/addSCategory`);
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