<template>
  <div id="status">
    最高:{{data.max}}文字
    <br />
    合計:{{data.total}}文字
    <br />
    平均:{{data.ave}}文字
    <br />
    ユニークユーザー数:{{data.user}}人
    <br />
    計:{{data.toot}}トゥート
    <br />
    Public: {{data.public}} / Unlisted: {{data.unlisted}}
    <br />
    Private: {{data.private}} / L限: {{data.local_only}}
    <br />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
export default {
  name: "Status",
  props: [
   'data'
  ]
};
</script>
