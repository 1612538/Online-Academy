function updateClick(id, url) {
    $(`#catID${id}`).val(id);
    $(`#frmHidden${id}`).attr('action', `/management/${url}/${id}`);
    $(`#frmHidden${id}`).submit();
}

function delClick(id, url) {
    $(`#adminID${id}`).val(id);
    $(`#frmHidden${id}`).attr('action', `/management/${url}/${id}`);
    $(`#frmHidden${id}`).submit();
}

function addClick(url) {
    $(`#frmHidden`).attr('action', `/management/${url}`);
    $(`#frmHidden`).submit();
}

function unlockClick(id, url) {
    $(`#frmHidden${id}`).attr('action', `/management/${url}`);
    $(`#frmHidden${id}`).submit();
}

function lockClick(id, url) {
    $(`#frmHidden${id}`).attr('action', `/management/${url}`);
    $(`#frmHidden${id}`).submit();
}

function editClick(id) {
    document.getElementById(`edit${id}`).style.display = 'none';
    document.getElementById(`del${id}`).style.display = 'none';
    document.getElementById(`update${id}`).style.display = 'inline-block';
    document.getElementById(`remove${id}`).style.display = 'inline-block';
    $(`#formName${id}`).show();
    $(`#formPassword${id}`).show();
    $(`#formFirst${id}`).show();
    $(`#formLast${id}`).show();
    $(`#formWork${id}`).show();
    $(`#formEmail${id}`).show();
    $(`#name${id}`).hide();
    $(`#password${id}`).hide();
    $(`#firstname${id}`).hide();
    $(`#lastname${id}`).hide();
    $(`#workplace${id}`).hide();
    $(`#email${id}`).hide();
}

function removeClick(id) {
    if (id === -1)
        document.getElementById('newrow').style.display = 'none';
    else {
        $(`#formName${id}`).hide();
        $(`#formPassword${id}`).hide();
        $(`#formFirst${id}`).hide();
        $(`#formLast${id}`).hide();
        $(`#formWork${id}`).hide();
        $(`#formEmail${id}`).hide();
        $(`#name${id}`).show();
        $(`#password${id}`).show();
        $(`#firstname${id}`).show();
        $(`#lastname${id}`).show();
        $(`#workplace${id}`).show();
        $(`#email${id}`).show();
        document.getElementById(`edit${id}`).style.display = 'inline-block';
        document.getElementById(`del${id}`).style.display = 'inline-block';
        document.getElementById(`update${id}`).style.display = 'none';
        document.getElementById(`remove${id}`).style.display = 'none';
    }
}