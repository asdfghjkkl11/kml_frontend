<script lang="ts">
    import axios from 'axios';

    const urlParams = new URLSearchParams(window.location.search);
    let year = urlParams.get('year');
    let month = urlParams.get('month');

    if(year == null || month == null){
        let date = new Date();
        year = date.getFullYear().toString();
        month = date.getMonth().toString();
    }

    $: items = axios.get(`http://kml_back.asdfghjkkl11.com/get/ranking?year=${year}&month=${month}`).then(
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
        "종합기록(승점순)": ["순위","이름","승점","승점%","승%","12%","+%","-2%","+3%","4%","승","2","3","4","순율","국수"],
        "다승": ["순위","이름","승","국수"],
        "국수(마작폐인순)": ["순위","이름","국수"],
        "승률(승%)": ["순위","이름","승%","국수"],
        "승점률(승점%)": ["순위","이름","승점%","국수"],
        "1, 2위률(12%)": ["순위","이름","12%","국수"],
        "4위률(4%)": ["순위","이름","4%","국수"],
    }
</script>
<div class="main" id="main" >
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