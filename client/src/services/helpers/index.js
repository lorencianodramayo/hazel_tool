export const cartesian = (value) => {
    const obj = value;
    const keys = Object.keys(obj);
    var r = [], max = Object.keys(value).length - 1;
    function helper(arr, i) {
        for (var j = 0, l = obj[keys[i]].length; j < l; j++) {
            var a = arr.slice(0);
            a.push(obj[keys[i]][j]);
            if (i === max)
                r.push(a);
            else
                helper(a, i + 1);
        }
    }
    helper([], 0);
    return r;
}

export const updateObject = (details1, details2) => {
    const outputObject = {};
    Object.keys(details1)
    .forEach(obj => outputObject[obj] =
    (details2.hasOwnProperty(obj) ? details2[obj] : details1[obj]));
    return outputObject;
 }