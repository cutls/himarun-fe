<template>
  <div>
    <v-container fluid fill-height v-show="loading">
      <v-layout align-center justify-center column>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>Loading
      </v-layout>
    </v-container>
    <h4>アスタルテ暇人ランキング</h4>
    <v-btn large dark color="indigo" v-on:click="change()">
      <span v-if="date == 'today'">昨日</span>
      <span v-else>今日</span>のデータを見る
    </v-btn>
    <div id="astartebot" class="charts"></div>
    最高:{{data.max}}文字
    <br />
    合計:{{data.total}}文字
    <br />
    平均:{{data.ave}}文字
    <br />
    ユニークユーザー数:{{data.user}}人
    <br />
    計:{{data.toot}}トゥート
    <br />ユーザーデータ(画像・名前)は今日0:00現在のものです
    <br />「深夜」は1:00-5:59を指します。
    <br />
    <div v-if="showFood">
      <template v-for="(images, i) in data.food">
        <a :href="images.toot" target="_blank">
          <img :src="images.image" class="foods" />
        </a>
      </template>
    </div>
    <v-btn large dark color="indigo" v-on:click="togglefood()">お食事を見る</v-btn>
    <v-list two-line>
      <template v-for="(item, index) in data.data">
        <v-list-tile :key="item.title" avatar>
          <v-list-tile-avatar>
            <img :src="item.icon" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.user"></v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">
              {{ item.toot }}トゥート(昨日比:
              <span :class="{ active: item.plus }">{{item.yesterday}}</span>
              )[ブースト:{{item.boost}}/深夜:{{item.nocturne}}]
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ item.rank }}位(前日{{item.yestardayraank}})[1位:{{item.past[0]}}回/2位:{{item.past[1]}}回/3位:{{item.past[2]}}回]</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action><a :href="item.url" target="_blank"><v-icon>link</v-icon></a></v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="index + 1 < data.data.length" :key="index"></v-divider>
      </template>
    </v-list>
    <div id="special" class="charts"></div>
    <div id="tooter" class="charts"></div>2018年2月8日より収集しています。また4月8日よりブーストやメンションに関してもカウントされます。
    <br />非公開トゥートも対象です。(ただし、@AstarteBotにフォローされている場合のみ)
    <br />収集データは以下の通りです。
    <br />
    <ul>
      <li>誰がトゥートしたか(スクリーンネーム/名前/アバター)</li>
      <li>いつトゥートしたか(年、月、日、時、分、秒)</li>
      <li>そのトゥートに画像があるかどうか(画像自体は保持しません)</li>
      <li>そのトゥートの文字数</li>
      <li>そのトゥートに特定の文字列が含まれているかどうか(文字列自体は保存しません)</li>
      <li>そのトゥートがブーストであるかどうか</li>
    </ul>2019年1月28日以前のデータは保存されていません。(日々の全体トゥート数、ユーザー数を除く)
    <br />上記のデータは全て開示されることがあります。また、収集を認めない場合、収集対象から外すことができます。
    自分のアカウントをデータ収集対象から外すためには@AstarteBotをブロックしてください。
    <br />ユーザーの情報はあなたが@AstarteBotから見えなくなった日の23:59までに破棄されます。
    <br />ただしすでに保存された内容については削除されません。削除を希望する場合は
    <b>本人が</b>Cutls Pに連絡してください。
    <br />本人外からの削除リクエストはkirishima.cloudのAdmin以外からは受け付けられません。
    <br />このシステムは、kirishima.cloudのユーザーを対象とし、その規約等に準拠しているという前提の下提供されています。
    <br />保存されているデータについての開示を求める場合はいつでも開発者にお知らせください。
    <br />開示請求のあった時点までのデータをすべてCSV(UTF-8)で提供します。
    <br />System Copyright: Cutls P 2018
    <br />暇人ランキングはCroudia発祥の文化です。
    <br />Croudiaはクローディア株式会社の登録商標です。
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuetify);
Vue.use(Vuex);
export default {
  name: "App",
  data: function() {
    return {
      loading: true,
      date: "today",
      showFood: false,
      data: []
    };
  },
  mounted: function() {
    console.log("hello");
    this.get();
  },
  methods: {
    change: function(event) {
      this.loading = true;
      let vm = this;
      if (this.date == "today") {
        var start = "https://astarte.thedesk.top/himarun.php?date=yesterday";
        this.date = "yesterday";
      } else {
        var start = "https://astarte.thedesk.top/himarun.php";
        this.date = "today";
      }

      var httpreq = new XMLHttpRequest();
      httpreq.open("GET", start, true);
      httpreq.setRequestHeader("Content-Type", "application/json");
      httpreq.responseType = "json";
      httpreq.send();
      httpreq.onreadystatechange = function() {
        if (httpreq.readyState == 4) {
          var json = httpreq.response;
          vm.data = json;
          console.log(json);
          vm.drawTopChart();
          vm.drawSPChart();
          vm.drawShareChart();
          vm.loading = false;
        }
      };
    },
    get: function(event) {
      console.log("get");
      let vm = this;
      var start = "https://astarte.thedesk.top/himarun.php";
      var httpreq = new XMLHttpRequest();
      httpreq.open("GET", start, true);
      httpreq.setRequestHeader("Content-Type", "application/json");
      httpreq.responseType = "json";
      httpreq.send();
      httpreq.onreadystatechange = function() {
        if (httpreq.readyState == 4) {
          var json = httpreq.response;
          vm.data = json;
          console.log(json);
          vm.drawTopChart();
          vm.drawSPChart();
          vm.drawShareChart();
          vm.loading = false;
        }
      };
    },
    togglefood: function(event) {
      if (this.showFood) {
        this.showFood = false;
      } else {
        this.showFood = true;
      }
    },
    drawTopChart: function(event) {
      Highcharts.chart("astartebot", {
        chart: {
          type: "line"
        },
        title: {
          text: "Today Toots Chart"
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          categories: [
            "0",
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23
          ]
        },
        yAxis: {
          title: {
            text: "Toots"
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
        series: [
          {
            name: "Toots",
            data: this.data.top_chart
          },
          {
            name: "Boosts",
            data: this.data.bt_chart
          }
        ]
      });
    },
    drawSPChart: function(event) {
      var chart = Highcharts.chart("special", {
        chart: {
          type: "line"
        },
        title: {
          text: "Today Toots Chart by Users"
        },
        subtitle: {
          text: "スマホで見るという発想が間違い"
        },
        xAxis: {
          categories: [
            "0",
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23
          ]
        },
        yAxis: {
          title: {
            text: "Toots"
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
        series: this.data.special
      });
    },
    drawShareChart: function(event) {
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
      data: this.data.piedata
    }]
  });
    }
  }
};
/*
 
  */
</script>