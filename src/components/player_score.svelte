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
    <select on:change = {changeWind} value="{wind}">
        <option value="0">동</option>
        <option value="1">남</option>
        <option value="2">서</option>
        <option value="3">북</option>
    </select>
    <input type="text" on:change = {changeNickname}/>
    <select on:change = {changeId} value="{id}">
    {#each items as data}
        {#if exceptPlayerList.has(data["id"])}
        {:else}
            <option value={data["id"]}>{data["name"]}</option>
        {/if}
    {/each}
    </select>
    <input type="number" on:change = {changePoint}/>
</div>
<style>
    .player{
        display: flex;
    }
</style>