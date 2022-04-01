<script lang="ts">
    import axios from 'axios';
    let year = 2022;
    let month = 1;
    $: items = axios.get(`http://kml_back.asdfghjkkl11.com/get/ranking?year=${year}&month=${month}`).then(
        response => response.data
    )
</script>

<header>
    <div class="wrap">
        <h1 class="main-title">REST API PAGE</h1>
        <p>페이지 소개 : api를 이용한 테스트 페이지 입니다. </p>
    </div>
</header>
<div class="main" id="main" >
    {#await items}
        <p>...Loading</p>
    {:then items }
        <ul>
            {#each items as item, index}
                <li>
                    <p>[{item.id}] {item.title}</p>
                </li>
            {/each}
        </ul>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>