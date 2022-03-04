let flightNum = "F9410"
let arr = [{
    fromSegments: [{
        arrAirport: "ORD",
        arrCity: "ORD",
        arrTime: "2022-01-04 00:13:00",
        carrier: "F9",
        depAirport: "MCO",
        depCity: "MCO",
        depTime: "2022-01-03 22:22:00",
        flightNumber: "F91154",
        flightTime: "171",
        info: "Total Flying Time: 2 hrs 51 min (+1)"
    },]
}, {
    fromSegments: [{
        arrAirport: "DEN",
        arrCity: "DEN",
        arrTime: "2022-01-03 23:37:00",
        carrier: "F9 ",
        depAirport: "MCO",
        depCity: "MCO",
        depTime: "2022-01-03 21:25:00",
        flightNumber: "F9679",
        flightTime: "252",
        info: "Total Flying Time: 4 hrs 12 min",
    }, {
        arrAirport: "ORD",
        arrCity: "ORD",
        arrTime: "2022-01-04 18:28:00",
        carrier: "F9 ",
        depAirport: "DEN",
        depCity: "DEN",
        depTime: "2022-01-04 14:58:00",
        flightNumber: "F9410",
        flightTime: "150",
        info: "Total Flying Time: 2 hrs 30 min (+1)",
    }]
}];
arr.forEach((item, index) => {
    item.fromSegments.forEach((it) => {
        if (it.flightNumber == flightNum) {
            console.log(index);

            // document.querySelector(`#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div:nth-child(${index + 2}) > div.ibe-flight-info-row.w-row > div.ibe-flight-info-col2.w-col.w-col-4.w-col-medium-6.w-col-small-6 > div.ibe-flight-farebox > div`)
        }
    })
})


























//  乘客信息
let passengerInfo = [{
    firstName: "zhou",
    lastName: "jielun",
    gender: "1",
    birthDay: "1979-01-18"
}, {
    firstName: "hh",
    lastName: "jielun",
    gender: "1",
    birthDay: "1979-01-18"
}, {
    firstName: "xixi",
    lastName: "jielun",
    gender: "1",
    birthDay: "1979-01-18"
},]
// 联系人信息
let contactInfo = {
    firstName: "zhou",
    lastName: "jielun",
    email: "789456132@qq.com",
    phone: "13525512345",
    country: "CN",
    zipCode: "200131"
}
// 支付信息
let paymentInfo = {
    cardholderName: "zhoujielun",
    cardNum: "4649-9844-5646-5465",
    expirationMon: "1", //  信用卡截止日期月份 1-12 代表月份
    expirationYear: "22", // 21-50  2021-2050
    cid: "789" // 信用卡后三位验证码
}
let billingInfo = {
    address: "beijingshidawanglu",
    country: "CN",
    city: "biejing",
    email: "789456132@qq.com"
}


//  个人信息
passengerInfo.forEach((item, index) => {
    document.querySelector(`#frontierPassengers_${index}__Name_First`).value = item.firstName;
    document.querySelector(`#frontierPassengers_${index}__Name_Last`).value = item.lastName;
    document.querySelector(`#frontierPassengers_${index}__Info_Gender`).value = item.gender;
    document.querySelector(`#date_of_birth_${index}`).value = item.birthDay;
})
// 联系人信息
document.querySelector("#frontierContact_Name_First").value = contactInfo.firstName;
document.querySelector("#frontierContact_Name_Last").value = contactInfo.lastName;
document.querySelector("#frontierContact_EmailAddress").value = contactInfo.email;
document.querySelector("#js_first_phone_number").value = contactInfo.phone;
document.querySelector("#frontierContact_CountryCode").value = contactInfo.country;
document.querySelector("#frontierContact_PostalCode").value = contactInfo.zipCode;
//  填写完信息继续下一步
document.querySelector("#submit_passenger_info_button").click()

// 添加行李 默认下一步
document.querySelector("div.ibe-continue-btn-container > a.ibe-btn.ibe-btn-fullwidth.w-button.js-bundlesSubmitButton").click()
//  选择座位 默认下一步
document.querySelector("#saveSelectedSeats").click()
document.querySelector("#ContinueWithoutSeatSlider > div.cd-panel-container > div > div.cont-without-seat-footer > div > button.f9-btn.f9-btn-link-green.cd-btn").click()

// bag select
let bagNum = "CO_0"  //  没有bag
document.querySelector("#bagsCarryOnSection > div.ibe-bags-box-container > div.ibe-bags-right-content > div.ibe-bags-content-container.js-bagsCarryOnTemplate.js-bagsPassengerTemplate > div.ibe-bags-content-field-container-tofrom > div > div > div > div > label > div > select").value = bagNum
//  下一步
document.querySelector("#js-bagsContainer > div.ibe-continue-btn-container > a.ibe-btn.ibe-btn-fullwidth.w-button.js-bagsSubmitButton").click()

// 汽车租赁 默认下一步
document.querySelector("#Pax-Container-Wrapper > div:nth-child(2) > div.ibe-continue-btn-container > a.ibe-btn.ibe-btn-fullwidth.w-button.js-extrasSubmitButton").click()


//  卡信息
document.querySelector("#cardholder_name").value = paymentInfo.cardholderName;
document.querySelector("#card_number").value = paymentInfo.cardNum;
document.querySelector("#card_expiration_month").value = paymentInfo.expirationMon;
document.querySelector("#card_expiration_year").value = paymentInfo.expirationYear;
document.querySelector("#card_cvv").value = paymentInfo.cid
//  账单信息
document.querySelector("#billing_payment_address_1").value = billingInfo.address;
document.querySelector("#billing_payment_country").value = billingInfo.country;
document.querySelector("#billing_payment_city").value = billingInfo.city;
document.querySelector("#billing_payment_email").value = billingInfo.email;
//  支付
document.querySelector("div.ibe-body-container > div > a.ibe-btn.ibe-btn-fullwidth.w-button.js-paymentSubmitButton.js-paymentUnpaid").click()
