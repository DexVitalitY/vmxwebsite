$(document).ready(function(){
  setInterval(function hello(){
    var avg = function(arr) {
      var sum = 0;
      for (i=0; i<arr.length; i++){
        sum += arr[i];
      }
      return sum / arr.length;
    }

    var data = {};

    var blockchainRequest = {
      type: "GET",
      url: "https://etherchain.org/api/basic_stats",
      dataType: "JSON",
      success: function(res) {
        console.log("This is the response: ", res);
        var blockTimeArr = [];
        var difficultyArr = [];
        var blockTimeAvg, difficultyAvg;
        
        var priceHkd = +(res['data']['price']['usd'] * 7.75).toFixed(2);

        for (i=0; i<res['data']['blocks'].length; i++) {
          blockTimeArr.push(res['data']['blocks'][i]['blockTime']);
          difficultyArr.push(res['data']['blocks'][i]['difficulty']);
        };
        blockTimeAvg = avg(blockTimeArr);
        difficultyAvg = avg(difficultyArr);
        data['blockTime'] = blockTimeAvg;
        data['difficulty'] = difficultyAvg;
        data['priceHkd'] = priceHkd;
        data['priceUsd'] = res['data']['price']['usd'];

        var netHashGH = difficultyAvg / blockTimeAvg / Math.pow(10,9);
        data['netHashGH'] = netHashGH;

        var userRatio = 118 * Math.pow(10,6) / (netHashGH * Math.pow(10,9));
        var blocksPerMin = 60.0 / blockTimeAvg;
        var ethPerMin = blocksPerMin * 5.0;
        var earnings = {};
        earnings.min = userRatio * ethPerMin;
        earnings.hour = earnings.min * 60;
        earnings.day = earnings.hour * 24;
        earnings.week = earnings.day * 7;
        earnings.month = earnings.day * 30;

        data['userRatio'] = userRatio;
        data['blocksPerMin'] = blocksPerMin;
        data['ethPerMin'] = ethPerMin;
        data['earnings'] = earnings;
        data['rigHashRate'] = 118;

        console.log(data);

        //statistics
        $('#userRatio').text(+(data['userRatio']*100).toFixed(4) + "%");
        $('#blockTime').text(+(data['blockTime'].toFixed(2)) + "s");
        $('#rigHashRate').text(+(data['rigHashRate']) + "MH/s");
        $('#etherPriceHkd').text("HKD - $"+(data['priceHkd'].toFixed(2)));
        $('#etherPriceUsd').text("USD - $"+(data['priceUsd'].toFixed(2)));
        $('#difficulty').text(+(data['difficulty']/ Math.pow(10,12)).toFixed(2) + "T");
        $('#totalHashRate').text(+(data['netHashGH']).toFixed(0) + "GH/s");

        //expected gain
        $('#GainMonth').text("HKD "+((data['earnings']['month'])*data['priceHkd']).toFixed(2) + "/ USD "+((data['earnings']['month'])*data['priceUsd']).toFixed(2));

        // //Scenario1 - Ether @ USD1.5
        // data['priceUsd1Point5'] = 1.5;
        // data['priceHkd1Point5'] = data['priceUsd1Point5'] * 7.75;

        // $('#GainMonth1Point5Usd').text("HKD "+((data['earnings']['month'])*data['priceHkd1Point5']).toFixed(2) + "/ USD "+((data['earnings']['month'])*data['priceUsd1Point5']).toFixed(2));

        // //Scenario2 - Ether @ USD2
        // data['priceUsd2'] = 2;
        // data['priceHkd2'] = data['priceUsd2'] * 7.75;

        // $('#GainMonth2').text("HKD "+((data['earnings']['month'])*data['priceHkd2']).toFixed(2) + "/ USD "+((data['earnings']['month'])*data['priceUsd2']).toFixed(2));

        // //Scenario3 - Ether @ USD3
        // data['priceUsd3'] = 3;
        // data['priceHkd3'] = data['priceUsd3'] * 7.75;

        // $('#GainMonth3').text("HKD "+((data['earnings']['month'])*data['priceHkd3']).toFixed(2) + "/ USD "+((data['earnings']['month'])*data['priceUsd3']).toFixed(2));

        // //Scenario4 - Ether @ USD4
        // data['priceUsd4'] = 4
        // data['priceHkd4'] = data['priceUsd4'] * 7.75;

        // $('#GainMonth4').text("HKD "+((data['earnings']['month'])*data['priceHkd4']).toFixed(2) + "/ USD "+((data['earnings']['month'])*data['priceUsd4']).toFixed(2));

        // //Scenario5 - Ether @ USD5
        // data['priceUsd5'] = 5
        // data['priceHkd5'] = data['priceUsd5'] * 7.75;

        // $('#GainMonth5').text("HKD " +((data['earnings']['month'])*data['priceHkd5']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd5']).toFixed(2));

        // //Scenario6 - Ether @ USD6
        // data['priceUsd6'] = 6
        // data['priceHkd6'] = data['priceUsd6'] * 7.75;

        // $('#GainMonth6').text("HKD " +((data['earnings']['month'])*data['priceHkd6']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd6']).toFixed(2));

        //Scenario7 - Ether @ USD7
        data['priceUsd7'] = 7
        data['priceHkd7'] = data['priceUsd7'] * 7.75;

        $('#GainMonth7').text("HKD " +((data['earnings']['month'])*data['priceHkd7']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd7']).toFixed(2));

       //Scenario8 - Ether @ USD8
        data['priceUsd8'] = 8
        data['priceHkd8'] = data['priceUsd8'] * 7.75;

        $('#GainMonth8').text("HKD " +((data['earnings']['month'])*data['priceHkd8']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd8']).toFixed(2));

       //Scenario9 - Ether @ USD9
        data['priceUsd9'] = 9
        data['priceHkd9'] = data['priceUsd9'] * 7.75;

        $('#GainMonth9').text("HKD " +((data['earnings']['month'])*data['priceHkd9']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd9']).toFixed(2));

       //Scenario10 - Ether @ USD10
        data['priceUsd10'] = 10
        data['priceHkd10'] = data['priceUsd10'] * 7.75;

        $('#GainMonth10').text("HKD " +((data['earnings']['month'])*data['priceHkd10']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd10']).toFixed(2));

       //Scenario11 - Ether @ USD11
        data['priceUsd11'] = 11
        data['priceHkd11'] = data['priceUsd11'] * 7.75;

        $('#GainMonth11').text("HKD " +((data['earnings']['month'])*data['priceHkd11']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd11']).toFixed(2));

       //Scenario11 - Ether @ USD12
        data['priceUsd12'] = 12
        data['priceHkd12'] = data['priceUsd11'] * 7.75;

        $('#GainMonth12').text("HKD " +((data['earnings']['month'])*data['priceHkd12']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd12']).toFixed(2));

       //Scenario11 - Ether @ USD13
        data['priceUsd13'] = 13
        data['priceHkd13'] = data['priceUsd13'] * 7.75;

        $('#GainMonth13').text("HKD " +((data['earnings']['month'])*data['priceHkd13']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd13']).toFixed(2));

       //Scenario11 - Ether @ USD14
        data['priceUsd14'] = 14
        data['priceHkd14'] = data['priceUsd14'] * 7.75;

        $('#GainMonth14').text("HKD " +((data['earnings']['month'])*data['priceHkd14']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd14']).toFixed(2));

       //Scenario11 - Ether @ USD15
        data['priceUsd15'] = 15
        data['priceHkd15'] = data['priceUsd15'] * 7.75;

        $('#GainMonth15').text("HKD " +((data['earnings']['month'])*data['priceHkd15']).toFixed(2) + "/ USD" + ((data['earnings']['month'])*data['priceUsd15']).toFixed(2));

  
      }
    };
    $.ajax(blockchainRequest);
  },3000);
});