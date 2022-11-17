

// get patients

import { FakeData } from "./fake_data";

export async function getPatients() {

    try {
        // const response = await fetch("https://backendclinic-jdzoa.ondigitalocean.app/schedule", {
        //     method: 'GET',
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     referrerPolicy: 'no-referrer',

        // })
        // var j = JSON.encode(FakeData)
        //console.log(FakeData)
        return FakeData;

    } catch (error) {
        console.log(error);
    }
}

// remove patient


