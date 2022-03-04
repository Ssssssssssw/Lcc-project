let interval = setInterval(() => {
    let text = document.querySelector("#dxp-shared-flight-selection > div.va-flight-selection.dxp-flight-selection.b2c.currency > div:nth-child(1) > h3 > span").textContent
    if (text == "Which departing flight would you like?") {
        clearInterval(interval)
        let urlArr = window.location.href.split("?")[1].split("&");
        let adt = "";
        let chd = "";
        let dateArr = [];
        let date = "";
        urlArr.forEach((item, index) => {
            if (item.indexOf("ADT") > -1) {
                adt = urlArr[index].split("=")[1];
            }
            if (item.indexOf("CHD") > -1) {
                chd = urlArr[index].split("=")[1];
            }
            if (item.indexOf("date") > -1) {
                dateArr = urlArr[index].split("=")[1]
                date = dateArr.split("-")[2] + '-' + dateArr.split("-")[0] + '-' + dateArr.split("-")[1]
            }
        })
        function resFun(adt, chd) {
            let resData = [];
            let itemArr = document.querySelectorAll("#dxp-flight-table-section")
            if (itemArr.length == 0) {
                return resData
            }
            let arr = [].slice.apply(itemArr[0].childNodes)
            arr.shift()
            try {
                for (let i = 0; i < arr.length; i++) {
                    arr[i].innerTextArr = arr[i].innerText.split("\n")
                    if (arr[i].innerText.indexOf("1 Stop") > -1 || arr[i].innerText.indexOf("2 Stops") > -1) {
                    } else {
                        arr[i].childNodes[0].childNodes[0].childNodes[3].childNodes[0].click()
                        arr[i].priceInfoArr = arr[i].childNodes[0].childNodes[2].childNodes[2].innerText.split("\n");
                        priceOk:
                        for (let j = 0; j < arr[i].priceInfoArr.length; j++) {
                            if (arr[i].priceInfoArr[j] == "Select Lite brand offer. Price:") {
                                if (arr[i].priceInfoArr[j + 1].indexOf("$") > -1) {
                                    arr[i].price = arr[i].priceInfoArr[j + 1]
                                    arr[i].priceType = "Lite"
                                    break priceOk
                                }
                            }
                            if (arr[i].priceInfoArr[j] == "Select Choice brand offer. Price:") {
                                if (arr[i].priceInfoArr[j + 1].indexOf("$") > -1) {
                                    arr[i].price = arr[i].priceInfoArr[j + 1]
                                    arr[i].priceType = "Choice"
                                    break priceOk

                                }
                            }
                            if (arr[i].priceInfoArr[j] == "Select Flex brand offer. Price:") {
                                if (arr[i].priceInfoArr[j + 1].indexOf("$") > -1) {
                                    arr[i].price = arr[i].priceInfoArr[j + 1]
                                    arr[i].priceType = "Flex"
                                    break priceOk
                                }
                            }
                            if (arr[i].priceInfoArr[j] == "Select Business brand offer. Price:") {
                                if (arr[i].priceInfoArr[j + 1].indexOf("$") > -1) {
                                    arr[i].price = arr[i].priceInfoArr[j + 1]
                                    arr[i].priceType = "Business"
                                    break priceOk
                                }
                            }
                        }
                        arr[i].innerTextArr.forEach((item, index) => {
                            if (item == "to") {
                                arr[i].depAirport = arr[i].innerTextArr[index - 1]
                                arr[i].arrAirport = arr[i].innerTextArr[index + 2]
                                arr[i].rawDepTime = date + " " + arr[i].innerTextArr[index - 2]
                                arr[i].rawArrTime = date + " " + arr[i].innerTextArr[index + 1]
                            }
                            if (item == "Stops") {
                                arr[i].firstFlightNumber = arr[i].innerTextArr[index + 1].split("·")[1]
                                arr[i].flightTimeArr = arr[i].innerTextArr[index - 1].split("·")[0]
                            }
                        })
                        if ((new Date(arr[i].rawDepTime.slice(0, -2)).getHours() == "12" && arr[i].rawDepTime.indexOf("pm") > -1) || (new Date(arr[i].rawDepTime.slice(0, -2)).getHours() != "12" && arr[i].rawDepTime.indexOf("am") > -1)) {
                            arr[i].depTime = arr[i].rawDepTime.slice(0, -2)
                            arr[i].depTime = dateFun(arr[i].depTime)
                        } else {
                            if ((new Date(arr[i].rawDepTime.slice(0, -2)).getHours() == "12" && arr[i].rawDepTime.indexOf("am") > -1)) {
                                arr[i].depTime = new Date(new Date(arr[i].rawDepTime.slice(0, -2)).setHours(new Date(arr[i].rawDepTime.slice(0, -2)).getHours() - 12))
                                arr[i].depTime = dateFun(arr[i].depTime)
                            } else {
                                arr[i].depTime = new Date(new Date(arr[i].rawDepTime.slice(0, -2)).setHours(new Date(arr[i].rawDepTime.slice(0, -2)).getHours() + 12))
                                arr[i].depTime = dateFun(arr[i].depTime)
                            }
                        }
                        if ((new Date(arr[i].rawArrTime.slice(0, -2)).getHours() == "12" && arr[i].rawArrTime.indexOf("pm") > -1) || (new Date(arr[i].rawArrTime.slice(0, -2)).getHours() != "12" && arr[i].rawArrTime.indexOf("am") > -1)) {
                            arr[i].arrTime = arr[i].rawArrTime.slice(0, -2)
                            arr[i].arrTime = dateFun(arr[i].arrTime)
                        } else {
                            if ((new Date(arr[i].rawArrTime.slice(0, -2)).getHours() == "12" && arr[i].rawArrTime.indexOf("am") > -1)) {
                                arr[i].arrTime = new Date(new Date(arr[i].rawArrTime.slice(0, -2)).setHours(new Date(arr[i].rawArrTime.slice(0, -2)).getHours() - 12))
                                arr[i].arrTime = dateFun(arr[i].arrTime)
                            } else {
                                arr[i].arrTime = new Date(new Date(arr[i].rawArrTime.slice(0, -2)).setHours(new Date(arr[i].rawArrTime.slice(0, -2)).getHours() + 12))
                                arr[i].arrTime = dateFun(arr[i].arrTime)
                            }
                        }
                        if (arr[i].flightTimeArr.indexOf("hr") > -1 && arr[i].flightTimeArr.indexOf("min") > -1) {
                            arr[i].flightTime = arr[i].flightTimeArr.split("hr")[0].trim() * 1 * 60 + arr[i].flightTimeArr.split("hr")[1].substring(-1, 3).trim() * 1
                        }
                        if (arr[i].flightTimeArr.indexOf("hr") > -1 && arr[i].flightTimeArr.indexOf("min") == -1) {
                            arr[i].flightTime = arr[i].flightTimeArr.split("hr")[0].trim() * 1 * 60
                        }
                        if (arr[i].flightTimeArr.indexOf("hr") == -1 && arr[i].flightTimeArr.indexOf("min") > -1) {
                            arr[i].flightTime = arr[i].flightTimeArr.split("hr")[1].substring(-1, 3).trim() * 1
                        }
                        if (arr[i].innerText.indexOf("+1 day") > -1) {
                            arr[i].arrTime = dateFun(new Date(new Date(arr[i].arrTime).getTime() + 1000 * 60 * 60 * 24))
                        }
                        resData.push({
                            fromSegments: [
                                {
                                    depAirport: arr[i].depAirport,
                                    depCity: arr[i].depAirport,
                                    depTime: arr[i].depTime,
                                    arrAirport: arr[i].arrAirport,
                                    arrCity: arr[i].arrAirport,
                                    arrTime: arr[i].arrTime,
                                    flightNumber: arr[i].firstFlightNumber.trim(),
                                    flightTime: arr[i].flightTime + "",
                                    carrier: "VA",
                                    cabin: "E",
                                    flightClass: "E",
                                    operatingCarrier: "VA",
                                    operatingFlightNumber: arr[i].firstFlightNumber.trim(),
                                    seatsRemain: adt * 1 + chd * 1 + "",
                                    stopQuantity: "0",
                                }
                            ],
                            priceInfos: [{
                                baseFare: arr[i].price,
                                currency: "AUD",
                                passengerType: "ADT",
                                quantity: adt,
                                tax: 0,
                            }],
                            productType: arr[i].priceType
                        })
                    }
                }
                return priceFun(resData, chd)
            } catch (e) {
                return "ParseException"
            }
        }
        function priceFun(resData, chd) {
            let airPortCodeArr = airPortCodeFun()
            resData.forEach((item, index) => {
                item.fromSegments.forEach(it => {
                    airPortCodeArr.forEach(airIt => {
                        if (it.depAirport == airIt.label) {
                            it.depCity = it.depAirport = airIt.val
                        }
                        if (it.arrAirport == airIt.label) {
                            it.arrCity = it.arrAirport = airIt.val
                        }
                    })
                })
                if (item.priceInfos[0].baseFare.indexOf(",") > -1) {
                    item.priceInfos[0].baseFare = item.priceInfos[0].baseFare.replace(",", "") * 1
                }
                item.priceInfos[0].baseFare = item.priceInfos[0].baseFare.substr(1) * 1
                if (chd > 0) {
                    item.priceInfos.push({
                        baseFare: item.priceInfos[0].baseFare,
                        currency: "AUD",
                        passengerType: "CHD",
                        quantity: chd,
                        tax: 0,
                    })
                }
                if (item.fromSegments[0].flightNumber.indexOf("VA") == -1) {
                    resData.splice(index, 1)
                }
            })
            return resData
        }
        function dateFun(date) {
            let arrStr = "";
            arrStr = new Date(date)
            dateTime = arrStr.getFullYear() + '-' + (arrStr.getMonth() + 1 >= 10 ? arrStr.getMonth() + 1 : "0" + (arrStr.getMonth() + 1)) + '-' + (arrStr.getDate() >= 10 ? arrStr.getDate() : "0" + arrStr.getDate()) + ' ' + arrStr.getHours().toString().padStart(2, "0") + ':' + arrStr.getMinutes().toString().padStart(2, "0") + ':' + arrStr.getSeconds().toString().padStart(2, "0");
            return dateTime
        }
        function airPortCodeFun() {
            let arr = [{
                label: "Adelaide",
                val: "ADL"
            }, {
                label: "Alice Springs",
                val: "ASP"
            }, {
                label: "Ballina Byron",
                val: "BNK"
            }, {
                label: "Brisbane",
                val: "BNE"
            }, {
                label: "Broome",
                val: "BME"
            }, {
                label: "Cairns",
                val: "CNS"
            }, {
                label: "Canberra",
                val: "CBR"
            }, {
                label: "Christmas Island",
                val: "XCH"
            }, {
                label: "Cocos Islands",
                val: "CCK"
            }, {
                label: "Coffs Harbour",
                val: "CFS"
            }, {
                label: "Darwin",
                val: "DRW"
            }, {
                label: "Emerald",
                val: "EMD"
            }, {
                label: "Gladstone",
                val: "GLT"
            }, {
                label: "Gold Coast",
                val: "OOL"
            }, {
                label: "Hamilton Island",
                val: "HTI"
            }, {
                label: "Hayman Island",
                val: "HIS"
            }, {
                label: "Hobart",
                val: "HBA"
            }, {
                label: "Kalgoorlie",
                val: "KGI"
            },
            {
                label: "Karratha",
                val: "KTA"
            }, {
                label: "Kununurra",
                val: "KNX"
            }, {
                label: "Launceston",
                val: "LST"
            }, {
                label: "Mackay",
                val: "MKY"
            }, {
                label: "Melbourne",
                val: "MEL"
            }, {
                label: "Mount Isa",
                val: "ISA"
            }, {
                label: "Newcastle - Port Stephens",
                val: "NTL"
            }, {
                label: "Newman",
                val: "ZNE"
            }, {
                label: "Onslow",
                val: "ONS"
            }, {
                label: "Perth",
                val: "PER"
            }, {
                label: "Port Hedland",
                val: "PHE"
            }, {
                label: "Rockhampton",
                val: "ROK"
            }, {
                label: "Sunshine Coast",
                val: "MCY"
            }, {
                label: "Sydney",
                val: "SYD"
            }, {
                label: "Townsville",
                val: "TSV"
            }, {
                label: "Whitsunday Coast",
                val: "PPP"
            }]
            return arr
        }
        let resArr = resFun(adt, chd)
        let s = "OK";
        let r = resArr;
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
    }
}, 3000)