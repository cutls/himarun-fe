<template>
  <div id="data">
    <h1>Himarun</h1>
    <div id="astartebot" class="charts"></div>
    <div id="loading" v-if="loading">Loading</div>
    <div v-else>
      <button @click="toggleDay">{{antiDate}}</button>
      <h3>Status</h3>Realtime update
      <Status :data="streamingData" />
      <h3>Ranking</h3>
      <template v-for="(item, index) in data.data">
        <div class="card" :key="index">
          <Card :item="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Status from "../components/Status.vue";
import Card from "../components/Card.vue";
import { Draw } from "../components/common";
import { StrData } from "../interface/index";
import Vue from "vue";
import Component from "vue-class-component";


@Component({
  components: {
    Status,
    Card
  }
})
export default class Home extends Vue {
  public loading: boolean = true;
  public date: string = "today";
  public antiDate: string = "yesterday";
  public showFood: boolean = false;
  public streamingData: StrData = {
    max: 0,
    total: 0,
    ave: 0,
    user: 0,
    toot: 0,
    public: 0,
    unlisted: 0,
    private: 0,
    local_only: 0
  };
  public data: object = {};
  mounted(): void {
    const res: void = this.get();
  }
  get(): void {
    let vm = this;
    let start = "https://astarte.thedesk.top/himarun.php?date=" + this.date;
    let httpreq = new XMLHttpRequest();
    const target: Array<string> = [
      "max",
      "total",
      "ave",
      "user",
      "toot",
      "public",
      "unlisted",
      "private",
      "local_only"
    ];
    httpreq.open("GET", start, true);
    httpreq.setRequestHeader("Content-Type", "application/json");
    httpreq.responseType = "json";
    httpreq.send();
    httpreq.onreadystatechange = function() {
      if (httpreq.readyState == 4) {
        let json = httpreq.response;
        vm.loading = false;
        vm.data = json;
        target.forEach(el => {
          let i: number = json[el] as number;
          vm.streamingData[el] = i;
        });
        new Draw(json.top_chart, json.bt_chart).draw();
      }
    };
  }
  toggleDay(): void {
    this.loading = true;
    if (this.date == "today") {
      this.date = "yesterday";
      this.antiDate = "today";
    } else {
      this.date = "today";
      this.antiDate = "yesterday";
    }
    this.get()
  }
}
</script>
