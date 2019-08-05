const widget = {
    cityInput: document.querySelector(".widget__city"),
    today: {
        day: document.querySelector(".today__p--day"),
        type: document.querySelector(".today__p--type"),
        degree: document.querySelector(".today__p--degree"),
        imgs: document.querySelectorAll(".today__img"),

        precip: document.querySelector(".today__span--precip"),
        humid: document.querySelector(".today__span--humid"),
        wind: document.querySelector(".today__span--wind"),
        pollen: document.querySelector(".today__span--pollen"),
    },
    days: [],
    cityId: 0,
    dates: [],
    prevDate: "",
    /* 
        INIT()
    */
    init: async () => {
        widget.listen();
        await widget.getDays();
        await widget.getCities();
        await widget.setCities();
    },
    /* 
        GET DAYS()
    */
    getDays: () => {
        let i = 0;
        while (i < 7) {
            i++;
            widget.days.push(
                {
                    day: document.querySelector(`.widget__day:nth-child(${i}) .day__p--day`),
                    imgs: document.querySelectorAll(`.widget__day:nth-child(${i}) .day__img`),
                    degree: document.querySelector(`.widget__day:nth-child(${i}) .day__p--degree`),
                    degreeN: document.querySelector(`.widget__day:nth-child(${i}) .day__p--degreeN`),
                    pollen: document.querySelector(`.widget__day:nth-child(${i}) .day__p--pollen`)
                }
            )
        }
    },
    /* 
      GET CITIES()
    */
    getCities: async () => {
        const url = "http://dev-weather-api.azurewebsites.net/api/city";
        const res = await fetch(url);
        let data;
        if (res.ok) {
            data = await res.json();

            if (data) {
                widget.cities = data;
            }
        } else {
            throw new Error(res.statusText);
        }
    },
    /* 
        SET CITIES()
    */
    setCities: () => {
        widget.cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city.id;
            option.innerText = city.name;
            widget.cityInput.appendChild(option);
        });
    },
    /* 
     LISTEN()
    */
    listen: () => {
        widget.cityInput.addEventListener("change", async (e) => {
            widget.cityId = await e.target.value;
            if (widget.cityId != 0) {
                await widget.getDate();
                widget.dates.forEach(async date => {
                    console.log("next")
                    const data = await widget.fetchData(date);
                    console.log(data, date);
                    await widget.updateData(data);
                });
            }
        });
    },
    /* 
      GET DATE() 
    */
    getDate: () => {
        let i = 0;
        while (i < 7) {
            i++;
            let today = new Date(), dd, mm, yyyy;
            if (widget.dates[0]) {
                today = new Date(widget.prevDate);
                today.setDate(today.getDate() + 1);
            }
            dd = String(today.getDate()).padStart(2, '0');
            mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            yyyy = today.getFullYear();
            widget.dates.push(mm + '-' + dd + '-' + yyyy);
            widget.prevDate = today;
        }
    },
    /* 
        UPDATE DATA()
    */
    updateData: data => {
        widget.days.forEach(day => {
            day.imgs.forEach(img => {
                img.classList.add("displayNone");
            });
        });
        widget.days[2].imgs[3].classList.remove("displayNone");

    },
    /* 
        FETCH DATA()
    */
    fetchData: async date => {
        const url = `http://dev-weather-api.azurewebsites.net/api/city/${widget.cityId}/weather?date=${date}`;
        const res = await fetch(url);
        let data;
        if (res.ok) {
            // storage actual input
            data = await res.json();

            if (data) {
                const datas = await widget.sortData(data);
                return datas;
            }
        } else {
            throw new Error(res.statusText);
        }
    },

    /* 
        SORT DATA()
    */

    sortData: data => {
        // console.log(data);
        // data.forEach(location => {
        //     console.log(location)
        // })
        let humid, pollen, precip, degree;
        return data;
    },
}

// init on load
addEventListener("load", widget.init);
















// class DOMelement {
//     constructor(options) {
//         this.type = options.type;
//         this.txt = options.txt;
//         this.clas = options.clas;
//         this.parent = options.parent;
//         this.src = options.src;
//     }

//     const self = document.createElement(this.type);
//     /         addClass(this[name], clas);
//     //         this[name].innerText = text;
//     //         parent.append(this[name]);
// }


// const createDOMElement = (
//     options,
//     text = "5",
// ) => {
//     const elementDOM = document.createElement(options.type);
//     elementDOM.classList.add(options.clas);
//     elementDOM.innerText = options.txt;
//     options.parent.append(elementDOM);
// };



// const own = createDOMElement({
//     type: "div",
//     txt: "polluted",
//     parent: document.body,
//     clas: "widget__today"
// })
// console.log(own);
