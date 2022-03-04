// https://booking.jetstar.com/au/en/booking/select-flights
// 选中某个航线的航班信息
// let objInfo = {
//     bookData: { //  需要使用哪个航班来进行生单
//         firstFlightNum: "JQ774",
//         secondFlightNum: "",
//     },
//     countryRoute: "AU", // 哪个国家的航班  填写乘客信息的时候需要用到
//     // 乘客信息
//     passengerInfo: [{
//         titleVal: "MR", //  Mr=MR Ms=MS Miss=MISS Mrs=MRS Captain=CAPT Doctor=DR Professor=PROF  Reverend=REV
//         firstName: "wang",
//         lastName: "haha",
//         birthDay: "1978-01-02",
//         postCode: "450000",
//         email: "123456@qq.com",
//         countryCode: "AU",  //  二字码
//         phoneNumber: "13523512345"
//     }, {
//         titleVal: "MS", //  Mr=MR Ms=MS Miss=MISS Mrs=MRS Captain=CAPT Doctor=DR Professor=PROF  Reverend=REV
//         firstName: "huang",
//         lastName: "haha",
//         birthDay: "1978-01-02",
//         postCode: "450000",
//         email: "123456@qq.com",
//         countryCode: "AU",  //  二字码
//         phoneNumber: "13523512345"
//     }, {
//         titleVal: "MISS", //  儿童只有 Master = MSTR  Miss = MISS 
//         firstName: "wang",
//         lastName: "haha",
//         birthDay: "2018-01-02",
//         postCode: "450000",
//         email: "123456@qq.com",
//         countryCode: "AU",  //  二字码
//         phoneNumber: "13523512345"
//     }],
//     // 联系人信息
//     contactInfo: {
//         firstName: "huang",
//         lastName: "sisi",
//         email: "123456@qq.com",
//         postCode: "450000"
//     },
//     // 支付信息
//     payInfo: {
//         cardHoldersName: "wanghaha",
//         cardNo: '7521 3245 6528 9522',
//         month: "5", //1-12
//         year: "2023", // 2022-2032
//         cvv: "072"
//     }
// }
let reqData = {
    carrier: "VTJQ",
    queryReq: {
        childNumber: "0",
        flightOption: "oneway",
        fromCity: "MEL",
        toCity: "SYD",
        retDate: "",
        adultNumber: "4",
        startDate: "2022-01-27"
    },
    routing: {
        fareType: "public",
        flightClass: "Economy",
        flightClassCode: "E",
        flightOption: "oneWay",
        fromSegments: [
            {
                aircraftCode: "",
                arrAirport: "ATL",
                arrCity: "ATL",
                arrTime: "2022-01-27 13:30:00",
                cabin: "E",
                carrier: "F9",
                codeShare: false,
                depAirport: "LGA",
                depCity: "NYC",
                depTime: "2022-01-27 10:46:00",
                flightClass: "E",
                flightNumber: "F91511",
                flightTime: "164",
                itineraryIndex: 1,
                operatingCarrier: "F9",
                operatingFlightNumber: "F91511",
                seatsRemain: "4",
                segmentIndex: 1,
                stayTime: "",
                stopCities: "",
                stopQuantity: "0"
            }
        ],
        routeCodes: {
            airports: "LGA-ATL",
            cabins: "E",
            carriers: "F9",
            flightNumbers: "JQ560,JQ906",
            flightTimes: "2022-01-27 10:46:00/2022-01-27 13:30:00",
            operatingCarriers: "F9"
        },
        validatingCarrier: "F9"
    },
    passengers: [
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1999-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "FUQIANG",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        }
    ],
    // 联系人信息
    contact: {
        email: "flt.change@flightroutes24.com",
        mobile: "13392157931",
        name: "路路",
        firstName: "FUQIANG",
        lastName: "WANG",
        postCode: "450000"
    },
    // 支付信息
    payInfo: {
        cardHoldersName: "wanghaha",
        cardNo: "7521 3245 6528 9522",
        month: "5", //1-12
        year: "2023", // 2022-2032
        cvv: "072"
    },
    other: {
        countryRoute: "AU", //国家二字码 哪个国家的航线  填写乘客信息的时候需要用到
    }
}

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
let currency = document.querySelector("#site-header-menu-root > div > div:nth-child(3) > div.mcp-selector-site-header > span").textContent

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
                saleStatus: itemTimeArr[0].saleStatus,
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
console.log(arr);

