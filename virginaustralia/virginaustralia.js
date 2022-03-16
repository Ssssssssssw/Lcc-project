let interval = setInterval(() => {
    let text = document.querySelector("#dxp-shared-flight-selection > div.va-flight-selection.dxp-flight-selection.mobile-theme.b2c.currency > div:nth-child(3) > div").textContent
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
            try {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].innerText.indexOf("stop") > -1) {
                    } else {
                        arr[i].innerTextArr = arr[i].innerText.split("\n")
                        console.log(arr[i].innerTextArr);
                        arr[i].rawDepTime = date + ' ' + arr[i].innerTextArr[1]
                        arr[i].rawArrTime = date + ' ' + arr[i].innerTextArr[3]
                        if (arr[i].innerTextArr[5].indexOf("Boeing") > -1) {
                            arr[i].flightNumber = arr[i].innerTextArr[5].split("Boeing")[0].trim().replace(" ", "")
                        } else if (arr[i].innerTextArr[5].indexOf("Saab") > -1) {
                            arr[i].flightNumber = arr[i].innerTextArr[5].split("Saab")[0].trim().replace(" ", "")
                        }
                        arr[i].childNodes[0].click()
                        arr[i].detailInnerTextArr = document.querySelector(".spark-modal__content.content").innerText.split("\n")
                        document.querySelector(".spark-modal__close").click()
                        priceOk:
                        for (let j = 0; j < arr[i].detailInnerTextArr.length; j++) {
                            if (arr[i].detailInnerTextArr[j].indexOf("Lite") > -1) {
                                if (arr[i].detailInnerTextArr[j + 2].indexOf("$") > -1) {
                                    console.log("lite");
                                    arr[i].price = arr[i].detailInnerTextArr[j + 2]
                                    arr[i].priceType = "Lite"
                                    break priceOk;
                                }
                            }
                            if (arr[i].detailInnerTextArr[j].indexOf("Choice") > -1) {
                                if (arr[i].detailInnerTextArr[j + 2].indexOf("$") > -1) {
                                    console.log("Choice");
                                    arr[i].price = arr[i].detailInnerTextArr[j + 2]
                                    arr[i].priceType = "Choice"
                                    break priceOk;
                                }
                            }
                            if (arr[i].detailInnerTextArr[j].indexOf("Flex") > -1) {
                                if (arr[i].detailInnerTextArr[j + 2].indexOf("$") > -1) {
                                    console.log("Flex");
                                    arr[i].price = arr[i].detailInnerTextArr[j + 2]
                                    arr[i].priceType = "Flex"
                                    break priceOk;
                                }
                            }
                            if (arr[i].detailInnerTextArr[j].indexOf("Business") > -1) {
                                if (arr[i].detailInnerTextArr[j + 2].indexOf("$") > -1) {
                                    console.log("Business");
                                    arr[i].price = arr[i].detailInnerTextArr[j + 2]
                                    arr[i].priceType = "Business"
                                    break priceOk;
                                }
                            }
                        }
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
                        if (arr[i].innerTextArr[4].indexOf("hr") > -1 && arr[i].innerTextArr[4].indexOf("min") > -1) {
                            arr[i].flightTime = arr[i].innerTextArr[4].split("hr")[0].trim() * 1 * 60 + arr[i].innerTextArr[4].split("hr")[1].substring(1, 3).trim() * 1
                        }
                        if (arr[i].innerTextArr[4].indexOf("hr") > -1 && arr[i].innerTextArr[4].indexOf("min") == -1) {
                            arr[i].flightTime = arr[i].innerTextArr[4].split("hr")[0].trim() * 1 * 60
                        }
                        if (arr[i].innerTextArr[4].indexOf("hr") == -1 && arr[i].innerTextArr[4].indexOf("min") > -1) {
                            arr[i].flightTime = arr[i].innerTextArr[4].split("hr")[1].substring(1, 3).trim() * 1
                        }
                        resData.push({
                            fromSegments: [
                                {
                                    depAirport: arr[i].innerTextArr[0],
                                    depCity: arr[i].innerTextArr[0],
                                    depTime: arr[i].depTime,
                                    arrAirport: arr[i].innerTextArr[2],
                                    arrCity: arr[i].innerTextArr[2],
                                    arrTime: arr[i].arrTime,
                                    flightNumber: arr[i].flightNumber,
                                    flightTime: arr[i].flightTime + "",
                                    carrier: "VA",
                                    cabin: "E",
                                    flightClass: "E",
                                    operatingCarrier: "VA",
                                    operatingFlightNumber: arr[i].flightNumber,
                                    seatsRemain: adt * 1 + chd * 1 + "",
                                    stopQuantity: "0",
                                }
                            ],
                            priceInfos: [{
                                baseFare: arr[i].price.substr(1) * 1,
                                currency: "AUD",
                                passengerType: "ADT",
                                quantity: adt * 1,
                                tax: 0,
                            }],
                            productType: arr[i].priceType
                        })
                        if (chd > 0) {
                            arr[i].priceInfos.push({
                                baseFare: item.priceInfos[0].baseFare,
                                currency: "AUD",
                                passengerType: "CHD",
                                quantity: chd * 1,
                                tax: 0,
                            })
                        }
                    }
                }
                return resData
            } catch (e) {
                console.log(e);
                return "ParseException"
            }
        }
        function dateFun(date) {
            let arrStr = "";
            arrStr = new Date(date)
            dateTime = arrStr.getFullYear() + '-' + (arrStr.getMonth() + 1 >= 10 ? arrStr.getMonth() + 1 : "0" + (arrStr.getMonth() + 1)) + '-' + (arrStr.getDate() >= 10 ? arrStr.getDate() : "0" + arrStr.getDate()) + ' ' + arrStr.getHours().toString().padStart(2, "0") + ':' + arrStr.getMinutes().toString().padStart(2, "0") + ':' + arrStr.getSeconds().toString().padStart(2, "0");
            return dateTime
        }
        let resArr = resFun(adt, chd)
        console.log(JSON.stringify(resArr));
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