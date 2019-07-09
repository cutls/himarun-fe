const app = new Vue({
    el: '#app',
    data: {
        loading:true,
        date: 'today',
        showFood: false,
        data: [],
    },
    methods: {
        window: onload = function() {
			get()
        },
        change: function() {
            app.loading=true;
            if(app.date=="today"){
                var start = "https://astarte.thedesk.top/himarun.php?date=yesterday";
                app.date="yesterday"
            }else{
                var start = "https://astarte.thedesk.top/himarun.php";
                app.date="today"
            }
            
			var httpreq = new XMLHttpRequest();
			httpreq.open('GET', start, true);
			httpreq.setRequestHeader('Content-Type', 'application/json');
			httpreq.responseType = 'json';
			httpreq.send();
			httpreq.onreadystatechange = function() {
				if (httpreq.readyState == 4) {
					var json = httpreq.response;
                    console.log(json);
                    app.data=json;
                    drawTopChart()
                    drawSPChart()
                    drawShareChart()
                    app.loading=false;
				}
			}
        }
    }
})
function get(){
    var start = "https://astarte.thedesk.top/himarun.php";
			var httpreq = new XMLHttpRequest();
			httpreq.open('GET', start, true);
			httpreq.setRequestHeader('Content-Type', 'application/json');
			httpreq.responseType = 'json';
			httpreq.send();
			httpreq.onreadystatechange = function() {
				if (httpreq.readyState == 4) {
					var json = httpreq.response;
                    console.log(json);
                    app.data=json;
                    drawTopChart()
                    drawSPChart()
                    drawShareChart()
                    app.loading=false;
				}
			}
}
function drawTopChart(){
    Highcharts.chart('astartebot', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Today Toots Chart'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
                    categories: ["0",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                },
        yAxis: {
            title: {
                text: 'Toots'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Toots',
            data: app.data.top_chart
        },
        {
            name: 'Boosts',
            data: app.data.bt_chart
        }	]
    });
}
function drawSPChart(){
    var chart=Highcharts.chart('special', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Today Toots Chart by Users'
        },
        subtitle: {
            text: 'スマホで見るという発想が間違い'
        },
        xAxis: {
            categories: ["0",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        },
        yAxis: {
            title: {
                text: 'Toots'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },
          series: app.data.special
    });
}
function drawShareChart(){
    Highcharts.chart('tooter', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Users Share on Astarte'
        },
        tooltip: {
          pointFormat: '<b>{point.y}</b>({point.percentage:.1f}%)'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              format: '<b>{point.name}</b>:{point.y}({point.percentage:.1f}%)',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [{
          name: 'Share',
          colorByPoint: true,
          data: app.data.piedata
        }]
      });
}