//  以下是预定的代码 先拿到爬出来的数据判断有没有航班
if (arr.length > 0) {
    shengdanFun(info, reqData, currency)
}
function shengdanFun(info, reqData, currency) {
    let flightNumbersFirst = reqData.routing.routeCodes.flightNumbers.split(",")[0]
    let flightNumbersSecond = reqData.routing.routeCodes.flightNumbers.split(",")[1]
    // SELPRICE 选中航班的价格
    let selPrice = null;
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
    let itemTimeArr = null;
    ok:
    for (let i = 0; i < resArr.length; i++) {
        itemTimeArr = document.querySelectorAll(`#economy-${from}-${to} > div.display-currency-${currency} > div:nth-child(${i + 3}) > div > div > div.qa-flight-card-details`)
        itemTimeArr[0].arr = itemTimeArr[0].innerText.split("\n")
        // 当前订单是否是sale价
        itemTimeArr[0].saleStatus = resArr[i].innerText.split("\n")[0] == "Sale" ? true : false
        itemTimeArr[0].priceArr = itemTimeArr[0].parentNode.innerText.split("\n")
        itemTimeArr[0].priceArr.forEach((item, index) => {
            if (item == "Select flight") {
                itemTimeArr[0].price = itemTimeArr[0].priceArr[index - 1].replace(",", "")
            }
        })
        itemTimeArr[0].firstFlightNum = itemTimeArr[0].arr[1]
        itemTimeArr[0].arr.forEach((item, index) => {
            if (item == "Flight 2:") {
                itemTimeArr[0].secondFlightNum = itemTimeArr[0].arr[index + 1]
            }
        })

        if (flightNumbersFirst && !flightNumbersSecond) {
            if (itemTimeArr[0].firstFlightNum == flightNumbersFirst) {
                selPrice = itemTimeArr[0].price
                itemTimeArr[0].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[5].click()
                break ok
            }
        }
        if (flightNumbersFirst && flightNumbersSecond) {
            if (itemTimeArr[0].firstFlightNum == flightNumbersFirst && itemTimeArr[0].secondFlightNum == flightNumbersSecond) {
                selPrice = itemTimeArr[0].price
                itemTimeArr[0].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[5].click()
                break ok
            }
        }
    }
    let basePrice = null;
    let basePriceText = document.querySelector(".bundle-tile__price-wrapper:nth-of-type(1)").textContent.substr(1)
    if (basePriceText.indexOf(",") > -1) {
        basePrice = basePriceText.replace(",", "")
    } else if (basePriceText.indexOf(".00") > -1) {
        basePrice = basePriceText.replace(".00", "")
    }

    if (basePrice > selPrice) {
        return fasle
    } else {
        document.querySelector(".bundle-tile__price-wrapper:nth-of-type(1)").click()
        document.querySelector("#submit_button").click()
        document.querySelector("#inflow-club-jetstar-drawer > div > div.fml-footer-summary.fml-footer-summary--drawer.fml-footer-summary--compact-false > div > div > div > div.fml-footer-summary__action--drawer > div > div > button").click()
    }
}


// https://booking.jetstar.com/au/en/booking/baggage
// baggage 页面
baggageFun()
function baggageFun() {
    document.querySelector("#react-baggages-container > section > section > section > div.baggage-option-cards > div:nth-child(1) > div > div.baggage-option-card__action").click()
    document.querySelector("#submit_button").click()
    document.querySelector("#maincontent > div.js-baggage-intercept > div > div.baggage-intercept__cards > div:nth-child(1) > div.baggage-intercept__card__action > div > button").click()
}


// https://booking.jetstar.com/au/en/booking/seats#dyna-seatmap
//seats选座页面
seatFun()
function seatFun() {
    let seatsTime = 4000;
    document.querySelector("#dyna-seatmap-root > div > div.dyna-seatmap-container__block > div.passenger-navigator-incrustation > div > section > div.opt-out-tile > div > button").click()
    setTimeout(function () {
        document.querySelector("#dyna-seatmap-root > div > div.dyna-seatmap-container__block > div.passenger-navigator-incrustation > div > section > div.opt-out-tile > div > button").click()
    }, seatsTime)
    setTimeout(function () {
        document.querySelector("#submit_button").click()
    }, seatsTime + 3000)
}


