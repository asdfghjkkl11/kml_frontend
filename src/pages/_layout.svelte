
<div class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="Fifth navbar example">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">마작기록 <span>by asd</span></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#head-navbar" aria-controls="head-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
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