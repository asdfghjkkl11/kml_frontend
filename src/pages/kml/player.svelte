<script>
    import {api} from '../../js/api.js';

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
    <div class="flex">
        <input type="text" id="input-name" bind:value="{playerName}"/>
        <button id="add-btn" on:click={registPlayer}>추가하기</button>
    </div>
    <div class="flex">
        {#await items}
            <p>...Loading</p>
        {:then items }
            <div class="flex-table">
                <div class="th">이름</div>
                {#each items as data}
                    <div class="td">{data["name"]}</div>
                {/each}
            </div>
        {:catch error}
            <p>오류가 발생했습니다.</p>
        {/await}
    </div>
</div>
<style>
    .main{
        display: flex;
        flex-direction: column;
        gap:8px;
    }
    .flex{
        display: flex;
        justify-content: center;
    }
    .flex-table{
        min-width: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: inset -1px -1px 0 0 #a0a0a0, -1px -1px 0 0 #a0a0a0;
    }
    .th, .td{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset -1px -1px 0 0 #a0a0a0, -1px -1px 0 0 #a0a0a0;
    }
</style>