// https://booking.jetstar.com/au/en/booking/customise
//  extras
extraFun()
function extraFun() {
    document.querySelector("#submit_button").click();
}


// https://booking.jetstar.com/au/en/booking/passengers
//  乘客信息
// 联系人信息
let reqData = {
    carrier: "VTJQ",
    queryReq: {
        childNumber: "0",
        flightOption: "oneway",
        fromCity: "MEL",
        toCity: "SYD",
        retDate: "",
        adultNumber: "4",
        startDate: "2022-01-27"
    },
    routing: {
        fareType: "public",
        flightClass: "Economy",
        flightClassCode: "E",
        flightOption: "oneWay",
        fromSegments: [
            {
                aircraftCode: "",
                arrAirport: "ATL",
                arrCity: "ATL",
                arrTime: "2022-01-27 13:30:00",
                cabin: "E",
                carrier: "F9",
                codeShare: false,
                depAirport: "LGA",
                depCity: "NYC",
                depTime: "2022-01-27 10:46:00",
                flightClass: "E",
                flightNumber: "F91511",
                flightTime: "164",
                itineraryIndex: 1,
                operatingCarrier: "F9",
                operatingFlightNumber: "F91511",
                seatsRemain: "4",
                segmentIndex: 1,
                stayTime: "",
                stopCities: "",
                stopQuantity: "0"
            }
        ],
        routeCodes: {
            airports: "LGA-ATL",
            cabins: "E",
            carriers: "F9",
            flightNumbers: "JQ560,JQ906",
            flightTimes: "2022-01-27 10:46:00/2022-01-27 13:30:00",
            operatingCarriers: "F9"
        },
        validatingCarrier: "F9"
    },
    passengers: [
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1999-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "FUQIANG",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        },
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1989-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "aa",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        },
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1979-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "ss",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        },
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1969-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "qq",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        }
    ],
    // 联系人信息
    contact: {
        email: "flt.change@flightroutes24.com",
        mobile: "13392157931",
        name: "路路",
        firstName: "FUQIANG",
        lastName: "WANG",
        postCode: "450000"
    },
    // 支付信息
    payInfo: {
        cardHoldersName: "wanghaha",
        cardNo: "7521 3245 6528 9522",
        month: "5", //1-12
        year: "2023", // 2022-2032
        cvv: "072"
    },
    other: {
        countryRoute: "AU", // 哪个国家的航班  填写乘客信息的时候需要用到
    }
}
passengerInfoFun(reqData)
function passengerInfoFun(reqData) {
    for (let i = 0; i < reqData.passengers.length; i++) {
        if (reqData.passengers[i].ageType + reqData.passengers[i].gender == '0M') {
            reqData.passengers[i].titleVal = "MR"
        }
        if (reqData.passengers[i].ageType + reqData.passengers[i].gender == '0F') {
            reqData.passengers[i].titleVal = "MS"
        }
        if (reqData.passengers[i].ageType + reqData.passengers[i].gender == '1M') {
            reqData.passengers[i].titleVal = "MSTR"
        }
        if (reqData.passengers[i].ageType + reqData.passengers[i].gender == '1F') {
            reqData.passengers[i].titleVal = "MISS"
        }
        document.querySelector(`#passenger_title_${i}`).value = reqData.passengers[i].titleVal;
        document.querySelector(`#passenger_Firstname_${i}`).value = reqData.passengers[i].firstName;
        document.querySelector(`#passenger_Lastname_${i}`).value = reqData.passengers[i].lastName
        document.querySelector(`#passengers_${i}__adult-dob-dd`).value = reqData.passengers[i].birthday.split("-")[2];//日
        document.querySelector(`#passengers_${i}__date_of_birth_month_${i}`).value = reqData.passengers[i].birthday.split("-")[1];// 月
        document.querySelector(`#passengers_${i}__date_of_birth_year_${i}`).value = reqData.passengers[i].birthday.split("-")[0]; // 年
        if (reqData.other.countryRoute == "AU") {
            document.querySelector(`#passenger_PostCode_${i}`).value = reqData.contact.postCode;  //  邮编 postcode
            document.querySelector(`#passenger_Email_${i}`).value = reqData.contact.email; // email 
            document.querySelector(`#passenger_CountryCode_${i}`).value = reqData.passengers[i].nationality;  //  国家地区代码
            document.querySelector(`#passenger_PhoneNumber_${i}`).value = reqData.contact.mobile; // 手机号
        }
    }
    //  联系人信息
    document.querySelector("#js-contact_Name_First").value = reqData.contact.firstName; //  firstName
    document.querySelector("#js-contact_Name_Last").value = reqData.contact.lastName; // lastName
    document.querySelector("#contact_Email_Address").value = reqData.contact.email
    document.querySelector("#contact_Postcode").value = reqData.contact.postCode

    //  不添加保险  只有AU有保险按钮
    if (reqData.other.countryRoute == "AU") {
        document.querySelector("#multiple-insurance > div > div.multi-insurance__neutral-option-wrapper > div > div.multi-insurance__neutral-option-button > div.show-for-large-up > button").click()
    }
    document.querySelector("#contact_Phone_Number").value = reqData.contact.mobile
    document.querySelector("#submit_button").click()
}



