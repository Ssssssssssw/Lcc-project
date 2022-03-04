
//  获取币种
let currency = null;
let cookieCurrency = null;
currency = document.querySelector("#site-header-menu-root > div > div:nth-child(3) > div.mcp-selector-site-header > span").textContent
let cookieCurrencyInfo = document.cookie.split(";")
cookieCurrencyInfo.forEach(item => {
    if (item.indexOf("currency") > -1 && item.length == 13) {
        cookieCurrency = item.split("=")[1]
        if (cookieCurrency != currency) {
            document.querySelector(`div[class='mcp-selector-dropdown__item'][data-currency-code='${cookieCurrency}']`).click()
        }
    }
})
//  获取航班信息
let flightInfo = document.querySelector("#availabilityForm > div.js-nw-terms-conditions-section").getAttribute("data-nwf");
let dataArr = JSON.parse(flightInfo)
//  获取价格信息
// try {
let priceInfo = document.querySelector("#datalayer-offered-product").getAttribute("data-offered-products")
let priceObj = JSON.parse(priceInfo)
let priceArr = priceObj.productDetails
// 获取查询信息
let info = []
if (dataArr.length > 0) {
    let serchInfo = document.querySelector("#price-watch-dialog").getAttribute("data-props");
    info = JSON.parse(serchInfo)
}
// let serchInfo = document.querySelector("#price-watch-dialog").getAttribute("data-props");
// info = JSON.parse(serchInfo)

