<div class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="Fifth navbar example">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">지니어스 마작 동아리</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#head-navbar" aria-controls="head-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="head-navbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/record">기록입력</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/ranking">기간별 순위</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/record_list">기간별 기록</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/record_per">개인별 기록</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/record_versus_res">상대 기록</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/player">사용자 등록</a>
                    </li>
                </ul>
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
    .navbar{
        min-width: 300px;
    }
    .header{
        flex-shrink: 0;
    }
    .body{
        padding: 8px;
        flex: 1;
        border-top: 1px solid #a0a0a0;
        border-bottom: 1px solid #a0a0a0;
        overflow-x: auto;
    }
    .footer{
        flex-shrink: 0;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b8b8b8;
    }
</style>