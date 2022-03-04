
document.querySelector("#sessionRefresh").click()
let objStr = document.querySelectorAll("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div")
let dateItem = document.querySelectorAll("#ReviewFlightSummaryWrapper > div > div.summary-flight-section > div:nth-child(1) > div > div.summary-journey-info > div.summary-journey-info-datetime-container > span.js-summary-journey-info-datetime")

let chdAdtNum = document.querySelector("#greenBarLeftContentWrapper > div > a > div > div:nth-child(1)").textContent.split("|")
let adtNum = 0;
let chdNum = 0;
adtNum = chdAdtNum[0].replace(" ", "")
adtNum = adtNum.substring(0, adtNum.indexOf("a"))
if (chdAdtNum.length == 3) {
    chdNum = chdAdtNum[1].replace(" ", "")
    chdNum = chdNum.substring(0, chdNum.indexOf("c")).trim()
}

function dateFun(date) {
    let arrStr = "";
    arrStr = new Date(date)
    dateTime = arrStr.getFullYear() + '-' + (arrStr.getMonth() + 1 >= 10 ? arrStr.getMonth() + 1 : "0" + (arrStr.getMonth() + 1)) + '-' + (arrStr.getDate() >= 10 ? arrStr.getDate() : "0" + arrStr.getDate()) + ' ' + arrStr.getHours().toString().padStart(2, "0") + ':' + arrStr.getMinutes().toString().padStart(2, "0") + ':' + arrStr.getSeconds().toString().padStart(2, "0");
    return dateTime
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
        return "EmptyDiv"
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
            let flightInfo = document.querySelectorAll("#flightsInfoPlaceholder > div")
            let info = [].slice.apply(flightInfo)
            for (j = 0; j < info.length; j++) {
                info[j].info = info[j].innerText.split("\n")
                if (info[j].info.length == "15") {
                    let carrierStr = (info[j].innerText.split("\n")[1]).slice(8)
                    info[j].carrierFlightNum = carrierStr;
                    info[j].carrier = carrierStr.slice(0, 3);
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
                    fromSegments: [{
                        info: info[0].dateType,
                        depAirport: arr[i].arr[0],
                        depCity: arr[i].arr[0],
                        depTime: subDate + ' ' + arr[i].arr[1],
                        arrAirport: arr[i].arr[2],
                        arrCity: arr[i].arr[2],
                        arrTime: subDate + ' ' + arr[i].arr[3],
                        flightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        flightTime: info[0].arr[0] * 1 * 60 + info[0].arr[2] * 1 + "",
                        carrier: info[0].carrier.replace(" ", ""),
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: info[0].carrier.replace(" ", ""),
                        operatingFlightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        seatsRemain: adtNum * 1 + chdNum * 1 + "",
                        stopQuantity: "0",
                    }],
                    priceInfos: [
                        {
                            baseFare: (arr[i].arr[5].indexOf("$") != -1 ? arr[i].arr[5].substr(1) : arr[i].arr[5]) * 1,
                            currency: "USD",
                            passengerType: "ADT",
                            quantity: adtNum * 1,
                            tax: 0
                        }
                    ]
                })
            } else {
                retData.push({
                    fromSegments: [{
                        info: info[0].dateType,
                        depAirport: arr[i].arr[0],
                        depCity: arr[i].arr[0],
                        depTime: subDate + ' ' + arr[i].arr[1],
                        arrAirport: arr[i].arr[2],
                        arrCity: arr[i].arr[2],
                        arrTime: subDate + ' ' + arr[i].arr[3],
                        flightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        flightTime: info[0].arr[0] * 1 * 60 + info[0].arr[2] * 1 + "",
                        carrier: info[0].carrier.replace(" ", ""),
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: info[0].carrier.replace(" ", ""),
                        operatingFlightNumber: info[0].carrierFlightNum.replace(" ", ""),
                        seatsRemain: adtNum * 1 + chdNum * 1 + "",
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
                        flightNumber: info[1].carrierFlightNum.replace(" ", ""),
                        flightTime: info[1].arr[0] * 1 * 60 + info[1].arr[2] * 1 + "",
                        carrier: info[1].carrier.replace(" ", ""),
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: info[1].carrier.replace(" ", ""),
                        operatingFlightNumber: info[1].carrierFlightNum.replace(" ", ""),
                        seatsRemain: adtNum * 1 + chdNum * 1 + "",
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
            item.fromSegments.forEach(it => {
                if ((new Date(it.depTime.slice(0, -3)).getHours() == "12" && it.depTime.indexOf("PM") != -1) || (it.depTime.indexOf("PM") == -1 && new Date(it.depTime.slice(0, -3)).getHours() != "12")) {
                    it.depTime = it.depTime.slice(0, -3)
                    it.depTime = dateFun(it.depTime)
                } else {
                    it.depTime = new Date(new Date(it.depTime.slice(0, -3)).setHours(new Date(it.depTime.slice(0, -3)).getHours() + 12))
                    it.depTime = dateFun(it.depTime)
                }
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
            if (item.fromSegments.length == 1) {
                if (item.fromSegments[0].info.indexOf("+1") != -1) {
                    if (new Date(item.fromSegments[0].arrTime).getHours() != "0") {
                        item.fromSegments[0].arrTime = dateFun(new Date(new Date(item.fromSegments[0].arrTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                    }
                }
            }
            if (item.fromSegments.length == 2) {
                if (item.fromSegments[0].info.indexOf("+1") != -1 && item.fromSegments[1].info.indexOf("+1") != -1) {
                    if (new Date(item.fromSegments[0].arrTime).getHours() != "0") {
                        item.fromSegments[0].arrTime = dateFun(new Date(new Date(item.fromSegments[0].arrTime).getTime() + 1000 * 60 * 60 * 24))
                    }
                    item.fromSegments[1].arrTime = dateFun(new Date(new Date(item.fromSegments[1].arrTime).getTime() + 1000 * 60 * 60 * 24))
                    item.fromSegments[1].depTime = dateFun(new Date(new Date(item.fromSegments[1].depTime).getTime() + 1000 * 60 * 60 * 24))
                } else if (item.fromSegments[0].info.indexOf("+1") == -1 && item.fromSegments[1].info.indexOf("+1") != -1) {
                    if ((new Date(item.fromSegments[1].depTime).getHours() * 60 + new Date(item.fromSegments[1].depTime).getMinutes()) < (new Date(item.fromSegments[0].depTime).getHours() * 60 + (new Date(item.fromSegments[0].depTime).getMinutes()))) {
                        item.fromSegments[1].arrTime = dateFun(new Date(new Date(item.fromSegments[1].arrTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                        item.fromSegments[1].depTime = dateFun(new Date(new Date(item.fromSegments[1].depTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                    } else {
                        item.fromSegments[1].arrTime = dateFun(new Date(new Date(item.fromSegments[1].arrTime).getTime() + 1000 * 60 * 60 * 24), "sec")
                    }
                }
            }
        })
        return retData;
    } catch (e) {
        return "ParseException"
    }
}
clickFun(objStr, dateItem);
setTimeout(() => {
    let s = "OK";
    let r = fun(objStr, dateItem, adtNum, chdNum)
    if (typeof r == 'string') {
        s = r;
        r = []
    }
    chrome.storage.local.get([
        "userId",
        "jobId"
    ], function (data) {
        chrome.storage.local.set({
            jobResult: {
                diggerId: data.userId,
                jobId: data.jobId,
                status: s,
                routings: r
            }
        }, function () {
            sendMessage({
                type: 'taskReport'
            });
        })
    })
}, 2000)