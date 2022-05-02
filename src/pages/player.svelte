<script lang="ts">
    import axios from 'axios';
    $: items = getPlayer();

    let tableColDef = ["id","name"];
    let playerName = "";

    function registPlayer(){
        if(playerName === ""){
            alert("이름을 적어주세요.");
        }else{
            let result = postPlayer();
        }
    }
    
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

    function postPlayer() {
        let data = {
            "nick": playerName
        };

        return axios.post(`http://kml_back.asdfghjkkl11.com/post/registid_ok`,data).then(
            function (response) {
                let result = response.data;
                console.log(result)
                if(result.code === 200) {
                    if(result.result === "success") {
                        alert("추가되었습니다.")
                        items = getPlayer();
                    }else{
                        alert("이미 존재하는 이름입니다.");
                    }
                }else{
                    alert("서버에러");
                }
            }
        )
    }
</script>
<div class="main" id="main" >
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