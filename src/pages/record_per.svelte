<script lang="ts">
    import axios from 'axios';

    let id = null;

    let playerList = axios.get(serverURL+`/get/player`).then(
        function (response) {
            let result = response.data;
            console.log(result)
            if(result.code === 200) {
                return result.data;
            }else{
                return [];
            }
        }
    );

    $: items = (id === null)?{}:axios.get(serverURL+`/get/record_per?id=${id}`).then(
        function (response) {
            let result = response.data;
            console.log(result)

            if(result.code === 200) {
                return result.data
            }else{
                return {};
            }
        }
    )

    let tableColDef = {
        "동장 성적": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "전체",
                width: "100px",
            },
            {
                header: "전체%",
                width: "100px",
            },
            {
                header: "동",
                width: "100px",
            },
            {
                header: "동%",
                width: "100px",
            },
            {
                header: "남",
                width: "100px",
            },
            {
                header: "남%",
                width: "100px",
            },
            {
                header: "서",
                width: "100px",
            },
            {
                header: "서%",
                width: "100px",
            },
            {
                header: "북",
                width: "100px",
            },
            {
                header: "북%",
                width: "100px",
            }
        ],
        "남장 성적": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "전체",
                width: "100px",
            },
            {
                header: "전체%",
                width: "100px",
            },
            {
                header: "동",
                width: "100px",
            },
            {
                header: "동%",
                width: "100px",
            },
            {
                header: "남",
                width: "100px",
            },
            {
                header: "남%",
                width: "100px",
            },
            {
                header: "서",
                width: "100px",
            },
            {
                header: "서%",
                width: "100px",
            },
            {
                header: "북",
                width: "100px",
            },
            {
                header: "북%",
                width: "100px",
            }
        ],
        "월간 성적": [
            {
                header: "월",
                width: "50px",
            },
            {
                header: "승점",
                width: "100px",
            },
            {
                header: "승점%",
                width: "100px",
            },
            {
                header: "승%",
                width: "100px",
            },
            {
                header: "12%",
                width: "100px",
            },
            {
                header: "+%",
                width: "100px",
            },
            {
                header: "-2%",
                width: "100px",
            },
            {
                header: "+3%",
                width: "100px",
            },
            {
                header: "4%",
                width: "100px",
            },
            {
                header: "승",
                width: "100px",
            },
            {
                header: "2",
                width: "100px",
            },
            {
                header: "3",
                width: "100px",
            },
            {
                header: "4",
                width: "100px",
            },
            {
                header: "국수",
                width: "100px",
            }
        ],
        "주간 성적": [
            {
                header: "주차",
                width: "70px",
            },
            {
                header: "승점",
                width: "100px",
            },
            {
                header: "승점%",
                width: "100px",
            },
            {
                header: "승%",
                width: "100px",
            },
            {
                header: "12%",
                width: "100px",
            },
            {
                header: "+%",
                width: "100px",
            },
            {
                header: "-2%",
                width: "100px",
            },
            {
                header: "+3%",
                width: "100px",
            },
            {
                header: "4%",
                width: "100px",
            },
            {
                header: "승",
                width: "100px",
            },
            {
                header: "2",
                width: "100px",
            },
            {
                header: "3",
                width: "100px",
            },
            {
                header: "4",
                width: "100px",
            },
            {
                header: "국수",
                width: "100px",
            }
        ],
        "요일별 성적": [
            {
                header: "요일",
                width: "70px",
            },
            {
                header: "승점",
                width: "100px",
            },
            {
                header: "승점%",
                width: "100px",
            },
            {
                header: "승%",
                width: "100px",
            },
            {
                header: "12%",
                width: "100px",
            },
            {
                header: "+%",
                width: "100px",
            },
            {
                header: "-2%",
                width: "100px",
            },
            {
                header: "+3%",
                width: "100px",
            },
            {
                header: "4%",
                width: "100px",
            },
            {
                header: "승",
                width: "100px",
            },
            {
                header: "2",
                width: "100px",
            },
            {
                header: "3",
                width: "100px",
            },
            {
                header: "4",
                width: "100px",
            },
            {
                header: "국수",
                width: "100px",
            }
        ],
        "시간대별 성적": [
            {
                header: "시간대",
                width: "100px",
            },
            {
                header: "승점",
                width: "100px",
            },
            {
                header: "승점%",
                width: "100px",
            },
            {
                header: "승%",
                width: "100px",
            },
            {
                header: "12%",
                width: "100px",
            },
            {
                header: "+%",
                width: "100px",
            },
            {
                header: "-2%",
                width: "100px",
            },
            {
                header: "+3%",
                width: "100px",
            },
            {
                header: "4%",
                width: "100px",
            },
            {
                header: "승",
                width: "100px",
            },
            {
                header: "2",
                width: "100px",
            },
            {
                header: "3",
                width: "100px",
            },
            {
                header: "4",
                width: "100px",
            },
            {
                header: "국수",
                width: "100px",
            }
        ],
        "전체 기록": [
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
            }
        ],
    }

    function changeId(){
        id = this.value;
    }
</script>
<div id="main" class="main">
    {#await playerList}
        <p>...Loading</p>
    {:then playerList }
        <div class="flex">
            <span class="label">사용자</span>
            <select on:change = {changeId} value="{id}">
                {#each playerList as data}
                    {#if exceptPlayerList.has(data["id"])}
                    {:else}
                        <option value={data["id"]}>{data["name"]}</option>
                    {/if}
                {/each}
            </select>
        </div>
        {#await items}
            <p>...Loading</p>
        {:then items }
            <div class="flex-col">
            {#each Object.entries(items) as [title,list]}
                <div class="flex-col">
                    <span class="title">{title}</span>
                    <table>
                        <colgroup>
                            {#each tableColDef[title] as conf}
                                <col style="width: {conf.width}">
                            {/each}
                        </colgroup>
                        <tr>
                            {#each tableColDef[title] as conf}
                                <th >{conf.header}</th>
                            {/each}
                        </tr>
                        {#each list as data}
                            <tr>
                                {#each tableColDef[title] as conf}
                                    {#if data[conf.header] == null}
                                    {:else}
                                        <td>{data[conf.header]}</td>
                                    {/if}
                                {/each}
                            </tr>
                        {/each}
                    </table>
                </div>
            {/each}
            </div>
        {:catch error}
            <p>오류가 발생했습니다.</p>
        {/await}

    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<style>
    table, td, th {
        border : 1px solid black;
        border-collapse : collapse;
        text-align: center;
        font-size: 14px;
    }
    td, th{
        padding: 4px 8px;
    }
    .flex{
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
    }
    .label{
        font-size: 20px;
        flex-shrink: 0;
    }
    .flex-col{
        width: 1024px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .title{
        font-size: 18px;
    }
</style>