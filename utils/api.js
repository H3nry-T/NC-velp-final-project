import axios from "axios";

const charitiesAPI = axios.create({
    baseURL: "https://api.charitycommission.gov.uk/register/api",
});

export const getCharities = (reg_charity_number) => {
    let path = `/allcharitydetails/${reg_charity_number}/0`;
    return charitiesAPI
        .get(path, {
            headers: {
                "Ocp-Apim-Subscription-Key": "b5e40952c8ae4c2c835967acde398b29",
            },
        })
        .then(({ data }) => {
            return data;
        });
};
