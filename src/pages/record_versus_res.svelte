<script lang="ts">
    import axios from 'axios';

    const urlParams = new URLSearchParams(window.location.search);
    let id0 = urlParams.get('id0');
    let id1 = urlParams.get('id1');

    $: items = axios.get(`http://kml_back.asdfghjkkl11.com/get/record_versus_res?id0=${id0}&id1=${id1}`).then(
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
        "A 동장 성적": ["순위","전체","전체%","동","동%","남","남%","서","서%","북","북%"],
        "A 남장 성적": ["순위","전체","전체%","동","동%","남","남%","서","서%","북","북%"],
        "B 동장 성적": ["순위","전체","전체%","동","동%","남","남%","서","서%","북","북%"],
        "B 남장 성적": ["순위","전체","전체%","동","동%","남","남%","서","서%","북","북%"],
        "전체 기록": ["no.","일시","국 길이","1위","2위","3위","4위","공탁점","관리"],
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