<script>
    import {api} from '../js/api.js';

    $: items = getPlayer();

    let tableColDef = ["id","name"];
    let playerName = "";

    function registPlayer(){
        if(playerName === ""){
            alert("이름을 적어주세요.");
        }else{
            postPlayer();
        }
    }

    function getPlayer() {
        return api({
            url: '/get/player',
            data:{}
        });
    }

    function postPlayer() {
        api({
            url: '/post/registid_ok',
            data:{
                "nick": playerName
            }
        });
        items = getPlayer();
    }
</script>
<div id="main" class="main">
    <input type="text" id="input-name" bind:value="{playerName}"/>
    <button id="add-btn" on:click={registPlayer}>추가하기</button>
    {#await items}
        <p>...Loading</p>
    {:then items }
        <p>사용자 목록</p>
        <table>
            <tr>
                <th>이름</th>
            </tr>
            {#each items as data}
                {#if exceptPlayerList.has(data["id"])}
                {:else}
                    <tr>
                        <td>{data["name"]}</td>
                    </tr>
                {/if}
            {/each}
        </table>
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