function clickFun(info, currency) {
    // document.querySelector(`#economy-${from}-${to} > div.display-currency-AUD > div:nth-child(${i + 3}) > div > div > div.flight-card.js-fare-row-summary > div.flight-card-details-price > div.flight-card-details > div > span.info-show.js-more-info-button`).click()
    let from = info.searchInfo.originAirport;
    let to = info.searchInfo.destinationAirport;
    let itemArr = document.querySelectorAll(`#economy-${from}-${to} > div.display-currency-${currency}`)
    let arr = [].slice.apply(itemArr)[0].childNodes
    let changeArr = [].slice.apply(arr)
    for (let i = 0; i < changeArr.length; i++) {
        if (changeArr[i].nodeName == "#text") {
            changeArr.splice(i, 1)
        }
    }
    let resArr = changeArr.slice(0, changeArr.length - 5)
    resArr.splice(0, 2)
    for (let i = 0; i < resArr.length; i++) {
        document.querySelector(`#economy-${from}-${to} > div.display-currency-${currency} > div:nth-child(${i + 3}) > div > div > div.flight-card.js-fare-row-summary > div.flight-card-details-price > div.flight-card-details > div > span.info-show.js-more-info-button`).click()
    }
}
function flightDuration(info, currency) {
    try {
        clickFun(info, currency)
        let from = info.searchInfo.originAirport;
        let to = info.searchInfo.destinationAirport;
        let itemArr = document.querySelectorAll(`#economy-${from}-${to} > div.display-currency-${currency}`)
        let arr = [].slice.apply(itemArr)[0].childNodes
        let changeArr = [].slice.apply(arr)
        for (let i = 0; i < changeArr.length; i++) {
            if (changeArr[i].nodeName == "#text") {
                changeArr.splice(i, 1)
            }
        }
        let resArr = changeArr.slice(0, changeArr.length - 5)
        resArr.splice(0, 2)
        let totalItemArr = [];
        // clickFun(i, from, to)
        // 获取飞行时长以及航班号
        for (let i = 0; i < resArr.length; i++) {
            let itemTimeArr = document.querySelectorAll(`#economy-${from}-${to} > div.display-currency-${currency} > div:nth-child(${i + 3}) > div > div > div.qa-flight-card-details`)
            itemTimeArr[0].priceArr = itemTimeArr[0].parentNode.innerText.split("\n")
            itemTimeArr[0].priceArr.forEach((item, index) => {
                if (item == "Select flight") {
                    itemTimeArr[0].price = itemTimeArr[0].priceArr[index - 1]
                }
            })
            itemTimeArr[0].arr = itemTimeArr[0].innerText.split("\n")
            itemTimeArr[0].firstFlightTimeArr = itemTimeArr[0].arr[6].split(" ")
            itemTimeArr[0].productType = resArr[i].innerText.split("\n")[0] == "Sale" ? "sale" : ""
            itemTimeArr[0].firstFlightNum = itemTimeArr[0].arr[1]
            itemTimeArr[0].firstFlightTime = itemTimeArr[0].firstFlightTimeArr[3].replace(/[a-zA-Z]/g, "") * 1 * 60 + itemTimeArr[0].firstFlightTimeArr[4].replace(/[a-zA-Z]/g, "") * 1
            itemTimeArr[0].arr.forEach((item, index) => {
                if (item == "Flight 2:") {
                    itemTimeArr[0].secondFlightTimeArr = itemTimeArr[0].arr[index + 6].split(" ")
                    itemTimeArr[0].secondFlightNum = itemTimeArr[0].arr[index + 1]
                    itemTimeArr[0].secondFlightTime = itemTimeArr[0].secondFlightTimeArr[3].replace(/[a-zA-Z]/g, "") * 1 * 60 + itemTimeArr[0].secondFlightTimeArr[4].replace(/[a-zA-Z]/g, "") * 1
                }
            })
            // if (itemTimeArr[0].arr.length == 15 || itemTimeArr[0].arr.length == 16) {
            //     itemTimeArr[0].secondFlightTimeArr = itemTimeArr[0].arr[14].split(" ")
            //     itemTimeArr[0].secondFlightNum = itemTimeArr[0].arr[9]
            //     itemTimeArr[0].secondFlightTime = itemTimeArr[0].secondFlightTimeArr[3].replace(/[a-zA-Z]/g, "") * 1 * 60 + itemTimeArr[0].secondFlightTimeArr[4].replace(/[a-zA-Z]/g, "") * 1
            // }
            // //  secondFilghtNum 位置不對  需要重新取
            // if (itemTimeArr[0].arr.length == 18) {
            //     itemTimeArr[0].secondFlightTimeArr = itemTimeArr[0].arr[15].split(" ")
            //     itemTimeArr[0].secondFlightNum = itemTimeArr[0].arr[10]
            //     itemTimeArr[0].secondFlightTime = itemTimeArr[0].secondFlightTimeArr[3].replace(/[a-zA-Z]/g, "") * 1 * 60 + itemTimeArr[0].secondFlightTimeArr[4].replace(/[a-zA-Z]/g, "") * 1
            // }
            totalItemArr.push({
                arr: itemTimeArr[0].arr,
                firstFlightNum: itemTimeArr[0].firstFlightNum,
                firstFlightTimeArr: itemTimeArr[0].firstFlightTimeArr,
                firstFlightTime: itemTimeArr[0].firstFlightTime,
                secondFlightTimeArr: itemTimeArr[0].secondFlightTimeArr,
                secondFlightNum: itemTimeArr[0].secondFlightNum,
                secondFlightTime: itemTimeArr[0].secondFlightTime,
                // saleStatus: itemTimeArr[0].saleStatus,
                price: itemTimeArr[0].price,
                productType: itemTimeArr[0].productType,
            })
        }
        return totalItemArr
    } catch (e) {
        return "ParseException"
    }
}




