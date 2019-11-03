const promiseFunction = function(message = "Doing undefined things", timer = 2000) {
    console.log(message);
    return new Promise(resolve => {
        setTimeout(function() {
            resolve("Done");
        }, timer);
    });
};

const busyPromiseFunction = function () {
    return promiseFunction("Starting").then(function (result) {
        let message = "Doing more things, but the first one is " + result;
        return promiseFunction(message).then(function (result2) {
            message ="Doing one more thing...";
            return promiseFunction(message).then(function (result3) {
                return `${result}, ${result2}, and ${result3}!`;
            })
        })
    }).catch(function (e) {
        console.error(e);
    })
};

const chainedPromiseFunction = function () {
    let result, result2;
    return promiseFunction("Starting").then(function (r) {
        result= r;
        const message = "Doing more things, but the first one is " + r;
        return promiseFunction(message)
    }).then(function (r2) {
        result2 = r2;
        const message ="Doing one more thing...";
        return promiseFunction(message)
    }).then(function (r3) {
        return `${result}, ${result2}, and ${r3}!`;
    }).catch(function(e){
        console.error(e);
        return e;
    })
};

const asyncSeriesPromiseFunction = async function () {
    let result = await promiseFunction("Starting");
    let result2 = await promiseFunction("Doing more things, but the first one is " + result);
    let result3 = await promiseFunction("Doing one more thing...");
    return `${result}, ${result2}, and ${result3}!`;
};

const asyncParallelPromiseFunction = async function () {
    let result = promiseFunction("Starting");
    let result2 = promiseFunction("Doing more things, but the first one is " + result);
    let result3 = promiseFunction("Doing one more thing...");
    return `${await result}, ${await result2}, and ${await result3}!`;
};

const parallelPromiseAllFunction = function () {
    let result = promiseFunction("Starting");
    let result2 = promiseFunction("Doing more things, but the first one is " + result);
    let result3 = promiseFunction("Doing one more thing...");

    return Promise.all([result, result2, result3])
        .then(r => `${r[0]}, ${r[1]}, and ${r[2]}!`)
};


busyPromiseFunction().then(function(finalResult){
    console.log(finalResult);
});

chainedPromiseFunction().then(function(finalResult){
    console.log(finalResult);
});

asyncSeriesPromiseFunction().then(function(finalResult){
    console.log(finalResult);
});
//
asyncParallelPromiseFunction().then(function(finalResult){
    console.log(finalResult);
});

parallelPromiseAllFunction().then(function(finalResult){
    console.log(finalResult);
});
