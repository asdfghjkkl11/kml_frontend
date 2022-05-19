<script lang="ts">
    import axios from 'axios';

    let date = new Date();
    let rankDt = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString();

    $: year = rankDt.split("-")[0];
    $: month = rankDt.split("-")[1];

    let itemMapper = {};
    $: items = axios.get(serverURL+`/get/record_list?year=${year}&month=${month}`).then(
        function (response) {
            let result = response.data;
            console.log(result)

            itemMapper = {};
            for(let i in result.data){
                itemMapper[result.data[i]["no."]] = result.data[i];
            }

            if(result.code === 200) {
                return result.data
            }else{
                return [];
            }
        }
    );

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

    window.onload = function() {
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
    }

    function editEvent(e){
        let params = new URLSearchParams(itemMapper[this.dataset.id]);
        location.href = "./record_modify?"+params.toString();
    }

    function deleteEvent(e){
        let id = this.dataset.id;
        let data = {
            "id": id
        }
        axios.post(serverURL+`/post/record_del`, data).then(
            function (response) {
                let result = response.data;
                console.log(result)
                if (result.code === 200) {
                    if (result.data.result === "success") {
                        alert("삭제되었습니다.");
                        location.reload();
                    }else{
                        alert("삭제에 실패했습니다.");
                    }
                } else {
                    alert("서버에러");
                }
            }
        );
    }

    function restoreEvent(e){
        let id = this.dataset.id;
        let data = {
            "id": id
        }
        axios.post(serverURL+`/post/record_res`, data).then(
            function (response) {
                let result = response.data;
                console.log(result)
                if (result.code === 200) {
                    if (result.data.result === "success") {
                        alert("복구되었습니다.");
                        location.reload();
                    }else{
                        alert("복구에 실패했습니다.");
                    }
                } else {
                    alert("서버에러");
                }
            }
        );
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
            {#each items as data}
                <tr>
                {#each tableColDef as conf}
                    {#if data[conf.header] == null}
                    {:else if conf.header === "관리"}
                        <td>
                            <button class="btn-sm btn-warning" data-id="{data['no.']}" on:click={editEvent}>수정</button>
                            {#if data[conf.header] === "E D"}
                                <button class="btn-sm btn-danger" data-id="{data['no.']}" on:click={deleteEvent}>삭제</button>
                            {:else}
                                <button class="btn-sm btn-primary" data-id="{data['no.']}" on:click={restoreEvent}>복구</button>
                            {/if}
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