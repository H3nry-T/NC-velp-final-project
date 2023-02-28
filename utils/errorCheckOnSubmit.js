import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, auth } from "../firebase/firebase";
import { getCharities } from "./api";

export function errorCheckOnSubmit(
    charityFromApi,
    setCharityFromApi,
    charities,
    charityCollection,
    getCharityList,
    setCharities,
    charityFormData
) {
    getCharities(charityFormData.reg_charity_number)
        .then((charities) => {
            setCharityFromApi(charities);
        })
        .catch((err) => {
            console.log(err);
        });

    const requiredFields = [
        "reg_charity_number",
        "charity_name",
        "email",
        "phone",
        "address_post_code",
        "password",
        "password_again",
    ]; //make sure fields are all present in order to submit

    for (const field of requiredFields) {
        if (!charityFormData[field]) {
            return alert(`Please fill in ${field.replace("_", " ")}`);
        }
    } //check that the input charity number matches that which is found in gov website

    if (
        !charityFromApi ||
        !charityFromApi.reg_charity_number ||
        charityFormData.reg_charity_number.toString() !==
            charityFromApi.reg_charity_number.toString()
    ) {
        return alert(
            "This Charity Number doesn't exist. Please input a Charity Number which exists"
        );
    } //make sure charity which exists is currently registered and not removed

    if (
        charityFormData.reg_charity_number ===
            charityFromApi.reg_charity_number &&
        charityFromApi.reg_status === "RM"
    ) {
        return alert(
            `The charity with registration number ${charityFormData.reg_charity_number} is no longer a registered charity.`
        );
    } //make sure number doesn't already exist in the collection

    for (const element of charities) {
        if (element.reg_charity_number === charityFormData.reg_charity_number) {
            return alert(
                `A charity with the registration number ${element.reg_charity_number} already exists. Please enter a new charity.`
            );
        }
    } //make sure name matches that in the gov api (make sure case sensitivity isn't considered)

    if (
        charityFromApi.charity_name.toLowerCase() !==
        charityFormData.charity_name.toLowerCase()
    ) {
        return alert(
            "The name you entered does not match the name associated with this charity number. Please review your entry and try again."
        );
    } //make sure email matches that in the gov api

    if (charityFromApi.email !== charityFormData.email) {
        return alert(
            "The email you entered does not match the email associated with this charity number. Please review your entry and try again."
        );
    } // make sure phone matches that in the gov api

    const formattedNumberFromApi = charityFromApi.phone.replace(/\s+/g, ""); // remove spaces in number from api

    const formattedNumberInputted = charityFormData.phone.replace(/\s+/g, ""); // remove spaces in number inputted

    if (formattedNumberFromApi !== formattedNumberInputted) {
        return alert(
            "The phone you entered does not match the phone associated with this charity number. Please review your entry and try again."
        );
    } //make sure post code matches that inn the gov api

    const formattedPostCodeFromApi = charityFromApi.address_post_code.replace(
        /\s+/g,
        ""
    ); // remove spaces in post code from api

    const formattedPostCodeInputted = charityFormData.address_post_code.replace(
        /\s+/g,
        ""
    ); // remove spaces in inputted post code

    if (
        formattedPostCodeFromApi.toLowerCase() !==
        formattedPostCodeInputted.toLowerCase()
    ) {
        return alert(
            "The Post Code you entered does not match the Post Code associated with this charity number. Please review your entry and try again."
        );
    } //make sure password matches upon submission

    if (charityFormData.password !== charityFormData.password_again) {
        return alert(`Passwords do not match. Please try again.`);
    }

    createUserWithEmailAndPassword(
        auth,
        charityFormData.email,
        charityFormData.password
    )
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert(`Registered as ${user.email}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(`${errorCode}, ${errorMessage}`);
        });
    addDoc(charityCollection, charityFromApi)
        .then((docRef) => {
            getCharityList(setCharities);
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((e) => {
            console.error("Error adding document: ", e);
        });
}
