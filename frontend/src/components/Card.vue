<template>
  <div class="card">
    <img :src="item.icon" class="avatar" />
    <div>
      {{item.rank}}<a :href="item.url" target="_blank" v-html="item.user"></a><br>
      {{item.toot}}(昨日比: {{item.yesterday}})
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
export default {
  name: "Card",
  props: ["item"]
};
</script>
<style lang="postcss" scope>
.card {
  display: flex;
  margin-bottom: 5px;
}
.avatar {
  width: 50px;
  margin-right: 10px;
}
.emoji{
  width: 1rem;
}
</style>