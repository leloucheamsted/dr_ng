

// get patients

import {FakeData} from "./fake_data";

export async function getPatients(){
    try {
        return FakeData;
    }
    catch (e){
        console.error(e)
    }
}

// remove patient


