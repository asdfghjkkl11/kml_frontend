<script lang="ts">
    import axios from 'axios';

    export let year;
    export let month;

    $: items = axios.get(serverURL+`/get/ranking?year=${year}&month=${month}`).then(
        function (response) {
            let result = response.data;
            console.log(result)
            if(result.code === 200) {
                return result.data
            }else{
                return {};
            }
        }
    );

    let tableColDef = {
        "종합기록(승점순)": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "승점",
                width: "60px",
            },
            {
                header: "승점%",
                width: "60px",
            },
            {
                header: "승%",
                width: "60px",
            },
            {
                header: "12%",
                width: "60px",
            },
            {
                header: "+%",
                width: "60px",
            },
            {
                header: "-2%",
                width: "60px",
            },
            {
                header: "+3%",
                width: "60px",
            },
            {
                header: "4%",
                width: "60px",
            },
            {
                header: "승",
                width: "50px",
            },
            {
                header: "2",
                width: "50px",
            },
            {
                header: "3",
                width: "50px",
            },
            {
                header: "4",
                width: "50px",
            },
            {
                header: "순율",
                width: "60px",
            },
            {
                header: "국수",
                width: "60px",
            }
        ],
        "다승": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "승",
                width: "50px",
            },
            {
                header: "국수",
                width: "50px",
            }
        ],
        "국수(마작폐인순)": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "국수",
                width: "50px",
            }
        ],
        "승률(승%)": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "승%",
                width: "50px",
            },
            {
                header: "국수",
                width: "50px",
            }
        ],
        "승점률(승점%)": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "승점%",
                width: "50px",
            },
            {
                header: "국수",
                width: "50px",
            }
        ],
        "1, 2위률(12%)": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "12%",
                width: "50px",
            },
            {
                header: "국수",
                width: "50px",
            }
        ],
        "4위률(4%)": [
            {
                header: "순위",
                width: "50px",
            },
            {
                header: "이름",
                width: "100px",
            },
            {
                header: "4%",
                width: "50px",
            },
            {
                header: "국수",
                width: "50px",
            }
        ]
    }
</script>
<div class="rank">
    {#await items}
        <p>...Loading</p>
    {:then items }
        {#each Object.entries(items) as [title,list]}
            <div class="data-table">
                <span class="table-label">{title}</span>
                <table>
                    <tr>
                        {#each tableColDef[title] as conf}
                            <th style:min-width={conf.width}>{conf.header}</th>
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
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<style>
    table, td, th {
        border : 1px solid black;
        border-collapse : collapse;
        text-align: center;
    }
    td, th{
        padding: 4px;
    }
    .rank{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }
    .data-table{
        min-width: 260px;
        display: flex;
        flex-direction: column;
    }
    .data-table:first-child{
        width: 100%;
        flex-shrink: 0;
    }
    .table-label{
        padding: 8px 4px;
        height: 32px;
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
    }
    @media (max-width: 830px) {
        .data-table:first-child{
            overflow-x: auto;
        }
    }
</style>