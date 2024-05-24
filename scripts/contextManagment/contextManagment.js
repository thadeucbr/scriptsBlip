async function deleteContext(userId, varName, authorize) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorize);
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
    var obj = await fetch("https://safra.http.msging.net/commands", requestOptions)
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

export async function getContext(userId, authorize) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorize);
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

    var obj = await fetch("https://safra.http.msging.net/commands", requestOptions)
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

export async function setContext(userId,contextVariable,contextVariableValue, authorize) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorize);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": "438d3232-8858-4f19-8987-7e530d00326b",
        "to": "postmaster@msging.net",
        "method": "SET",
        "uri": `/contexts/${userId}/${contextVariable}`,
        "type": "text/plain",
        "resource": contextVariableValue
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    var obj = await fetch("https://safra.http.msging.net/commands", requestOptions)
        .then((response) => response.text())
        .then(result => {
            const {status } = JSON.parse(result)
            return status;
        })
        .catch((error) => console.error(error));

    return obj;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function deleteAllContexts(users, authorize) {
    try {
        if (!users) {
            return { success: false, message: "No users informed" };
        }
        for (const user of users) {
            console.log(user + " - Iniciando a limpeza");
            let contexts = await getContext(user, authorize);
            for (const context of contexts) {
                await deleteContext(user, context, authorize);
                await delay(250);
            }
            console.log(user + " - Limpo com sucesso");
        }
        return { success: true, message: "Contexts deleted successfully" };
    }
    catch (e) {
        return { success: false, message: "Error deleting contexts" };
    }

}

//To run with the command line 'node contextManagment.js'
// let users = [
//     "5531975705747@wa.gw.msging.net",
//     "5531975705748@wa.gw.msging.net",
//     "5531975705749@wa.gw.msging.net"
// ];
//deleteAllContexts(users, "YOUR_AUTH");


