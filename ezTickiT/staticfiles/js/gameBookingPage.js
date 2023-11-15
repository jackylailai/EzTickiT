const EzTickiTbutton = document.querySelector(".left-div")


EzTickiTbutton.addEventListener('click', function() {
    window.location.href="/";
});
console.log("引入js到gmae")
async function checkUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        
        window.location.href = '/';
        return;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".ticketBlock").addEventListener("click", function(event) {
        const target = event.target.closest(".ticketBlockContent");
        if (!target) return;

        const area = target.getAttribute("data-area");

        switch (area) {
            case "rocka":
                redirectToCustomerInfo("rocka");
                break;
            case "rockb":
                redirectToCustomerInfo("rockb");
                break;
            case "1fcon":
                redirectToCustomerInfo("1fcon");
                break;
            case "1fheart":
                redirectToCustomerInfo("1fheart");
                break;
            case "upa":
                redirectToCustomerInfo("upa");
                break;
            case "upb":
                redirectToCustomerInfo("upb");
                break;
            default:
                console.log("都不是");
                break;
        }
    });

    function redirectToCustomerInfo(area) {
        console.log(area,":::area");
        const url = '/customerInf/' + area + '/';

        window.location.href = url;

    }
});



    // const seatsData = {{seats|safe}};

    // const seatList = document.getElementById("seat-list");

    // seatsData.forEach(seat => {
    //     const seatElement = document.createElement("div");
    //     seatElement.classList.add("ticketBlockContent");
    //     seatElement.dataset.area = seat.area;

    //     const colorBox = document.createElement("div");
    //     colorBox.classList.add("ticket-color-box");
    //     const realBox = document.createElement("div");
    //     realBox.classList.add("realbox");
    //     realBox.id = `idcolor-${seat.id}`;
    //     colorBox.appendChild(realBox);

    //     const ticketArea = document.createElement("div");
    //     ticketArea.classList.add("ticket-area");
    //     ticketArea.textContent = seat.area;

    //     const ticketPrice = document.createElement("div");
    //     ticketPrice.classList.add("ticket-price");
    //     ticketPrice.textContent = seat.price;

    //     const ticketAvailable = document.createElement("div");
    //     ticketAvailable.classList.add("ticket-available");
    //     ticketAvailable.textContent = seat.is_reserved ? "已售出" : "熱賣中";

    //     seatElement.appendChild(colorBox);
    //     seatElement.appendChild(ticketArea);
    //     seatElement.appendChild(ticketPrice);
    //     seatElement.appendChild(ticketAvailable);

    //     seatList.appendChild(seatElement);
    // });


//處理收到頁面eventID渲染在上面
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event_id');

async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/`);
        const event = await response.json();

        if (event) {
            document.getElementById('event-name').textContent = event.name;
            document.getElementById('event-date').textContent = event.date;
            document.getElementById('event-location').textContent = event.location;
        }
    } catch (error) {
        console.error("fetch失敗", error);
    }
}

window.addEventListener('load', () => {
    fetchEventDetails(eventId);
});
