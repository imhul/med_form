// Формируем URL строку с параметрами для отправки на сервер
export const requestBody = (data) => {
    let DataStr = "";
    for (let key in data) {
        if (DataStr != "") {
            DataStr += "&";
        }
        DataStr += key + "=" + encodeURIComponent(data[key]);
    }
};

export const requestURL = 'https://med.uax.co/json.php';

export const requestHeader = {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
};