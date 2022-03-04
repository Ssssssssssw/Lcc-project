let reqData = {
    fromCity: "MEL",
    toCity: "BNK",
    departdate: "2022-04-03",
    adultNum: "1",
    childNum: "0"
}
let reqStatus = null;
function adtChd(reqData) {
    document.querySelector(".chev-jdl-d-p2-md").click();
    document.querySelector(".list-button:nth-of-type(1)").click();
    document.querySelector(".c0_c1,.c2_c3").click();
    for (let i = 1; i < reqData.adultNum; i++) {
        document.querySelector("#dd-travellers-02ED05A2-6B2A-43C0-9E88-B7AE62295328 > div > div > div:nth-child(1) > div.counter-field > div > button.counter-btn.icon-nofocus.counter-increment-btn").click();
    }
    for (let i = 0; i < reqData.childNum; i++) {
        document.querySelector("#dd-travellers-02ED05A2-6B2A-43C0-9E88-B7AE62295328 > div > div > div:nth-child(2) > div.counter-field > div > button.counter-btn.icon-nofocus.counter-increment-btn").click();
    }
    document.querySelector(".c0_c1,.c2_c3").click();
}
function fromData(reqData) {
    document.querySelector("#main-content > div > div.masthead-carousel-container.masthead-carousel-container--static-content > div.mps-wrapper > div.gutter > div > div > div.mps__row.sector > div:nth-child(1) > div > button").click();
    setTimeout(function () {
        let itemAll = document.querySelectorAll(".cs6_cs7");
        let arr = [].slice.apply(itemAll);
        let selArr = [];
        if (arr.length == 1) {
            selArr.push(arr[0]);
        } else if (arr.length == 2) {
            selArr.push(arr[1]);
        }
        selArr[0].childNodes[1].childNodes.forEach(item => {
            item.itemArr = [].slice.apply(item.childNodes[0].childNodes);
            item.itemArr.splice(0, 1);
            item.itemArr.forEach(j => {
                j.arr = j.innerText.split("\n");
                if (j.arr[1].indexOf(reqData.fromCity) > -1) {
                    j.firstChild.click();
                }
            })
        })
    }, 2000)
}
function toData(reqData) {
    document.querySelector("#main-content > div > div.masthead-carousel-container.masthead-carousel-container--static-content > div.mps-wrapper > div.gutter > div > div > div.mps__row.sector > div:nth-child(2) > div > button").click();
    setTimeout(function () {
        let itemAll = document.querySelectorAll(".cs6_cs7");
        let arr = [].slice.apply(itemAll);
        let selArr = [];
        if (arr.length == 1) {
            selArr.push(arr[0]);
        } else if (arr.length == 2) {
            selArr.push(arr[1]);
        }
        selArr[0].childNodes[1].childNodes.forEach(item => {
            item.itemArr = [].slice.apply(item.childNodes[0].childNodes);
            item.itemArr.splice(0, 1);
            item.itemArr.forEach(j => {
                j.arr = j.innerText.split("\n");
                if (j.arr[1].indexOf(reqData.toCity) > -1) {
                    j.firstChild.click();
                }
            })
        })
    }, 2000)
}
function dateFun(reqData) {
    document.querySelector("#main-content > div > div.masthead-carousel-container.masthead-carousel-container--static-content > div.mps-wrapper > div.gutter > div > div > div.mps__row.sector > div.sector__field.sector__field--date > button").click();
    setTimeout(function () {
        let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let time = reqData.departdate;
        let month = null;
        let day = null;
        let year = time.split("-")[0];
        if (time.split("-")[2].indexOf("0") > -1 && time.split("-")[2] * 1 < 10) {
            day = time.split("-")[2].substr(1, 1) * 1;
        } else {
            day = time.split("-")[2] * 1;
        }
        if (time.split("-")[1].indexOf("0") > -1 && time.split("-")[1] * 1 < 10) {
            month = monthArr[(time.split("-")[1].substr(1, 1)) * 1 - 1];
        } else {
            month = monthArr[(time.split("-")[1]) * 1 - 1];
        }
        let monthDom = document.querySelectorAll("#calendar-tabs-D63EA272-DACD-47E4-9D91-C874C3C1E7BC-panel > div > div > div.c3v_c3w.c3x_c3y > div > div");
        let arr = [].slice.apply(monthDom);
        let monthStatus = false;
        for (let i = 0; i < arr[0].childNodes.length; i++) {
            arr[0].childNodes[i].arr = arr[0].childNodes[i].innerText.split("\n");
            if (year == arr[0].childNodes[i].arr[0] && month == arr[0].childNodes[i].arr[1]) {
                monthStatus = true;
                arr[0].childNodes[i].firstChild.parentNode.click();
            }
        }
        if (!monthStatus) {
            for (let i = 0; i < arr[0].childNodes.length; i++) {
                arr[0].childNodes[i].arr = arr[0].childNodes[i].innerText.split("\n");
                if (arr[0].childNodes[i].arr[0] != year || arr[0].childNodes[i].arr[1] != month) {
                    document.querySelector("#calendar-tabs-D63EA272-DACD-47E4-9D91-C874C3C1E7BC-panel > div > div > div.c3v_c3w.c3x_c3y > div > button.c2e_c2f.c2i_c2j.c2m_c2n.c2q_c2r.c3c_c3e.c3f_c3g").click();
                    monthFun(year, month)
                }
            }
        }

        let dayDom = document.querySelectorAll(".c3r_c3s,.c3t_c3u");
        let dayArr = [].slice.apply(dayDom);
        setTimeout(() => {
            ok:
            for (let i = 1; i < dayArr[0].childNodes.length; i++) {
                for (let j = 0; j < dayArr[0].childNodes[i].childNodes.length; j++) {
                    dayArr[0].childNodes[i].childNodes[j].arr = dayArr[0].childNodes[i].childNodes[j].innerText.split("\n")
                    dayArr[0].childNodes[i].childNodes[j].str = dayArr[0].childNodes[i].childNodes[j].arr[0].replace(/[a-zA-Z]/g, "").trim();
                    if (day == dayArr[0].childNodes[i].childNodes[j].str) {
                        if (dayArr[0].childNodes[i].childNodes[j].arr[1] == "From") {
                            reqStatus = true;
                            dayArr[0].childNodes[i].childNodes[j].firstChild.click();
                            break ok;
                        } else {
                            reqStatus = false;
                        }
                        break ok
                    }
                }
            }
            document.querySelector("#main-content > div > div.masthead-carousel-container.masthead-carousel-container--static-content > div.mps-wrapper > div.gutter > div > div > div.calendarsContainer > div > div.ez0_ez1 > footer > div > div > div.c40_c41.c42_c43.c44_c45 > button").click()
            document.querySelector("div[data-name='SubmitContainer'] button").click();

        }, 5000)
    }, 2000)
}
function monthFun(year, month) {
    let monthDom = document.querySelectorAll("#calendar-tabs-D63EA272-DACD-47E4-9D91-C874C3C1E7BC-panel > div > div > div.c3v_c3w.c3x_c3y > div > div");
    let arr = [].slice.apply(monthDom);
    for (let i = 0; i < arr[0].childNodes.length; i++) {
        arr[0].childNodes[i].arr = arr[0].childNodes[i].innerText.split("\n")
        if (year == arr[0].childNodes[i].arr[0] && month == arr[0].childNodes[i].arr[1]) {
            arr[0].childNodes[i].firstChild.parentNode.click();
        }
    }
}
adtChd(reqData)
setTimeout(function () {
    fromData(reqData)
}, 1500)
setTimeout(function () {
    toData(reqData)
}, 5000)
setTimeout(function () {
    dateFun(reqData)
    setTimeout(() => {
        let status = reqStatus
        //  如果查询的日期有航班会正常进行下一步并进行搜索，如果查询日期没有航班或者售完 status会返回false，页面会停留在查询页
        console.log("status", status);
    }, 8000)
}, 9000)