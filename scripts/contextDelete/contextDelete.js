async function deleteContext(userId, varName) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Key cm91dGVyYmV0YXdoYXRzYXBwcGo6Y28yQ3UxSGtoMW9tQVhTejNJSUI=");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": "438d3232-8858-4f19-8987-7e530d00326b",
        "to": "postmaster@msging.net",
        "method": "DELETE",
        "uri": `/contexts/${userId}/${varName}`
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    var obj = await fetch("https://msging.net/commands", requestOptions)
        .then((response) => response.text())
        .then(async result => {
            if (!result) {
                console.error('Empty response - ' + userId + ' - ' + varName);
                return;
            }
            const { status } = JSON.parse(result)
            console.log(status + " - " + userId + " - " + varName);
            return status;
        })
        .catch((error) => console.error(error.message + " - " + userId + " - " + varName));

    return obj;
}

async function getContext(userId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Key cm91dGVyYmV0YXdoYXRzYXBwcGo6Y28yQ3UxSGtoMW9tQVhTejNJSUI=");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": "438d3232-8858-4f19-8987-7e530d00326b",
        "to": "postmaster@msging.net",
        "method": "GET",
        "uri": `/contexts/${userId}`
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var obj = await fetch("https://msging.net/commands", requestOptions)
        .then((response) => response.text())
        .then(result => {
            const { resource, status } = JSON.parse(result)
            if (status == "success") {
                if (resource.items) {
                    return resource.items;
                } else {
                    return [];
                }
            } else {
                return [];
            }
        })
        .catch((error) => console.error(error));

    return obj;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteAllContexts() {
    let users = [
        "5531975705747@wa.gw.msging.net",
        "5531975705748@wa.gw.msging.net",
        "5531975705749@wa.gw.msging.net"
    ];
    for (const user of users) {
        let contexts = await getContext(user);
        console.log(user + " - Iniciando a limpeza");
        for (const context of contexts) {
            await deleteContext(user, context);
            await delay(300); 
        }
    }
}
deleteAllContexts();

