// const reGexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regExLong = /^(?=.{2,20}$).+/;
// const reGexImage = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
const regExImg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
const regExDate =
  /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
// const regExDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

export default function validation(driverData) {
  let errors = {};

  if (!regExLong.test(driverData.forename))
    errors.forename = "Forename should be at least 2 characters";

  if (!regExLong.test(driverData.surname))
    errors.surname = "Surname should be at least 2 characters";

  if (!regExLong.test(driverData.nationality))
    errors.nationality = "Nationality should be at least 2 characters";

  if (!regExImg.test(driverData.image))
    errors.image = "The provided URL is not an image";

  if (!regExDate.test(driverData.dob))
    errors.dob = "DOB should be in a YYYY-MM-DD format";

  if (!regExLong.test(driverData.description))
    errors.description = "Description should be at least 2 characters";

  if (driverData.teams.length <= 0) errors.teams = "Select at least 1 team";

  return errors;
}
