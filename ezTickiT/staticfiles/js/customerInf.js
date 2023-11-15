const EzTickiTbutton = document.querySelector(".left-div")

EzTickiTbutton.addEventListener('click', function() {
    window.location.href="/";
});
function updateTicketInfo(area) {
    var ticketAreaElement = document.getElementById('ticket-1area');
    var ticketPriceElement = document.getElementById('ticket-1price');

    switch (area) {
        case "rocka":
            ticketAreaElement.textContent = '搖滾A區';
            ticketPriceElement.textContent = '3000';
            break;
        case "rockb":
            ticketAreaElement.textContent = '搖滾B區';
            ticketPriceElement.textContent = '2000';
            break;
        case "1fcon":
            ticketAreaElement.textContent = '1樓衝撞區';
            ticketPriceElement.textContent = '1800';
            break;
        case "1fheart":
            ticketAreaElement.textContent = '1樓鋼鐵之心區';
            ticketPriceElement.textContent = '1200';
            break;
        case "upa":
            ticketAreaElement.textContent = '觀景台A';
            ticketPriceElement.textContent = '800';
            break;
        case "upb":
            ticketAreaElement.textContent = '觀景台B';
            ticketPriceElement.textContent = '500';
            break;
        default:
            console.log("都不是");
            break;
    }

    let totalPriceElement = document.querySelector('.price');
    let ticketPrice = parseFloat(ticketPriceElement.textContent);
    totalPriceElement.textContent = '$' + ticketPrice; 
}
document.addEventListener('DOMContentLoaded', function () {
    
    var url = window.location.href;
    console.log(url);
    var parts = url.split('/');
    console.log(parts); 
    var areaParam = parts[parts.length - 2];
    console.log(areaParam);
    updateTicketInfo(areaParam);
});