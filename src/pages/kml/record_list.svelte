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

    let tableColDef = [
        {
            header: "no.",
            width: "50px",
        },
        {
            header: "일시",
            width: "170px",
        },
        {
            header: "국 길이",
            width: "70px",
        },
        {
            header: "1위",
            width: "150px",
        },
        {
            header: "2위",
            width: "150px",
        },
        {
            header: "3위",
            width: "150px",
        },
        {
            header: "4위",
            width: "150px",
        },
        {
            header: "공탁점",
            width: "70px",
        },
        {
            header: "관리",
            width: "130px",
        }
    ];

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
        <p>전체 기록</p>
        <table class="score">
            <colgroup>
                {#each tableColDef as conf}
                    <col style="width: {conf.width}">
                {/each}
            </colgroup>
            <tr>
                {#each tableColDef as conf}
                    <th >{conf.header}</th>
                {/each}
            </tr>
            {#each items as data ,index}
                <tr>
                {#each tableColDef as conf}
                    {#if data[conf.header] == null}
                    {:else if conf.header === "관리"}
                        <td>
                            <button class="btn-sm btn-warning" data-id="{data['no.']}" data-index="{index}" on:click={editEvent}>수정</button>
                        </td>
                    {:else}
                        <td>{data[conf.header]}</td>
                    {/if}
                {/each}
                </tr>
            {/each}
        </table>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
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
    table, td, th {
        border : 1px solid black;
        border-collapse : collapse;
        text-align: center;
        font-size: 14px;
    }
    td, th{
        padding: 4px 8px;
    }
    .score{
        width: 1024px;
    }
    .btn-sm{
        padding: 0rem 0.5rem;
    }
</style>