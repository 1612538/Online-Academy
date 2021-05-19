function rate() {
    let string = document.getElementById('description2').innerText;
    document.getElementById('description2').innerHTML = string;
    let ratings = document.getElementsByClassName('fas fa-star');
    let rate = document.getElementById('rating').value;
    for (let i = 1; i < ratings.length + 1; i++) {
        if (i <= rate)
            ratings[i - 1].style.color = "rgb(226, 226, 21)";
    }
}
$(document).ready(function() {
    $('.collapse').on('show.bs.collapse', function(e) {
        $('.collapse').collapse("hide")
    })
})
window.onload = rate;