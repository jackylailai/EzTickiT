async function fetchAndRenderEvents() {
    try {
        // 使用await等待fetch的響應，並將其解析為JSON格式
        const response = await fetch("/api/events/");
        const events = await response.json();

        // 獲取事件列表容器
        const eventList = document.getElementById("GameInfoList");
        console.log(events);
        // 循環遍歷事件數據，並為每個事件創建HTML元素並添加到容器中
        events.forEach(event => {

            const eventId = event.id; 

            const eventItem = document.createElement("div");
            eventItem.className = "col grid";

            const eventContent = document.createElement("div");
            eventContent.className = "d-flex event-gray";

            const dateDiv = document.createElement("div");
            dateDiv.className = "flex-fill date";
            dateDiv.textContent = event.date;

            const eventDiv = document.createElement("div");
            eventDiv.className = "flex-fill event";
            eventDiv.textContent = event.name;

            const mapDiv = document.createElement("div");
            mapDiv.className = "flex-fill map";
            mapDiv.textContent = event.location;

            const buttonDiv = document.createElement("div");
            buttonDiv.className = "flex-fill";

            const buyButton = document.createElement("button");
            buyButton.textContent = "線上購票";
            buyButton.setAttribute("data-event-id", eventId);
            
            buyButton.addEventListener("click", handleBuyButtonClick);

            buttonDiv.appendChild(buyButton);
            eventContent.appendChild(dateDiv);
            eventContent.appendChild(eventDiv);
            eventContent.appendChild(mapDiv);
            eventContent.appendChild(buttonDiv);
            eventItem.appendChild(eventContent);

            eventList.appendChild(eventItem);
        });
    } catch (error) {
        console.error("獲取或渲染事件時出錯：", error);
    }
}
function handleBuyButtonClick(event) {
    const eventId = event.target.getAttribute("data-event-id");
    
    const bookingUrl = `/gameBookingPage?event_id=${eventId}`;

    window.location.href = bookingUrl;
}
// 調用異步函數來獲取和渲染事件
fetchAndRenderEvents();