<script lang="ts">
    import Rank from "../components/rank.svelte";

    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()+1).toString();
</script>
<div id="main" class="main">
    <p class="title">이번 달 기록</p>
    <Rank {year} {month}/>
</div>
<style>
    .title{
        font-size: 20px;
        font-weight: bold;
    }
</style>