// https://booking.jetstar.com/au/en/booking/payment
//支付
let reqData = {
    carrier: "VTJQ",
    queryReq: {
        childNumber: "0",
        flightOption: "oneway",
        fromCity: "MEL",
        toCity: "SYD",
        retDate: "",
        adultNumber: "4",
        startDate: "2022-01-27"
    },
    routing: {
        fareType: "public",
        flightClass: "Economy",
        flightClassCode: "E",
        flightOption: "oneWay",
        fromSegments: [
            {
                aircraftCode: "",
                arrAirport: "ATL",
                arrCity: "ATL",
                arrTime: "2022-01-27 13:30:00",
                cabin: "E",
                carrier: "F9",
                codeShare: false,
                depAirport: "LGA",
                depCity: "NYC",
                depTime: "2022-01-27 10:46:00",
                flightClass: "E",
                flightNumber: "F91511",
                flightTime: "164",
                itineraryIndex: 1,
                operatingCarrier: "F9",
                operatingFlightNumber: "F91511",
                seatsRemain: "4",
                segmentIndex: 1,
                stayTime: "",
                stopCities: "",
                stopQuantity: "0"
            }
        ],
        routeCodes: {
            airports: "LGA-ATL",
            cabins: "E",
            carriers: "F9",
            flightNumbers: "JQ560,JQ906",
            flightTimes: "2022-01-27 10:46:00/2022-01-27 13:30:00",
            operatingCarriers: "F9"
        },
        validatingCarrier: "F9"
    },
    passengers: [
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1999-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "FUQIANG",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        },
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1989-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "aa",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        },
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1979-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "ss",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        },
        {
            ageType: 0, // 0+M=MR, 0+F=MS, 1+M=MSTR, 1+F=MISS
            birthday: "1969-12-16",
            cardExpired: "2027-09-03",
            cardIssuePlace: "CN",
            cardNum: "EB1907078",
            cardType: "PP",
            firstName: "qq",
            gender: "M",
            lastName: "WANG",
            name: "WANG/FUQIANG",
            nationality: "CN"
        }
    ],
    // 联系人信息
    contact: {
        email: "flt.change@flightroutes24.com",
        mobile: "13392157931",
        name: "路路",
        firstName: "FUQIANG",
        lastName: "WANG",
        postCode: "450000"
    },
    // 支付信息
    payInfo: {
        cardHoldersName: "wanghaha",
        cardNo: "7521 3245 6528 9522",
        month: "5", //1-12
        year: "2023", // 2022-2032
        cvv: "072"
    },
    other: {
        countryRoute: "AU", // 哪个国家的航班  填写乘客信息的时候需要用到
    }
}
payFun(reqData)
function payFun(reqData) {
    document.querySelector("#js-creditcard-tile").click()
    document.querySelector("#js-PaymentCreditCardNumber").value = reqData.payInfo.cardNo
    document.querySelector("#js-PaymentCreditCardExpiryMonth").value = reqData.payInfo.month
    document.querySelector("#js-PaymentCreditCardExpiryYear").value = reqData.payInfo.year
    document.querySelector("#js-PaymentCreditCardCvv").value = reqData.payInfo.cvv
    document.querySelector("#js-PaymentCardHolderName").value = reqData.payInfo.cardHoldersName
    document.querySelector("#js-AcceptTC").click()
    document.querySelector("#submit_button").click()
}