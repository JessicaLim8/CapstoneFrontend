export const dataMax = (data) => {
    if (data.length == 0) {
        return 0;
    }
    const ids = data.map(object => {
        return object.max;
      });
    return Math.round(Math.max(...ids), 4)
}

export const dataAvg = (data) => {
    if (data.length == 0) {
        return 0;
    }
    const ids = data.map(object => {
        return object.max;
      });
    return Math.round((Math.max(...ids) / data.length), 4);
}