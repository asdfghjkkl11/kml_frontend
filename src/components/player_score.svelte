<script lang="ts">
    export let items;
    export let info;

    $: wind = info.wind;
    $: point = info.point;
    $: nickname = info.nickname;
    $: id = info.id;

    function changeWind(){
        info.wind = this.value;
    }
    function changeNickname(){
        info.nickname = this.value;
    }
    function changePoint(){
        info.point = this.value;
    }
    function changeId(){
        info.id = this.value;
    }
</script>
<div class="player">
    <select class="wind" on:change = {changeWind} value="{wind}">
        <option value="0">동</option>
        <option value="1">남</option>
        <option value="2">서</option>
        <option value="3">북</option>
    </select>
    <input type="text" class="d-none" on:change = {changeNickname}/>
    <select class="player-list" on:change = {changeId} value="{id}">
    {#each items as data}
        {#if exceptPlayerList.has(data["id"])}
        {:else}
            <option value={data["id"]}>{data["name"]}</option>
        {/if}
    {/each}
    </select>
    <input type="number" class="point" on:change = {changePoint}/>
</div>
<style>
    .player{
        display: flex;
        gap: 8px;
    }
    .wind{
        width: 56px;
    }
    .player-list{
        width: 160px;
    }
    .point{
        width: 80px;
    }
</style>