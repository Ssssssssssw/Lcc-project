// document.querySelector("#app > div > div.main-container.hasTagsView > section > div > div.UI_search_top_content > div > ul.UI_content_right_list_bom > li:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > div > div > div > div:nth-child(2) > div.UI_list_startAddress_code > span:nth-child(2)")

// var item = document.querySelectorAll("#app > div > div.main-container.hasTagsView > section > div > div.UI_search_top_content > div > ul.UI_content_right_list_bom > li > div > div > div > div > div > div > div > div.UI_list_startAddress_code > span:nth-child(1)")

// for (var i = 0; i < item.length; i++) {
//     console.log(item[i].innerText);
// }
for (let i = 0; i < arr.length; i++) { console.log(arr[i].innerText); arr[i].arr = arr[i].innerText.split(" "); console.log(arr[i].arr) }
let objStr = document.querySelectorAll("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div")
let arr = [].slice.apply(objStr)
arr.splice(0, 1)
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].innerText); arr[i].arr = arr[i].innerText.split("\n"); console.log(arr[i].arr)
}
// console.log(arr)

var editBtn = document.querySelectorAll('#greenBarLeftContentWrapper > div > a > div > div:nth-child(1)')[0].click();
var oneWayBtn = document.querySelectorAll('#searchBookingEditForm > div.ibe-modal-booking-top > div.ibe-modal-booking-type-container.flight-type > div.ibe-modal-booking-type-box.fieldset-display > fieldset > div:nth-child(3) > div:nth-child(1) > label')[0].click();
//  购买方式
document.querySelector("#searchByButtons > fieldset > div > div:nth-child(1) > div > label").click()

document.querySelector('#searchFromInput').value = 'LAS'
document.querySelector('#searchToInput').value = 'OAK'
document.querySelector('#searchDepartureDate').value = '12/16/2021'
document.querySelector('#passengersInput2').value = '1 Adult';
document.querySelector('#adult-count').textContent = 1
document.querySelector('#bookingSearchButton').click();

//  miles里程购买选择航程
// document.querySelector("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div:nth-child(1) > div.ibe-flight-info-row.w-row > div.ibe-flight-info-col2.w-col.w-col-4.w-col-medium-6.w-col-small-6 > div.ibe-flight-farebox > div").click()

//  直接购买 选择航程
// document.querySelector("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-slider-parent > div.ibe-flight-slider > div > a:nth-child(5)").click()
//  价位根据航程来选择第几个价位
document.querySelector("#ibe-depart-section > div.ibe-flight-container > div.ibe-flight-info-container > div:nth-child(2) > div.ibe-flight-info-row.w-row > div.ibe-flight-info-col2.w-col.w-col-4.w-col-medium-6.w-col-small-6 > div.ibe-flight-farebox > div").click()
//  continue
document.querySelector("#submit_flight_search_button").click()
// 乘客信息
document.querySelector("#frontierPassengers_0__Name_First").value = "kangkang"
document.querySelector("#frontierPassengers_0__Name_Last").value = "zhou"
//  乘客性别 1 男性  2 女性  0 值为空
document.querySelector("#frontierPassengers_0__Info_Gender").value = "1"
document.querySelector("#date_of_birth_0").value = "2/2/1997"

//  其他服务
// document.querySelector("#Pax-Add-Special-Services-0").click()
// document.querySelector("#Pax-Special-Service-List-1-0 > div:nth-child(2) > fieldset > label").click()
// document.querySelector("#Pax-Special-Service-List-2-0 > div:nth-child(2) > fieldset > label").click()

//  联系人信息
document.querySelector("#frontierContact_Name_First").value = "kangkang"
document.querySelector("#frontierContact_Name_Last").value = "zhou"
document.querySelector("#frontierContact_EmailAddress").value = "781486333@qq.com"
document.querySelector("#js_first_phone_number").value = "13525512345"
document.querySelector("#frontierContact_CountryCode").value = "CN"
document.querySelector("#frontierContact_PostalCode").value = "450000"
document.querySelector("#submit_passenger_info_button").click()

//辅营

// document.querySelector("#PBND_button").click()
// document.querySelector("#NBNDL_button").click()
// document.querySelector("#F9XXXX_button").click()

