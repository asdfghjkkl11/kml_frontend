<script>
    import {afterPageLoad} from "@roxi/routify";

    $: href  = location.href;
    let isLogin = sessionStorage.isLogin;
    let title = sessionStorage.title;
    let home = "/";

    $afterPageLoad(function (){
        href  = location.pathname;
        isLogin = sessionStorage.isLogin;
        if(isLogin == 1){
            home = "/kml/record";
        }
    });

    function logout(){
        sessionStorage.isLogin = 0;
    }
</script>
<div class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="Fifth navbar example">
        <div class="container-fluid">
            <a class="navbar-brand" href="{home}">{title}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#head-navbar" aria-controls="head-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="head-navbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/kml/record">기록입력</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/kml/ranking">기간별 순위</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/kml/record_list">기간별 기록</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/kml/record_per">개인별 기록</a>
                    </li>
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link" aria-current="page" href="/kml/record_versus_res">상대 기록</a>-->
<!--                    </li>-->
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/kml/player">사용자 등록</a>
                    </li>
                </ul>
                <a class="logout" aria-current="page" href="/" on:click={logout}>로그아웃</a>
            </div>
        </div>
    </nav>
</div>
<div class="body">
    <slot />
</div>
<div class="footer">
    Copyright © 2022 asdfghjkkl11
</div>
<style>
    .header{
        width: 100%;
        position: fixed;
        flex-shrink: 0;
        box-shadow: inset 0 1px 0 0 #a0a0a0 , 0 1px 0 0 #a0a0a0;
    }
    .body{
        margin-top: 88px;
        padding: 8px;
        flex: 1;
        overflow-x: auto;
    }
    .footer{
        flex-shrink: 0;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 1px 0 0 #a0a0a0 , 0 1px 0 0 #a0a0a0;
        color: #b8b8b8;
    }
    .logout{
        text-decoration: none;
        color: rgba(0, 0, 0, 0.7);
    }
    .navbar-brand{
        flex: 1;
        white-space: normal;
    }
    .navbar-toggler:focus{
        outline: none;
        box-shadow: none;
    }
</style>