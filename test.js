let reqData = {
    fromCity: "MCO",
    toCity: "ORD",
    departdate: "2022-01-03",
    adultNum: 4,
    childNum: 1
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
document.querySelector("#passengersInput").click()
document.querySelector("#passengersInput").value = reqData.adultNum + ' ' + "Adults";
//  成人数
let adultNum = document.querySelector("#adult-count").textContent = reqData.adultNum;
// 儿童数
if (reqData.childNum) {
    document.querySelector("#passengersInput").value = reqData.adultNum + ' ' + "Adults" + "," + " " + reqData.childNum + " " + "Child";
    for (let i = 0; i < reqData.childNum; i++) {
        document.querySelector("#findFlights > div.passengers > fieldset > div > div > div.pax-type-dropdown > section:nth-child(4) > div.tab > div.controls > img.add-child").click()
    }
}
let chdNum = document.querySelector("#child-count").textContent = reqData.childNum;
// 搜索方式
let searchType = document.querySelector("#findFlights > div.search-by > div.divPromoPaymentType > div.divPaymentType > fieldset > label.rb-container.dollars").click()
// 点击搜索
document.querySelector("#btnSearch").click()

// ----------------------------

//  获取查询结果列表
let objStr = document.querySelectorAll("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div")
//  获取查询日期
let dateItem = document.querySelectorAll("#ReviewFlightSummaryWrapper > div > div.summary-flight-section > div:nth-child(1) > div > div.summary-journey-info > div.summary-journey-info-datetime-container > span.js-summary-journey-info-datetime")
// 获取成人 儿童数
let chdAdtNum = document.querySelector("#greenBarLeftContentWrapper > div > a > div > div:nth-child(1)").textContent.split("|")
let adtNum = 0;
let chdNum = 0;
adtNum = chdAdtNum[0].replace(" ", "")
adtNum = adtNum.substring(0, adtNum.indexOf("a"))
if (chdAdtNum.length == 3) {
    chdNum = chdAdtNum[1].replace(" ", "")
    chdNum = chdNum.substring(0, chdNum.indexOf("c")).trim()
}

function clickFun(objStr) {
    let arr = [].slice.apply(objStr)
    arr.splice(0, 1)
    for (let i = 0; i < arr.length; i++) {
        document.querySelector(`#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div:nth-child(${i + 2}) > div.ibe-flight-info-row.w-row > div.ibe-flight-col1.w-col.w-col-8.w-col-medium-6.w-col-small-6 > div > div.ibe-flight-duration > div.ibe-flight-duration-time > div > span.ibe-flight-duration-flightslink > span > span > a`).click()
    }
}
function clickItemFun(i) {
    document.querySelector(`#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div:nth-child(${i + 2}) > div.ibe-flight-info-row.w-row > div.ibe-flight-col1.w-col.w-col-8.w-col-medium-6.w-col-small-6 > div > div.ibe-flight-duration > div.ibe-flight-duration-time > div > span.ibe-flight-duration-flightslink > span > span > a`).click()
}
function fun(objStr, dateItem, adtNum, chdNum) {

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
            clickItemFun(i)
            // document.querySelector(`#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div:nth-child(${i + 2}) > div.ibe-flight-info-row.w-row > div.ibe-flight-col1.w-col.w-col-8.w-col-medium-6.w-col-small-6 > div > div.ibe-flight-duration > div.ibe-flight-duration-time > div > span.ibe-flight-duration-flightslink > span > span > a`).click()
            //  每个航班的信息
            let flightInfo = document.querySelectorAll("#flightsInfoPlaceholder > div")
            let info = [].slice.apply(flightInfo)
            for (j = 0; j < info.length; j++) {
                // 详细信息
                info[j].info = info[j].innerText.split("\n")
                if (info[j].info.length == "15") {
                    let carrierStr = (info[j].innerText.split("\n")[1]).slice(8)
                    info[j].carrierFlightNum = carrierStr;
                    info[j].carrier = carrierStr.slice(0, 3);
                    //  获取每段航班飞行时长
                    info[j].dateType = info[j].info[7]
                    info[j].arr = (info[j].dateType.slice(19)).split(" ");
                } else {
                    let carrierStr = info[j].info[2].slice(8)
                    info[j].carrierFlightNum = carrierStr;
                    info[j].carrier = carrierStr.slice(0, 3);
                    info[j].dateType = info[j].info[8]
                    info[j].arr = (info[j].dateType.slice(19)).split(" ");
                }
            }
            arr[i].arr = arr[i].innerText.split("\n");
            if (arr[i].arr.length == 7 || arr[i].arr.length == 8) {
                retData.push({
                    segments: [{
                        info: info[0].dateType,
                        depAirport: arr[i].arr[0],
                        depCity: arr[i].arr[0],
                        depTime: subDate + ' ' + arr[i].arr[1],
                        arrAirport: arr[i].arr[2],
                        arrCity: arr[i].arr[2],
                        arrTime: subDate + ' ' + arr[i].arr[3],
                        // flightNumber: info[0].carrier + arr[i].arr[4].substr(-4, 4),
                        flightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        // flightTime: ((arr[i].arr[4].split("|"))[0].split(" ")[0] * 1 * 60 + (arr[i].arr[4].split("|"))[0].split(" ")[2] * 1) + "",
                        flightTime: info[0].arr[0] * 1 * 60 + info[0].arr[2] * 1 + "",
                        carrier: info[0].carrier.replace(" ", ""),
                        // flightTimeArr: (arr[i].arr[4].split("|"))[0].split(" ")
                        itineraryIndex: 1,
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: info[0].carrier.replace(" ", ""),
                        operatingFlightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        seatsRemain: adtNum * 1 + chdNum * 1 + "", // 成人和儿童总共多少人
                        segmentIndex: 1,
                        stopQuantity: "0",
                    }],
                    priceInfos: [
                        {
                            baseFare: (arr[i].arr[5].indexOf("$") != -1 ? arr[i].arr[5].substr(1) : arr[i].arr[5]) * 1,
                            currency: "USD",
                            passengerType: "ADT",
                            quantity: adtNum * 1, //  人数
                            tax: 0
                        }
                    ]
                })
            } else {
                retData.push({
                    segments: [{
                        info: info[0].dateType,
                        depAirport: arr[i].arr[0],
                        depCity: arr[i].arr[0],
                        depTime: subDate + ' ' + arr[i].arr[1],
                        arrAirport: arr[i].arr[2],
                        arrCity: arr[i].arr[2],
                        arrTime: subDate + ' ' + arr[i].arr[3],
                        // flightNumber: info[0].carrier + arr[i].arr[8].substr(-18, 4),
                        flightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        flightTime: info[0].arr[0] * 1 * 60 + info[0].arr[2] * 1 + "",
                        carrier: info[0].carrier.replace(" ", ""),
                        itineraryIndex: 1,
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: info[0].carrier.replace(" ", ""),
                        operatingFlightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        seatsRemain: adtNum * 1 + chdNum * 1 + "", // 成人和儿童总共多少人
                        segmentIndex: 1,
                        stopQuantity: "0",
                    },
                    {
                        info: info[1].dateType,
                        depAirport: arr[i].arr[4],
                        depCity: arr[i].arr[4],
                        depTime: subDate + ' ' + arr[i].arr[5],
                        arrAirport: arr[i].arr[6],
                        arrCity: arr[i].arr[6],
                        arrTime: subDate + ' ' + arr[i].arr[7],
                        // flightNumber: info[1].carrier + arr[i].arr[8].substr(-4, 4),
                        flightNumber: info[1].carrierFlightNum.replace(" ", ""),
                        flightTime: info[1].arr[0] * 1 * 60 + info[1].arr[2] * 1 + "",
                        carrier: info[1].carrier.replace(" ", ""),
                        // flightTimeArr: (arr[i].arr[8].split("|"))[0].split(" ")
                        itineraryIndex: 1,
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: info[1].carrier.replace(" ", ""),
                        operatingFlightNumber: info[1].carrierFlightNum.replace(" ", ""),
                        seatsRemain: adtNum * 1 + chdNum * 1 + "", // 成人和儿童总共多少人
                        segmentIndex: 2,
                        stopQuantity: "0",
                    }],
                    priceInfos: [
                        {
                            baseFare: (arr[i].arr[9].substr(1)) * 1,
                            currency: "USD",
                            passengerType: "ADT",
                            tax: 0,
                            quantity: adtNum * 1,
                        }
                    ]
                })
            }
        }

        retData.forEach(item => {
            if (chdNum) {
                item.priceInfos.push({
                    baseFare: item.priceInfos[0].baseFare,
                    currency: "USD",
                    passengerType: "CHD",
                    tax: 0,
                    quantity: chdNum * 1,
                })
            }
            // item.segments.forEach(it => {
            //     if (it.arrTime.indexOf("PM") == -1) {
            //         it.arrTime = it.arrTime.slice(0, -3)
            //         it.arrTime = dateFun(it.arrTime)
            //     } else {
            //         it.arrTime = new Date(new Date(it.arrTime.slice(0, -3)).setHours(new Date(it.arrTime.slice(0, -3)).getHours() + 12))
            //         it.arrTime = dateFun(it.arrTime)
            //     }
            //     if (it.depTime.indexOf("PM") == -1) {
            //         it.depTime = it.depTime.slice(0, -3)
            //         it.depTime = dateFun(it.depTime)
            //     } else {
            //         it.depTime = new Date(new Date(it.depTime.slice(0, -3)).setHours(new Date(it.depTime.slice(0, -3)).getHours() + 12))
            //         it.depTime = dateFun(it.depTime)
            //     }
            // })

            item.segments.forEach(it => {
                //  日期的小时时间是不是12 来进行时间判断进行+12小时  pm12 中午12点   AM12 凌晨12点
                //  起飞时间
                if ((new Date(it.depTime.slice(0, -3)).getHours() == "12" && it.depTime.indexOf("PM") != -1) || (it.depTime.indexOf("PM") == -1 && new Date(it.depTime.slice(0, -3)).getHours() != "12")) {
                    it.depTime = it.depTime.slice(0, -3)
                    it.depTime = dateFun(it.depTime)
                } else {
                    it.depTime = new Date(new Date(it.depTime.slice(0, -3)).setHours(new Date(it.depTime.slice(0, -3)).getHours() + 12))
                    it.depTime = dateFun(it.depTime)
                }
                // 到达时间
                if ((new Date(it.arrTime.slice(0, -3)).getHours() == "12" && it.arrTime.indexOf("PM") != -1) || (it.arrTime.indexOf("PM") == -1 && new Date(it.arrTime.slice(0, -3)).getHours() != "12")) {
                    it.arrTime = it.arrTime.slice(0, -3)
                    it.arrTime = dateFun(it.arrTime)
                } else {
                    it.arrTime = new Date(new Date(it.arrTime.slice(0, -3)).setHours(new Date(it.arrTime.slice(0, -3)).getHours() + 12))
                    it.arrTime = dateFun(it.arrTime)
                }
            })

        })
        retData.forEach(item => {
            if (item.segments.length == 1) {
                console.log(new Date(item.segments[0].arrTime).getHours());
                if (item.segments[0].info.indexOf("+1") != -1) {  //  
                    if (new Date(item.segments[0].arrTime).getHours() != "0") {
                        item.segments[0].arrTime = dateFun(new Date(new Date(item.segments[0].arrTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                    }
                }
            }
            if (item.segments.length == 2) {
                if (item.segments[0].info.indexOf("+1") != -1 && item.segments[1].info.indexOf("+1") != -1) {
                    if (new Date(item.segments[0].arrTime).getHours() != "0") {
                        item.segments[0].arrTime = dateFun(new Date(new Date(item.segments[0].arrTime).getTime() + 1000 * 60 * 60 * 24))
                    }
                    item.segments[1].arrTime = dateFun(new Date(new Date(item.segments[1].arrTime).getTime() + 1000 * 60 * 60 * 24))
                    item.segments[1].depTime = dateFun(new Date(new Date(item.segments[1].depTime).getTime() + 1000 * 60 * 60 * 24))
                } else if (item.segments[0].info.indexOf("+1") == -1 && item.segments[1].info.indexOf("+1") != -1) {
                    if ((new Date(item.segments[1].depTime).getHours() * 60 + new Date(item.segments[1].depTime).getMinutes()) < (new Date(item.segments[0].depTime).getHours() * 60 + (new Date(item.segments[0].depTime).getMinutes()))) {
                        item.segments[1].arrTime = dateFun(new Date(new Date(item.segments[1].arrTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                        item.segments[1].depTime = dateFun(new Date(new Date(item.segments[1].depTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                    } else {
                        item.segments[1].arrTime = dateFun(new Date(new Date(item.segments[1].arrTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                    }
                }
            }

        })
        let res = JSON.stringify(retData)
        // let res = retData
        return res
    } catch (e) {
        return "数据解析异常：" + ' ' + e
    }

}
function dateFun(date, type) {
    let arrStr = "";
    arrStr = new Date(date)
    dateTime = arrStr.getFullYear() + '-' + (arrStr.getMonth() + 1 >= 10 ? arrStr.getMonth() + 1 : "0" + (arrStr.getMonth() + 1)) + '-' + (arrStr.getDate() >= 10 ? arrStr.getDate() : "0" + arrStr.getDate()) + ' ' + arrStr.getHours().toString().padStart(2, "0") + ':' + arrStr.getMinutes().toString().padStart(2, "0") + ':' + arrStr.getSeconds().toString().padStart(2, "0");
    return dateTime
}
clickFun(objStr, dateItem)
setTimeout(function () {
    let data = fun(objStr, dateItem, adtNum, chdNum)
    console.log("返回的数据", data);
}, 3000)