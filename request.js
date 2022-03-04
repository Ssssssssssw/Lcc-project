let reqData = {
    fromCity: "OAK",
    toCity: "ABQ",
    departdate: "2022-03-29",
    adultNum: 1,
    childNum: 0
}
setTimeout(() => {
    document.querySelector("#liBookFlight > a").click()
    let oneWay = document.querySelector("#findFlights > div.transformer-tabs__section--border-bottom.flights > div > div.divOneWayRound > fieldset > label.rb-container.one-way").click()
    let fromCity = document.querySelector("#origin").value = reqData.fromCity;
    let toCity = document.querySelector("#destination").value = reqData.toCity
    let departdate = document.querySelector("#departureDate").value = reqData.departdate
    document.querySelector("#passengersInput").click()
    document.querySelector("#passengersInput").value = reqData.adultNum + ' ' + "Adults";
    let adultNum = document.querySelector("#adult-count").textContent = reqData.adultNum;
    if (reqData.childNum) {
        document.querySelector("#passengersInput").value = reqData.adultNum + ' ' + "Adults" + "," + " " + reqData.childNum + " " + "Child";
        for (let i = 0; i < reqData.childNum; i++) {
            document.querySelector("#findFlights > div.passengers > fieldset > div > div > div.pax-type-dropdown > section:nth-child(4) > div.tab > div.controls > img.add-child").click()
        }
    }
    let chdNum = document.querySelector("#child-count").textContent = reqData.childNum;
    let searchType = document.querySelector("#findFlights > div.search-by > div.divPromoPaymentType > div.divPaymentType > fieldset > label.rb-container.dollars").click()
    document.querySelector("#btnSearch").click()
}, 7000)