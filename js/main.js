// this is a variation on our module theme
// const myVM is not necessary for now
// const myVM = 
import { fetchData } from "./components/TheDataMiner.js";
(() => {
    let vue_vm = new Vue({
     //link Vue to an element in our HTML
     //   el: "#app",

        data: {
            message: "Welcome To Mini",
            anotherMessage: "Visit the Mini directory",
            removeAformat: true,
            showSpecData: false,
            cars: [],
            currentCarData: {}

    /*         cars: [
                { name: "Justin", role: "coordinator", nickname: "nitsuJ"},
                { name: "John", role: "car", nickname: "super chill"},
                { name: "Joe", role: "prof", nickname: "Teddy Bear"}
            ] */
        },
        // this is the "mounted" lifecycle hook. Vue is done creating itself and has attahced itself to the "app" div on the page
        mounted: function() {
            console.log("Vue is mounted, trying a fetch for the initial data");
            fetchData("./includes/index.php").then(data => {
                    data.forEach(car => this.cars.push(car)); 
                    this.cars = data
                    })
                .catch(err => console.error(err));
            //fetchData("./includes/index.php").then(data => console.log(data)).catch(err => console.error(err));
        },

        // run a method when we change our view (update the DOM with Vue)
        updated: function() {
            console.log('Vue just updated the DOM');
        },
        methods: {
            logClicked() {
                console.log("clicked on a car name");
            },
            clickedHeader() {
                console.log("clicked on header");
            },
            showCarData(target) {
                // remove this car from the caressors array
                console.log('clicked to view car bio data', target, target.name);
                // this "this" keyword inside a vue instance REFERS to the Vue instance itself by default

                // toggle the property between true and false using a ternary statement
                this.showBioData = this.showBioData ? false : true;

                // make the selected car's data visible
                this.currentCarData = target;
            },
            removeCar(target) {
                // remove this car from the caressors array
                console.log('clicked to remove car', target, target.name);
                //the 'this' keyword inside a vue instance REFERS to the Vue instance itself by default

                //make the selected car's data not visible
                // this.cars.splice(this.cars.indexOf(target), 1);
                this.$delete(this.cars, target);
            }
        }
    }).$mount("#app"); // also connects Vue to your wrapper in HTML
})();