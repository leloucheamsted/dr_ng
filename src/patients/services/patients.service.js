

import { FakeData } from "./fake_data";

export async function getPatients() {

    try {
        return FakeData;

    } catch (error) {
        console.log(error);
    }
}