function dataFun(dataArr, priceArr, info, currency, flightTimeData) {
    try {

        let retData = [];
        let arr = [];
        for (let i = 0; i < priceArr.length; i++) {
            priceArr[i].flightNum = priceArr[i].sku.split(",")
        }
        for (let i = 0; i < dataArr.length; i++) {
            arr.push({ journeySellKey: dataArr[i].flightSellKey })
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i].segments = []
            arr[i].firstArr = null;
            arr[i].secondArr = null;
            //  判断该航班有没有中转航班 然后分开做处理
            if (arr[i].journeySellKey.indexOf("^") > -1) {
                arr[i].segments = arr[i].journeySellKey.split("^")
            } else {
                arr[i].segments.push(arr[i].journeySellKey)
            }
            // 机票费
            // arr[i].price = arr[i].bundles.regularInclusiveAmount
            arr[i].firstArr = arr[i].segments[0].replace(/~~/g, "").split("~")
            //  处理时间
            arr[i].firstDepTimeArr = arr[i].firstArr[3].split(" ");
            arr[i].firstDepYmdArr = arr[i].firstDepTimeArr[0].split("/");
            arr[i].firstDepTime = arr[i].firstDepYmdArr[2] + "-" + arr[i].firstDepYmdArr[0] + "-" + arr[i].firstDepYmdArr[1] + " " + arr[i].firstDepTimeArr[1] + ":00";
            arr[i].firstArrTimeArr = arr[i].firstArr[5].split(" ");
            arr[i].firstArrYmdArr = arr[i].firstArrTimeArr[0].split("/");
            arr[i].firstArrTime = arr[i].firstArrYmdArr[2] + "-" + arr[i].firstArrYmdArr[0] + "-" + arr[i].firstArrYmdArr[1] + " " + arr[i].firstArrTimeArr[1] + ":00";
            //  secondArr只有中转的时候才有信息，segments代表直飞或中转
            if (arr[i].segments.length == 2) {
                arr[i].secondArr = arr[i].segments[1].replace(/~~/g, "").split("~")
                arr[i].secondDepTimeArr = arr[i].secondArr[3].split(" ")
                arr[i].secondDepYmdArr = arr[i].secondDepTimeArr[0].split("/")
                arr[i].secondDepTime = arr[i].secondDepYmdArr[2] + "-" + arr[i].secondDepYmdArr[0] + "-" + arr[i].secondDepYmdArr[1] + " " + arr[i].secondDepTimeArr[1] + ":00"
                arr[i].secondArrTimeArr = arr[i].secondArr[5].split(" ")
                arr[i].secondArrYmdArr = arr[i].secondArrTimeArr[0].split("/")
                arr[i].secondArrTime = arr[i].secondArrYmdArr[2] + "-" + arr[i].secondArrYmdArr[0] + "-" + arr[i].secondArrYmdArr[1] + " " + arr[i].secondArrTimeArr[1] + ":00"
            }
            if (arr[i].segments.length == 1) {
                retData.push({
                    fromSegments: [{
                        depAirport: arr[i].firstArr[2].trim(),
                        depCity: arr[i].firstArr[2].trim(),
                        depTime: arr[i].firstDepTime,
                        arrAirport: arr[i].firstArr[4],
                        arrCity: arr[i].firstArr[4],
                        arrTime: arr[i].firstArrTime,
                        flightNumber: arr[i].firstArr[0] + arr[i].firstArr[1].trim(),
                        flightTime: "",
                        carrier: arr[i].firstArr[0],
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: arr[i].firstArr[0],
                        operatingFlightNumber: arr[i].firstArr[0] + arr[i].firstArr[1].trim(),
                        seatsRemain: info.searchInfo.adults * 1 + info.searchInfo.children * 1 + '',
                        stopQuantity: "0",
                    }],
                    priceInfos: [
                        {
                            baseFare: null,
                            currency: currency,
                            passengerType: "ADT",
                            quantity: info.searchInfo.adults,
                            tax: 0
                        }
                    ]
                })
            } else {
                retData.push({
                    fromSegments: [{
                        depAirport: arr[i].firstArr[2].trim(),
                        depCity: arr[i].firstArr[2].trim(),
                        depTime: arr[i].firstDepTime,
                        arrAirport: arr[i].firstArr[4],
                        arrCity: arr[i].firstArr[4],
                        arrTime: arr[i].firstArrTime,
                        flightNumber: arr[i].firstArr[0] + arr[i].firstArr[1].trim(),
                        flightTime: "",
                        carrier: arr[i].firstArr[0],
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: arr[i].firstArr[0],
                        operatingFlightNumber: arr[i].firstArr[0] + arr[i].firstArr[1].trim(),
                        seatsRemain: info.searchInfo.adults * 1 + info.searchInfo.children * 1 + '',
                        stopQuantity: "0",
                    },
                    {
                        depAirport: arr[i].secondArr[2].trim(),
                        depCity: arr[i].secondArr[2].trim(),
                        depTime: arr[i].secondDepTime,
                        arrAirport: arr[i].secondArr[4],
                        arrCity: arr[i].secondArr[4],
                        arrTime: arr[i].secondArrTime,
                        flightNumber: arr[i].secondArr[0] + arr[i].secondArr[1].trim(),
                        flightTime: "",
                        carrier: arr[i].firstArr[0],
                        flightClass: "E",
                        operatingCarrier: "E",
                        operatingFlightNumber: arr[i].secondArr[0] + arr[i].secondArr[1].trim(),
                        seatsRemain: info.searchInfo.adults * 1 + info.searchInfo.children * 1 + '',
                        stopQuantity: "0",
                    }],
                    priceInfos: [
                        {
                            baseFare: null,
                            currency: currency,
                            passengerType: "ADT",
                            quantity: info.searchInfo.adults,
                            tax: 0,
                        }
                    ]
                })
            }
        }
        matchingPrice(retData, priceArr, flightTimeData)
        return retData
    }
    catch (e) {
        return "ParseException"
    }
}
function matchingPrice(retData, priceArr, flightTimeData) {
    retData.forEach(item => {
        flightTimeData.forEach(it => {
            if (item.fromSegments.length == 1 && it.firstFlightNum && !it.secondFlightNum) {
                if (item.fromSegments[0].flightNumber == it.firstFlightNum) {
                    item.priceInfos[0].baseFare = it.price ? it.price.replace(",", "") * 1 : 0
                }
            } else if (item.fromSegments.length == 2 && it.firstFlightNum && it.secondFlightNum) {
                if (item.fromSegments[0].flightNumber == it.firstFlightNum && item.fromSegments[1].flightNumber == it.secondFlightNum) {
                    item.priceInfos[0].baseFare = it.price ? it.price.replace(",", "") * 1 : 0
                }
            }
        })
    })
    // retData.forEach(item => {
    //     priceArr.forEach(it => {
    //         if (item.fromSegments.length == 1 && it.flightNum.length == 1) {
    //             if (item.fromSegments[0].flightNumber == it.flightNum[0]) {
    //                 item.priceInfos[0].baseFare = it.priceInAud
    //             }
    //         } else if (item.fromSegments.length == 2 && it.flightNum.length == 2) {
    //             if (item.fromSegments[0].flightNumber == it.flightNum[0] && item.fromSegments[1].flightNumber == it.flightNum[1]) {
    //                 item.priceInfos[0].baseFare = it.priceInAud
    //             }
    //         }
    //     })
    // })
}
function resultData(flightTimeData, flightInfoPrice, info, currency) {
    if (flightTimeData == "ParseException" || flightInfoPrice == "ParseException") {
        return "ParseException"
    }
    flightInfoPrice.forEach((item, index) => {
        if (info.searchInfo.children) {
            item.priceInfos.push({
                baseFare: item.priceInfos[0].baseFare,
                currency: currency,
                passengerType: "CHD",
                quantity: info.searchInfo.children,
                tax: 0,
            })
        }
    })
    flightInfoPrice.forEach(item => {
        flightTimeData.forEach(it => {
            if (item.fromSegments.length == 1 && it.firstFlightNum && !it.secondFlightNum) {
                if (item.fromSegments[0].flightNumber == it.firstFlightNum) {
                    item.fromSegments[0].flightTime = it.firstFlightTime
                    // item.fromSegments[0].saleStatus = it.saleStatus
                    item.productType = it.productType
                }
            }
            if (item.fromSegments.length == 2 && it.firstFlightNum && it.secondFlightNum) {
                if (item.fromSegments[0].flightNumber == it.firstFlightNum && item.fromSegments[1].flightNumber == it.secondFlightNum) {
                    item.fromSegments[0].flightTime = it.firstFlightTime
                    item.fromSegments[1].flightTime = it.secondFlightTime
                    item.productType = it.productType
                    // item.fromSegments[0].saleStatus = it.saleStatus
                    // item.fromSegments[1].saleStatus = it.saleStatus
                }

            }
        })
    })

    return flightInfoPrice
}
function delItem(data) {
    let arr = data
    let arr2 = [];
    arr.forEach((item, index) => {
        if (item.priceInfos[0].baseFare > 0) {
            arr2.push(item)
        }
    })
    return JSON.stringify(arr2)
}
let filItem = null;
if (dataArr.length > 0) {
    let flightTimeData = flightDuration(info, currency)
    let flightInfoPrice = dataFun(dataArr, priceArr, info, currency, flightTimeData)
    let resData = resultData(flightTimeData, flightInfoPrice, info, currency)
    if (typeof resData == "string") {
        filItem = []
    } else {
        filItem = delItem(resData)
    }
} else {
    filItem = []
}
let arr = filItem
console.log(arr);






















