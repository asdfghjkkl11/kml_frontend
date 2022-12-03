<script>
    import {api} from '../../js/api.js';
    import {goto} from "@roxi/routify";
    import {onMount} from "svelte";

    let date = new Date();
    let rankDt = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString();

    $: year = rankDt.split("-")[0];
    $: month = rankDt.split("-")[1];

    $: items = api({
        url: '/get/record_list',
        data:{
            query: `year=${year}&month=${month}`
        }
    });

    onMount(function (){
        const elems = document.getElementById('ranking-datepicker');

        const datepicker = new Datepicker(elems, {
            format: 'yyyy-mm',
            pickLevel: 1,
            language: 'ko',
        });

        elems.addEventListener('changeDate', function(e) {
            if(rankDt !== this.value) {
                rankDt = this.value;
            }
        });
    });

    async function editEvent(e){
        let data = await items;
        let index = this.dataset.index;
        let params = new URLSearchParams(data[index]);
        $goto("/kml/record_modify?"+params.toString());
    }
</script>
<div id="main" class="main">
    <div class="date-area">
        <p class="title">{year}년 {month}월 기록</p>
        <div>
            <span>날짜선택: </span>
            <input type="text" id="ranking-datepicker" class="datepicker-input" bind:value="{rankDt}" readonly>
        </div>
    </div>
    {#await items}
        <p>...Loading</p>
    {:then items }
        <div class="list">
            {#each items as data ,index}
                <div class="item" data-id="{data['no.']}" data-index="{index}" on:click={editEvent}>
                    <span>1위: {data["1위"]}</span>
                    <span>2위: {data["2위"]}</span>
                    <span>3위: {data["3위"]}</span>
                    <span>4위: {data["4위"]}</span>
                    <span class="date">{data["일시"]}</span>
                </div>
            {/each}
        </div>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<style>
    .date-area{
        margin-bottom: 16px;
        display: flex;
        gap: 16px;
        align-items: center;
        flex-wrap: wrap;
    }
    .title{
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-weight: bold;
    }
    .list{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item{
        padding: 8px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        border-radius: 8px;
        border: 1px solid #303030;
        background-color: white;
        color: #303030;
    }
    .date{
        grid-column: auto / span 2;
        font-size: 12px;
    }
</style>