// document.querySelector("#\\39 5fe8e02-7114-4822-b212-7d3e9b176bda > div > div > a.ibe-btn.ibe-btn-fullwidth.w-button.js-bundlesSubmitButton").click()
//  辅营continue
document.querySelector("#\\39 7658015-bdc1-4c76-9f99-4273b0f5ce1e > div > div > a.ibe-btn.ibe-btn-fullwidth.w-button.js-bundlesSubmitButton").click()
// document.querySelector("#\\32 0211216\\ F92148\\ LASPHX > div > div > div > div:nth-child(167) > div > p").click()
//  座位重置按钮选择 没有选择座位不需要重置
// document.querySelector("#clearAllSelectedSeats").click()
//  座位页面continue
document.querySelector("#saveSelectedSeats").click()
//  是否选择座位
document.querySelector("#ContinueWithoutSeatSlider > div.cd-panel-container > div > div.cont-without-seat-footer > div > button.f9-btn.f9-btn-link-green.cd-btn").click()

//   是否有随身行李 CO_O禁止携带  CO_1 携带一个
document.querySelector("#bagsCarryOnSection > div.ibe-bags-box-container > div.ibe-bags-right-content > div.ibe-bags-content-container.js-bagsCarryOnTemplate.js-bagsPassengerTemplate > div.ibe-bags-content-field-container-tofrom > div > div > div > div > label > div > select").value = "CO_0"

//  选择行李箱 CH_O没有袋子  CH_1 x1,CH_2 x2  CH_3 x3   ..... x6
document.querySelector("#bagsCheckedSection > div.ibe-bags-box-container > div.ibe-bags-right-content > div.ibe-bags-content-container.js-bagsCheckedTemplate.js-bagsPassengerTemplate > div.ibe-bags-content-field-container-tofrom > div > div > div.ibe-form-row-container > div > label > div > select").value = "CH_0"
//  continue
document.querySelector("#js-bagsContainer > div.ibe-continue-btn-container > a.ibe-btn.ibe-btn-fullwidth.w-button.js-bagsSubmitButton").click()

//  continue
document.querySelector("#Pax-Container-Wrapper > div:nth-child(2) > div.ibe-continue-btn-container > a.ibe-btn.ibe-btn-fullwidth.w-button.js-extrasSubmitButton").click()

//  卡信息
document.querySelector("#cardholder_name").value = "zhoukangkang"
document.querySelector("#card_number").value = "4000-5358-8659-8529"
document.querySelector("#card_expiration_month").value = "12"
document.querySelector("#card_expiration_year").value = "35"
document.querySelector("#card_cvv").value = "888"
document.querySelector("#billing_payment_address_1").value = "dawanglu"
document.querySelector("#billing_payment_address_2").value = "jianwaisoho"
document.querySelector("#billing_payment_country").value = "CN"
document.querySelector("#billing_payment_city").value = "beijing"
document.querySelector("#billing_payment_email").value = "781486333@qq.com"
document.querySelector("#\\39 5737aa5-f54e-4b1a-b77f-a3ec13c576d0 > div.ibe-body-container > div > a.ibe-btn.ibe-btn-fullwidth.w-button.js-paymentSubmitButton.js-paymentUnpaid").click()



// var editBtn = '#greenBarLeftContentWrapper > div > a > div > div:nth-child(1)';
//               document.querySelector(editBtn).click();
//               var oneWayBtn = '#searchBookingEditForm > div.ibe-modal-booking-top > div.ibe-modal-booking-type-container.flight-type > div.ibe-modal-booking-type-box.fieldset-display > fieldset > div:nth-child(3) > div:nth-child(1) > label';
//               document.querySelector(oneWayBtn).click();
//               var fromCityBtn = '#searchFromInput';
//               var toCityBtn = '#searchToInput'
//               document.querySelector('#searchFromInput').value = 'LAS'
//               document.querySelector('#searchToInput').value = 'OAK'
//               document.querySelector('#searchDepartureDate').value = '12/16/2021'
//               document.querySelector('#passengersInput2').value = '1 Adult';
//               document.querySelector('#adult-count').textContent=1
//               document.querySelector('#bookingSearchButton').click();