// let itemArr = document.querySelector("#js-bundles-on-flight-data").getAttribute("data-bundles-on-flight")
// console.log(itemArr);

// function fun(itemArr) {
//     let retData = []
//     let arr = [];
//     let dataArr = JSON.parse(itemArr)[0].flights
//     for (let i = 0; i < dataArr.length; i++) {
//         if (dataArr[i].bundles.length > 0) {
//             arr.push({ journeySellKey: dataArr[i].journeySellKey, bundles: dataArr[i].bundles[0] })
//         }
//     }
//     for (let i = 0; i < arr.length; i++) {
//         arr[i].segments = []
//         arr[i].firstArr = null;
//         arr[i].secondArr = null;
//         //  判断该航班有没有中转航班 然后分开做处理
//         if (arr[i].journeySellKey.indexOf("^") > -1) {
//             arr[i].segments = arr[i].journeySellKey.split("^")
//         } else {
//             arr[i].segments.push(arr[i].journeySellKey)
//         }
//         arr[i].price = arr[i].bundles.regularInclusiveAmount
//         arr[i].firstArr = arr[i].segments[0].replace(/~~/g, "").split("~")
//         //  处理时间
//         arr[i].firstDepTimeArr = arr[i].firstArr[3].split(" ");
//         arr[i].firstDepYmdArr = arr[i].firstDepTimeArr[0].split("/");
//         arr[i].firstDepTime = arr[i].firstDepYmdArr[2] + "-" + arr[i].firstDepYmdArr[0] + "-" + arr[i].firstDepYmdArr[1] + " " + arr[i].firstDepTimeArr[1] + ":00";
//         arr[i].firstArrTimeArr = arr[i].firstArr[5].split(" ");
//         arr[i].firstArrYmdArr = arr[i].firstArrTimeArr[0].split("/");
//         arr[i].firstArrTime = arr[i].firstArrYmdArr[2] + "-" + arr[i].firstArrYmdArr[0] + "-" + arr[i].firstArrYmdArr[1] + " " + arr[i].firstArrTimeArr[1] + ":00";
//         //  secondArr只有中转的时候才有信息，segments代表直飞或中转
//         if (arr[i].segments.length == 2) {
//             arr[i].secondArr = arr[i].segments[1].replace(/~~/g, "").split("~")
//             arr[i].secondDepTimeArr = arr[i].secondArr[3].split(" ")
//             arr[i].secondDepYmdArr = arr[i].secondDepTimeArr[0].split("/")
//             arr[i].secondDepTime = arr[i].secondDepYmdArr[2] + "-" + arr[i].secondDepYmdArr[0] + "-" + arr[i].secondDepYmdArr[1] + " " + arr[i].secondDepTimeArr[1] + ":00"
//             arr[i].secondArrTimeArr = arr[i].secondArr[5].split(" ")
//             arr[i].secondArrYmdArr = arr[i].secondArrTimeArr[0].split("/")
//             arr[i].secondArrTime = arr[i].secondArrYmdArr[2] + "-" + arr[i].secondArrYmdArr[0] + "-" + arr[i].secondArrYmdArr[1] + " " + arr[i].secondArrTimeArr[1] + ":00"
//         }
//         if (arr[i].segments.length == 1) {
//             retData.push({
//                 fromSegments: [{
//                     depAirport: arr[i].firstArr[2].trim(),
//                     depCity: arr[i].firstArr[2].trim(),
//                     depTime: arr[i].firstDepTime,
//                     arrAirport: arr[i].firstArr[4],
//                     arrCity: arr[i].firstArr[4],
//                     arrTime: arr[i].firstArrTime,
//                     flightNumber: arr[i].firstArr[0] + arr[i].firstArr[1].trim(),
//                     flightTime: "",
//                     carrier: arr[i].firstArr[0],
//                     cabin: "",
//                     flightClass: "",
//                     operatingCarrier: "",
//                     operatingFlightNumber: "",
//                     seatsRemain: "",
//                     stopQuantity: "",
//                 }],
//                 priceInfos: [
//                     {
//                         baseFare: arr[i].price,
//                         currency: "USD",
//                         passengerType: "ADT",
//                         quantity: "",
//                         tax: 0
//                     }
//                 ]
//             })
//         } else {
//             retData.push({
//                 fromSegments: [{
//                     depAirport: arr[i].firstArr[2].trim(),
//                     depCity: arr[i].firstArr[2].trim(),
//                     depTime: arr[i].firstDepTime,
//                     arrAirport: arr[i].firstArr[4],
//                     arrCity: arr[i].firstArr[4],
//                     arrTime: arr[i].firstArrTime,
//                     flightNumber: arr[i].firstArr[0] + arr[i].firstArr[1].trim(),
//                     flightTime: "",
//                     carrier: arr[i].firstArr[0],
//                     cabin: "",
//                     flightClass: "",
//                     operatingCarrier: "",
//                     operatingFlightNumber: "",
//                     seatsRemain: "",
//                     stopQuantity: "0",
//                 },
//                 {
//                     depAirport: arr[i].secondArr[2].trim(),
//                     depCity: arr[i].secondArr[2].trim(),
//                     depTime: arr[i].secondDepTime,
//                     arrAirport: arr[i].secondArr[4],
//                     arrCity: arr[i].secondArr[4],
//                     arrTime: arr[i].secondArrTime,
//                     flightNumber: arr[i].secondArr[0] + arr[i].secondArr[1].trim(),
//                     flightTime: "",
//                     carrier: arr[i].secondArr[0],
//                     flightClass: "",
//                     operatingCarrier: "",
//                     operatingFlightNumber: "",
//                     seatsRemain: "",
//                     stopQuantity: "0",
//                 }],
//                 priceInfos: [
//                     {
//                         baseFare: arr[i].price,
//                         currency: "USD",
//                         passengerType: "",
//                         tax: 0,
//                         quantity: "",
//                     }
//                 ]
//             })
//         }
//     }
// }
// fun(itemArr)





// let itemArr = document.querySelectorAll("#economy-OOL-PER > div.display-currency-AUD > div")
// document.querySelector("#economy--SYD > div.display-currency-AUD")
// document.querySelector("#economy-SYD-NRT > div.display-currency-AUD")
// let itemArr = document.querySelectorAll("#economy-ADL-BNE > div.display-currency-AUD > div")
// function resData(itemArr) {
//     let resArr = [];
//     let arr = [].slice.apply(itemArr);
//     arr.splice(0, 2)
//     arr.splice(-5)
//     for (let i = 0; i < arr.length; i++) {
//         arr[i].arr = arr[i].innerText.split("\n");
//         if (arr[i].arr.indexOf("Sale") == -1) {
//             resArr.push(arr[i])
//         }
//     }
//     console.log(resArr);
// }

// resData(itemArr)