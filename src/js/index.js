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
    date: "",
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
        while (i < 5) {
            i++;
            widget.days.push(
                {
                    self: document.querySelector(`.widget__day:nth-child(${i})`),
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
                const data = await widget.fetchData();
                await widget.updateData(data);
            }
        });
    },
    /* 
      GET DATE() 
    */
    getDate: () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        widget.date = mm + '-' + dd + '-' + yyyy;

    },
    /* 
        UPDATE DATA()
    */
    updateData: data => {
        //today
        widget.today.imgs.forEach((img, i) => {
            img.classList.add("displayNone");
            let type = img.getAttribute("data-type");
            if (type == data[i].type) {
                img.classList.remove("displayNone");
            }
        });

        // days
        widget.days.forEach((day, i) => {
            day.self.classList.remove("displayNone");

            if (data[i]) {
                day.imgs.forEach(img => {
                    img.classList.add("displayNone");
                    let type = img.getAttribute("data-type");
                    if (type == data[i].type) {
                        img.classList.remove("displayNone");
                    }
                });
                day.day.innerText = data[i].name;
            } else {
                day.self.classList.add("displayNone");
            }

        });
        // widget.days[2].imgs[3].classList.remove("displayNone");

    },
    /* 
        FETCH DATA()
    */
    fetchData: async () => {
        const url = `http://dev-weather-api.azurewebsites.net/api/city/${widget.cityId}/weather?date=${widget.date}`;
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

        const dataSorted = [];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        console.log(data);

        // delete data[0];
        data.forEach(day => {
            const d = new Date(day.date.slice("T"));
            const name = days[d.getDay()];
            const humid = day.humidity;
            const pollen = day.pollenCount;
            const precip = day.precipitation;
            const degree = day.temperature;
            const type = day.type;
            const wind = String(day.windInfo.speed + " mph " + day.windInfo.direction);

            dataSorted.push({
                name, humid, pollen, precip, degree, type, wind

            });
        })
        return dataSorted;
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
