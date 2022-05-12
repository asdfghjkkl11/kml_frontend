<script lang="ts">
    import Rank from "../components/rank.svelte";

    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()).toString();
</script>
<p class="title">이번 달 기록</p>
<Rank {year} {month}/>
<style>
    .title{
        font-size: 20px;
        font-weight: bold;
    }
</style>