<script>
    import {api} from "../js/api";
    import {goto} from "@roxi/routify";
    let statID = "";
    let passwd = "";

    if(localStorage.isLogin==1){
        $goto("/kml/record");
    }

    async function login() {
        let res = await api({
            url: '/post/login',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            data: {
                statID: statID,
                passwd: passwd
            }
        });

        if(res?.result !== -1){
            localStorage.statID = statID;
            localStorage.isLogin = 1;
            localStorage.title = res?.result;

            $goto("/kml/record");
        }else{
            alert("로그인에 실패했습니다.");
        }
    }
</script>
<div id="main" class="main">
    <div class="login">
        <div>
            <label for="ID">stat ID</label><input id="ID" bind:value={statID}/>
        </div>
        <div>
            <label for="PW">비밀번호</label><input id="PW" bind:value={passwd} on:keydown={(e)=>{if(e.keyCode==13)login()}}/>
        </div>
    </div>
    <button class="login-btn" on:click={login}> 로그인</button>
</div>
<style>
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }
    .title{
        font-size: 20px;
        font-weight: bold;
    }
    .login{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .login > div{
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 19px;
        font-weight: 500;
        color: #474747;
    }
    .login label{
        width: 88px;
    }
    .login-btn{
        width: 120px;
        height: 48px;
        font-weight: 500;
        border-radius: 8px;
        border: 1px solid #303030;
        background-color: white;
        color: #303030;
    }
</style>