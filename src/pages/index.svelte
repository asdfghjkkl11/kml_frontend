<script>
    import {api} from "../js/api";
    import {goto} from "@roxi/routify";
    let statID = "";
    let passwd = "";

    async function login() {
        let res = await api({
            url: '/post/login',
            data: {
                statID: statID,
                passwd: passwd
            }
        });

        if(res?.result === "success"){
            goto("record");
        }else{
            alert("로그인에 실패했습니다.");
        }
    }
</script>
<div id="main" class="main">
    <span class="title">마작기록 <span class="made">by asd</span></span>
    <div class="login">
        <label for="ID">stat ID</label><input id="ID" bind:value={statID}/>

        <label for="PW">비밀번호</label><input id="PW" bind:value={passwd}/>
    </div>
    <button on:click={login}> 로그인</button>
</div>
<style>
    .title{
        font-size: 20px;
        font-weight: bold;
    }
</style>