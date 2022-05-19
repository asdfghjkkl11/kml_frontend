<script lang="ts">
    import axios from 'axios';

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    $: items = axios.get(`http://kml_back.asdfghjkkl11.com/get/record_per?id=${id}`).then(
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
        "동장 성적": ["순위","전체","전체%","동","동%","남","남%","서","서%","북","북%"],
        "남장 성적": ["순위","전체","전체%","동","동%","남","남%","서","서%","북","북%"],
        "월간 성적": ["월","승점","승점%","승%","12%","+%","-2%","+3%","4%","승","2","3","4","국수"],
        "주간 성적": ["주차","승점","승점%","승%","12%","+%","-2%","+3%","4%","승","2","3","4","국수"],
        "요일별 성적": ["요일","승점","승점%","승%","12%","+%","-2%","+3%","4%","승","2","3","4","국수"],
        "시간대별 성적": ["시간대","승점","승점%","승%","12%","+%","-2%","+3%","4%","승","2","3","4","국수"],
        "전체 기록": ["no.","일시","국 길이","1위","2위","3위","4위","공탁점","관리"],
    }

</script>
<div id="main" class="main">
    {#await items}
        <p>...Loading</p>
    {:then items }
        {#each Object.entries(items) as [title,list]}
            <p>{title}</p>
            <table>
                <tr>
                    {#each tableColDef[title] as header}
                        <th>{header}</th>
                    {/each}
                </tr>
                {#each list as data}
                    <tr>
                        {#each tableColDef[title] as header}
                            {#if data[header] == null}
                            {:else}
                                <td>{data[header]}</td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            </table>
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
</style>