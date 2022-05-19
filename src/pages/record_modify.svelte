<script lang="ts">
    import axios from 'axios';
    import PlayerScore from '../components/player_score.svelte';

    let params = Object.fromEntries(new URLSearchParams(window.location.search));
    console.log(params)
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
    $: zeroSum = 100000 - Number(player[0].point) - Number(player[1].point) - Number(player[2].point) - Number(player[3].point) - Number(commonPoint);
    let playerList = [];

    let items = axios.get(`http://kml_back.asdfghjkkl11.com/get/player`).then(
        function (response) {
            let result = response.data;
            console.log(result)
            if(result.code === 200) {
                return playerList = result.data;
            }else{
                return [];
            }
        }
    );

    function postRecord() {
        if(validateData()) {
            let data = {
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
            };

            return axios.post(`http://kml_back.asdfghjkkl11.com/post/record_modify_ok`, data).then(
                function (response) {
                    let result = response.data;
                    console.log(result)
                    if (result.code === 200) {
                        alert("수정되었습니다.");
                        location.href = "./record_list"
                    } else {
                        alert("서버에러");
                    }
                }
            )
        }
    }

    function validateData(){

        if(zeroSum !== 0){
            alert("점수합계가 맞지 않습니다.");
            return false;
        }

        for(let i = 0; i < player.length; i++){
            if(player[i].id === ''){
                alert((i+1) + "번째 플레이어를 선택해주세요.");
                return false;
            }
        }

        return true;
    }

    items.then(function (result){
        console.log(playerList)
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

            for(let j = 0; j < playerList.length; j++){
                if(name === playerList[j].name){
                    player[i].id = playerList[j].id;
                }
            }
        }
    });
</script>
<div id="main" class="main flex">
    {#await items}
        <p>...Loading</p>
    {:then items }
        <select class="round-wind" bind:value={gameLength}>
            <option value="0">동장</option>
            <option value="1" selected>남장(반장)</option>
            <option value="2" >서장</option>
            <option value="3" >북장(전장)</option>
        </select>
        <div class="flex">
            {#each player as info}
                <PlayerScore bind:info={info} {items}/>
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