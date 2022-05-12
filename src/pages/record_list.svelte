<script lang="ts">
    import axios from 'axios';

    let date = new Date();
    let rankDt = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString();
    $: year = rankDt.split("-")[0];
    $: month = rankDt.split("-")[1];

    $: items = axios.get(`http://kml_back.asdfghjkkl11.com/get/record_list?year=${year}&month=${month}`).then(
        function (response) {
            let result = response.data;
            console.log(result)
            if(result.code === 200) {
                return result.data
            }else{
                return [];
            }
        }
    )
    let tableColDef = ["no.","일시","국 길이","1위","2위","3위","4위","공탁점","관리"];

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
<div class="date-area">
    <p class="title">{year}년 {month}월 기록</p>
    <div>
        <span>날짜선택: </span>
        <input type="text" id="ranking-datepicker" class="datepicker-input" bind:value="{rankDt}" readonly>
    </div>
</div>
<div class="main" id="main" >
    {#await items}
        <p>...Loading</p>
    {:then items }
        <p>전체 기록</p>
        <table>
            <tr>
                {#each tableColDef as header}
                    <th>{header}</th>
                {/each}
            </tr>
            {#each items as data}
                <tr>
                {#each tableColDef as header}
                    {#if data[header] == null}
                    {:else}
                        <td>{data[header]}</td>
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
        justify-content: space-between;
    }
    table, td, th {
        border : 1px solid black;
        border-collapse : collapse;
        text-align: center;
    }
    td, th{
        padding: 4px;
    }
</style>