<script lang="ts">
    import axios from 'axios';
    import PlayerScore from '../components/player_score.svelte';

    let gameLength = '1';
    $: player = [
        {
            'wind':'0',
            'point':'0',
            'nickname':'',
            'id':''
        },
        {
            'wind':'1',
            'point':'0',
            'nickname':'',
            'id':''
        },
        {
            'wind':'2',
            'point':'0',
            'nickname':'',
            'id':''
        },
        {
            'wind':'3',
            'point':'0',
            'nickname':'',
            'id':''
        },
    ];
    let commonPoint = 0;
    $: zeroSum = 0 - Number(player[0].point) - Number(player[1].point) - Number(player[2].point) - Number(player[3].point) - Number(commonPoint);
    let playerList = [];

    let items = axios.get(serverURL+`/get/player`).then(
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
                "game_length": gameLength,
                "wind[0]": player[0].wind,
                "nickname": player[0].nickname,
                "nick0": player[0].id,
                "point[0]": player[0].point,
                "wind[1]": player[1].wind,
                "nickname1": player[1].nickname,
                "nick1": player[1].id,
                "point[1]": player[1].point,
                "wind[2]": player[2].wind,
                "nickname2": player[2].nickname,
                "nick2": player[2].id,
                "point[2]": player[2].point,
                "wind[3]": player[3].wind,
                "nickname3": player[3].nickname,
                "nick3": player[3].id,
                "point[3]": player[3].point,
                "common_point": commonPoint,
            };

            return axios.post(serverURL+`/post/record_ok`, data).then(
                function (response) {
                    let result = response.data;
                    console.log(result)
                    if (result.code === 200) {
                        alert("기록되었습니다.")
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
            if(player[i].nickname === '' && player[i].id === ''){
                alert((i+1) + "번째 플레이어를 선택해주세요.");
                return false;
            }else{
                let flag = false;

                for(let j = 0; j < playerList.length; j++){
                    if(exceptPlayerList.has(playerList[j].id)){
                        continue;
                    }

                    if(playerList[j].name === player[i].nickname || player[i].nickname === ""){
                        flag = true;
                    }
                }

                if(!flag){
                    alert((i+1) + "번째 플레이어 이름이 정확하지 않습니다.");
                    return false;
                }
            }
        }

        return true;
    }
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