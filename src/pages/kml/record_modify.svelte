<script>
    import {api} from '../../js/api.js';
    import PlayerScore from '../../components/player_score.svelte';
    import {onMount} from "svelte";
    import {goto} from "@roxi/routify";

    let params = Object.fromEntries(new URLSearchParams(window.location.search));

    let text = params["국 길이"];
    let gameLength = (text === "반장")?"1":(text === "동장")?"0":(text === "서장")?"2":"3";
    let gameId = params["no."];
    $: player = [
        {
            'wind':'0',
            'point':'0',
            'id':''
        },
        {
            'wind':'1',
            'point':'0',
            'id':''
        },
        {
            'wind':'2',
            'point':'0',
            'id':''
        },
        {
            'wind':'3',
            'point':'0',
            'id':''
        },
    ];

    let commonPoint = params["공탁점"];
    $: zeroSum = 0 - Number(player[0].point) - Number(player[1].point) - Number(player[2].point) - Number(player[3].point) - Number(commonPoint);
    $: playerList = [];

    onMount(async function (){
        playerList = api({
            url: '/get/player',
            data:{}
        });
        for(let i = 0; i < 4; i++){
            let str = params[(i+1)+"위"];

            let index1 = str.indexOf("[");
            let index2 = str.indexOf("]");
            let index3 = str.lastIndexOf(": ");

            let wind = str.substring(index1+1,index2);
            let name = str.substring(index2+1,index3);
            let point = str.substring(index3+2);

            player[i].wind = (wind === "동")?"0":(wind === "남")?"1":(wind === "서")?"2":"3";
            player[i].point = point;

            let players = await playerList;
            for(let j = 0; j < players.length; j++){

                if(name === players[j].name){
                    player[i].id = players[j].id;
                }
            }
        }
    });

    async function postRecord() {
        if(await validateData()) {
            let res = await api({
                url: '/post/record_modify_ok',
                data:{
                    "modify_id": gameId,
                    "game_length": gameLength,
                    "wind[0]": player[0].wind,
                    "nick[0]": player[0].id,
                    "point[0]": player[0].point,
                    "wind[1]": player[1].wind,
                    "nick[1]": player[1].id,
                    "point[1]": player[1].point,
                    "wind[2]": player[2].wind,
                    "nick[2]": player[2].id,
                    "point[2]": player[2].point,
                    "wind[3]": player[3].wind,
                    "nick[3]": player[3].id,
                    "point[3]": player[3].point,
                    "common_point": commonPoint,
                }
            });
            $goto("/kml/record_list");
        }
    }

    async function validateData(){
        if (zeroSum !== 0) {
            alert("점수합계가 맞지 않습니다.");
            return false;
        }

        for (let i = 0; i < player.length; i++) {
            if (player[i].nickname === '' && player[i].id === '') {
                alert((i + 1) + "번째 플레이어를 선택해주세요.");
                return false;
            }
        }

        return true;
    }
</script>
<div id="main" class="main flex">
    {#await playerList}
        <p>...Loading</p>
    {:then playerList }
        <select class="round-wind" bind:value={gameLength}>
            <option value="0">동장</option>
            <option value="1" selected>남장(반장)</option>
            <option value="2" >서장</option>
            <option value="3" >북장(전장)</option>
        </select>
        <div class="flex">
            {#each player as info}
                <PlayerScore bind:info={info} {playerList}/>
            {/each}
        </div>
        <div class="flex">
            <div>
                <span>공탁금</span>
                <input type="text" class="common-point" value="{commonPoint}"/>
            </div>
            <span>오차: <span class:error={zeroSum !== 0}>{zeroSum}</span></span>
        </div>
        <button class="summit-record" on:click={postRecord}>기록</button>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<style>
    select{
        background-color: white;
        color: #474747;
    }
    #main{
        max-width: 312px;
    }
    .round-wind{
        width: 312px;
    }
    .error{
        color: red;
    }
    .flex{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .common-point{
        width: 120px;
    }
    .summit-record{
        width: 80px;
        align-self: end;
    }
</style>