let reqData = {
    fromCity: "LAS",
    toCity: "OAK",
    departdate: "2021-12-28",
    adultNum: 2
}
//  预定机票
document.querySelector("#liBookFlight > a").click()
// 单程
let oneWay = document.querySelector("#findFlights > div.transformer-tabs__section--border-bottom.flights > div > div.divOneWayRound > fieldset > label.rb-container.one-way").click()
// 起飞地
let fromCity = document.querySelector("#origin").value = reqData.fromCity;
// 到达地
let toCity = document.querySelector("#destination").value = reqData.toCity
//  出发日期
let departdate = document.querySelector("#departureDate").value = reqData.departdate
document.querySelector("#passengersInput").value = reqData.adultNum + ' ' + "Adult"
//  成人数
let adultNum = document.querySelector("#adult-count").textContent = reqData.adultNum;
// 搜索方式
let searchType = document.querySelector("#findFlights > div.search-by > div.divPromoPaymentType > div.divPaymentType > fieldset > label.rb-container.dollars").click()
// 点击搜索
document.querySelector("#btnSearch").click()

//  获取查询结果列表
let objStr = document.querySelectorAll("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div")
//  获取查询日期
let dateItem = document.querySelectorAll("#ReviewFlightSummaryWrapper > div > div.summary-flight-section > div:nth-child(1) > div > div.summary-journey-info > div.summary-journey-info-datetime-container > span.js-summary-journey-info-datetime")

function fun(objStr, dateItem) {
    let arr2 = []
    let retData = [];
    // 标签数据为空说明标签已更改
    if (objStr.length == 0) {
        return false
    }
    //  查询没有航班则返回一个空数组
    if (objStr.length == 1) {
        return retData
    }
    try {
        let date = dateItem[0].innerText.split("|")[0].substring(4).replace("/", "-").split("/");
        let subDate = "20" + date[1].trim() + "-" + date[0]
        let arr = [].slice.apply(objStr)
        arr.splice(0, 1)
        for (let i = 0; i < arr.length; i++) {
            arr[i].arr = arr[i].innerText.split("\n");
            if (arr[i].arr.length == 7 || arr[i].arr.length == 8) {
                retData.push({
                    fromSegments: [{
                        depAirport: arr[i].arr[0],
                        depCity: arr[i].arr[0],
                        depTime: subDate + ' ' + arr[i].arr[1],
                        arrAirport: arr[i].arr[2],
                        arrCity: arr[i].arr[2],
                        arrTime: subDate + ' ' + arr[i].arr[3],
                        flightNumber: "F9" + arr[i].arr[4].substr(-4, 4),
                        flightTime: ((arr[i].arr[4].split("|"))[0].split(" ")[0] * 1 * 60 + (arr[i].arr[4].split("|"))[0].split(" ")[2] * 1) + "",
                        carrier: "F9",
                        // flightTimeArr: (arr[i].arr[4].split("|"))[0].split(" ")
                    }],
                    priceInfos: [
                        {
                            baseFare: (arr[i].arr[5].indexOf("$") != -1 ? arr[i].arr[5].substr(1) : arr[i].arr[5]) * 1,
                            currency: "USD",
                            passengerType: "ADT",
                            tax: 0
                        }
                    ]
                })
            } else {
                retData.push({
                    fromSegments: [{
                        depAirport: arr[i].arr[0],
                        depCity: arr[i].arr[0],
                        depTime: subDate + ' ' + arr[i].arr[1],
                        arrAirport: arr[i].arr[2],
                        arrCity: arr[i].arr[2],
                        arrTime: subDate + ' ' + arr[i].arr[3],
                        flightNumber: "F9" + ' ' + arr[i].arr[8].substr(-18, 4),
                        flightTime: "",
                        carrier: "F9"
                    },
                    {
                        depAirport: arr[i].arr[4],
                        depCity: arr[i].arr[4],
                        depTime: subDate + ' ' + arr[i].arr[5],
                        arrAirport: arr[i].arr[6],
                        arrCity: arr[i].arr[6],
                        arrTime: subDate + ' ' + arr[i].arr[7],
                        flightNumber: "F9" + ' ' + arr[i].arr[8].substr(-4, 4),
                        flightTime: "",
                        carrier: "F9",
                        // flightTimeArr: (arr[i].arr[8].split("|"))[0].split(" ")
                    }],
                    priceInfos: [
                        {
                            baseFare: (arr[i].arr[9].substr(1)) * 1,
                            currency: "USD",
                            passengerType: "ADT",
                            tax: 0
                        }
                    ]
                })
            }
        }
        retData.forEach(item => {
            item.fromSegments.forEach(it => {
                if (it.arrTime.indexOf("PM") == -1) {
                    it.arrTime = it.arrTime.slice(0, -3)
                    it.arrTime = this.dateFun(it.arrTime)
                } else {
                    it.arrTime = new Date(new Date(it.arrTime.slice(0, -3)).setHours(new Date(it.arrTime.slice(0, -3)).getHours() + 12))
                    it.arrTime = this.dateFun(it.arrTime)
                }
                if (it.depTime.indexOf("PM") == -1) {
                    it.depTime = it.depTime.slice(0, -3)
                    it.depTime = this.dateFun(it.depTime)
                } else {
                    it.depTime = new Date(new Date(it.depTime.slice(0, -3)).setHours(new Date(it.depTime.slice(0, -3)).getHours() + 12))
                    it.depTime = this.dateFun(it.depTime)
                }
            })
        })
        let res = JSON.stringify(retData)
        return res
    } catch (e) {
        return "数据解析异常：" + ' ' + e
    }
}
function dateFun(date) {
    let arrStr = "";
    arrStr = new Date(date)
    dateTime = arrStr.getFullYear() + '-' + (arrStr.getMonth() + 1 >= 10 ? arrStr.getMonth() + 1 : "0" + (arrStr.getMonth() + 1)) + '-' + (arrStr.getDate() >= 10 ? arrStr.getDate() : "0" + arrStr.getDate()) + ' ' + arrStr.getHours().toString().padStart(2, "0") + ':' + arrStr.getMinutes().toString().padStart(2, "0") + ':' + arrStr.getSeconds().toString().padStart(2, "0");
    // dateTime2 = new Date(dateTime);
    // let mon = dateTime2.getMonth() + 1;
    // let day = dateTime2.getDate();
    // let submitDate = "";

    return dateTime
}
let data = fun(objStr, dateItem)
console.log(data)