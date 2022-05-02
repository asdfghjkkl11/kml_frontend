<script lang="ts">
    import axios from 'axios';

    $: items = getPlayer();

    let tableColDef = ["id","name"];

    function getPlayer() {
        return axios.get(`http://kml_back.asdfghjkkl11.com/get/player`).then(
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
    }
</script>
<select>
    {#await items}
    {:then items }
        {#each items as data}
            {#if exceptPlayerList.has(data["id"])}
            {:else}
                <option data-id='{data["id"]}'>{data["name"]}</option>
            {/if}
        {/each}
    {:catch error}
        <option>오류가 발생했습니다.</option>
    {/await}
</select>
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