let serverURL = 'https://kmlback.asdfghjkkl11.com';

export async function api(param){
    try {
        if(!param.data.statID) {
            param.data.statID = localStorage.statID;
        }

        let response = await fetch(serverURL + param.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param.data)
        });

        let result = await response.json();
        console.log(result)
        if(result.code === 200) {
            return (result.data)?result.data:result.error;
        }else{
            return [];
        }
    } catch (e) {
        console.log("api 에러:", e);
        return null;
    }
}