<script>
    export let playerList;
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
        let str = this.value;
        let check = /^-?\d+$/;

        if (check.test(str)) {
            info.point = Number(str);
        }else{
            this.value = 0;
        }
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
    {#each playerList as data}
        <option value={data["id"]}>{data["name"]}</option>
    {/each}
    </select>
    <input type="text" class="point" on:change = {changePoint} value="{point}"/>
</div>
<style>
    select{
        background-color: white;
        color: #474747;
    }
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
        line-height: 14px;
        text-align: right;
        color: #474747;
    }
</style>