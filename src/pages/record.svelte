<script lang="ts">
    import axios from 'axios';
    import PlayerScore from '../player_score.svelte';

    let game_length = '1';
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
    ]
    let common_point = 0;

    let items = axios.get(`http://kml_back.asdfghjkkl11.com/get/player`).then(
        function (response) {
            let result = response.data;
            console.log(result)
            if(result.code === 200) {
                return result.data
            }else{
                return [];
            }
        }
    );

    function postRecord() {
        let data = {
            "game_length": game_length,
            "wind[0]": player[0].wind,
            "nickname": player[0].nickname,
            "nick0": player[0].id,
            "point[0]": player[0].point,
            "wind[1]": player[1].wind,
            "nickname1":player[1]. nickname,
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
            "common_point": common_point,
        };

        return axios.post(`http://kml_back.asdfghjkkl11.com/post/record_ok`,data).then(
            function (response) {
                let result = response.data;
                console.log(result)
                if(result.code === 200) {
                    alert("기록되었습니다.")
                }else{
                    alert("서버에러");
                }
            }
        )
    }
    $:{
        console.log(game_length)
        console.log(player)
    }
</script>
<div class="main" id="main">
    {#await items}
        <p>...Loading</p>
    {:then items }
        <select bind:value={game_length}>
            <option value="0">동장</option>
            <option value="1" selected>남장(반장)</option>
            <option value="2" >서장</option>
            <option value="3" >북장(전장)</option>
        </select>

        {#each player as info}
            <PlayerScore bind:info={info} {items}/>
        {/each}

        <button>기록</button>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<style>
</style>