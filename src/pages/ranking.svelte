<script lang="ts">
    import Rank from "../components/rank.svelte";

    let date = new Date();
    let rankDt = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString();
    $: year = rankDt.split("-")[0];
    $: month = rankDt.split("-")[1];

    window.onload = function() {
        const elems = document.getElementById('ranking-datepicker');

        const datepicker = new Datepicker(elems, {
            format: 'yyyy-mm', // UK format
            pickLevel: 1,
            language: 'ko',
        });

        elems.addEventListener('changeDate', function(e) {
            if(rankDt !== this.value) {
                rankDt = this.value;
            }
        });
    }
</script>
<div id="main" class="main">
    <div class="date-area">
        <div class="flex">
            <span class="title">{year}년 {month}월 순위</span>
        </div>
        <div class="flex">
            <span>날짜선택: </span>
            <input type="text" id="ranking-datepicker" class="datepicker-input" bind:value="{rankDt}" readonly>
        </div>
    </div>
    <Rank {year} {month}/>
</div>
<style>
    .title{
        font-size: 20px;
        font-weight: bold;
    }
    .date-area{
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
    }
    .flex{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
</style>