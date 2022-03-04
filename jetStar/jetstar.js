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

let flightInfo = document.querySelector("#availabilityForm > div.js-nw-terms-conditions-section").getAttribute("data-nwf");
let dataArr = JSON.parse(flightInfo)

let priceInfo = document.querySelector("#datalayer-offered-product").getAttribute("data-offered-products")
let priceObj = JSON.parse(priceInfo)

let priceArr = priceObj.productDetails
let info = [];
if (dataArr.length > 0) {
    let serchInfo = document.querySelector("#price-watch-dialog").getAttribute("data-props");
    info = JSON.parse(serchInfo)
}

function clickFun(info, currency) {
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
        for (let i = 0; i < resArr.length; i++) {
            let itemTimeArr = document.querySelectorAll(`#economy-${from}-${to} > div.display-currency-${currency} > div:nth-child(${i + 3}) > div > div > div.qa-flight-card-details`)
            itemTimeArr[0].priceArr = itemTimeArr[0].parentNode.innerText.split("\n")
            itemTimeArr[0].priceArr.forEach((item, index) => {
                if (item == "Select flight") {
                    itemTimeArr[0].price = itemTimeArr[0].priceArr[index - 1]
                }
            })
            itemTimeArr[0].arr = itemTimeArr[0].innerText.split("\n")
            itemTimeArr[0].productType = resArr[i].innerText.split("\n")[0] == "Sale" ? "sale" : ""
            itemTimeArr[0].firstFlightTimeArr = itemTimeArr[0].arr[6].split(" ")
            itemTimeArr[0].firstFlightNum = itemTimeArr[0].arr[1]
            itemTimeArr[0].firstFlightTime = itemTimeArr[0].firstFlightTimeArr[3].replace(/[a-zA-Z]/g, "") * 1 * 60 + itemTimeArr[0].firstFlightTimeArr[4].replace(/[a-zA-Z]/g, "") * 1
            itemTimeArr[0].arr.forEach((item, index) => {
                if (item == "Flight 2:") {
                    itemTimeArr[0].secondFlightTimeArr = itemTimeArr[0].arr[index + 6].split(" ")
                    itemTimeArr[0].secondFlightNum = itemTimeArr[0].arr[index + 1]
                    itemTimeArr[0].secondFlightTime = itemTimeArr[0].secondFlightTimeArr[3].replace(/[a-zA-Z]/g, "") * 1 * 60 + itemTimeArr[0].secondFlightTimeArr[4].replace(/[a-zA-Z]/g, "") * 1
                }
            })
            totalItemArr.push({
                arr: itemTimeArr[0].arr,
                firstFlightNum: itemTimeArr[0].firstFlightNum,
                firstFlightTimeArr: itemTimeArr[0].firstFlightTimeArr,
                firstFlightTime: itemTimeArr[0].firstFlightTime,
                secondFlightTimeArr: itemTimeArr[0].secondFlightTimeArr,
                secondFlightNum: itemTimeArr[0].secondFlightNum,
                secondFlightTime: itemTimeArr[0].secondFlightTime,
                productType: itemTimeArr[0].productType,
                price: itemTimeArr[0].price
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
            if (arr[i].journeySellKey.indexOf("^") > -1) {
                arr[i].segments = arr[i].journeySellKey.split("^")
            } else {
                arr[i].segments.push(arr[i].journeySellKey)
            }
            arr[i].firstArr = arr[i].segments[0].replace(/~~/g, "").split("~")
            arr[i].firstDepTimeArr = arr[i].firstArr[3].split(" ");
            arr[i].firstDepYmdArr = arr[i].firstDepTimeArr[0].split("/");
            arr[i].firstDepTime = arr[i].firstDepYmdArr[2] + "-" + arr[i].firstDepYmdArr[0] + "-" + arr[i].firstDepYmdArr[1] + " " + arr[i].firstDepTimeArr[1] + ":00";
            arr[i].firstArrTimeArr = arr[i].firstArr[5].split(" ");
            arr[i].firstArrYmdArr = arr[i].firstArrTimeArr[0].split("/");
            arr[i].firstArrTime = arr[i].firstArrYmdArr[2] + "-" + arr[i].firstArrYmdArr[0] + "-" + arr[i].firstArrYmdArr[1] + " " + arr[i].firstArrTimeArr[1] + ":00";
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
                        carrier: arr[i].secondArr[0],
                        cabin: "E",
                        flightClass: "E",
                        operatingCarrier: arr[i].secondArr[0],
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
        matchingPrice(retData, flightTimeData)
        return retData
    }
    catch (e) {
        return "ParseException"
    }
}
function matchingPrice(retData, flightTimeData) {
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
                    item.fromSegments[0].flightTime = it.firstFlightTime + ""
                    item.productType = it.productType
                }
            }
            if (item.fromSegments.length == 2 && it.firstFlightNum && it.secondFlightNum) {
                if (item.fromSegments[0].flightNumber == it.firstFlightNum && item.fromSegments[1].flightNumber == it.secondFlightNum) {
                    item.fromSegments[0].flightTime = it.firstFlightTime + "";
                    item.fromSegments[1].flightTime = it.secondFlightTime + "";
                    item.productType = it.productType
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
    return arr2
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
console.log("arr", arr);




//  传参方式打开页面

// let interval = setInterval(() => {
//     document.cookie = "currency=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.jetstar.com";
//     let searchInfoArr = window.location.href.split("&")
//     searchInfoArr.forEach(item => {
//         if (item.indexOf("currency") > -1) {
//             let currencyInfo = item.split("=")
//             document.cookie = currencyInfo[0] + '=' + currencyInfo[1] + ";path=/;domain=.jetstar.com";
//         }
//     })
//     let btnStatus = document.querySelector('#main-content > div > div.masthead-carousel-container.masthead-carousel-container--static-content > div.mps-wrapper > div.gutter > div > div > div.mps__row.submitFlightSearch > button')
//     if (btnStatus != null) {
//         clearInterval(interval)
//         document.querySelector('#main-content > div > div.masthead-carousel-container.masthead-carousel-container--static-content > div.mps-wrapper > div.gutter > div > div > div.mps__row.submitFlightSearch > button').click()
//     }
// }, 2000)