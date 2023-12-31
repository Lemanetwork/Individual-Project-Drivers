// const regExLen = /^(?=.{2,20}$).+/; //Length
const regExLeng = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{2,20}$/; //Only letters, 2 to 20 charcaters, no space.
const regExLengDescp = /^(?=.{10,1000}$).+/;
const regExImg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
const regExDate =
  /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

export default function validation(driverData) {
  let errors = {};

  if (!regExLeng.test(driverData.forename))
    errors.forename = "Forename must be only letters, minumum 2.";

  if (!regExLeng.test(driverData.surname))
    errors.surname = "Surname must be only letters, minumum 2.";

  if (!regExLeng.test(driverData.nationality))
    errors.nationality = "Nationality must be only letters, minumum 2.";

  if (!regExImg.test(driverData.image))
    errors.image = "The provided URL is not an image";

  if (!regExDate.test(driverData.dob))
    errors.dob = "DOB must be in a YYYY-MM-DD format";

  if (!regExLengDescp.test(driverData.description))
    errors.description = "Description must be at least 10 characters";

  if (driverData.teams.length < 1) errors.teams = "Select at least 1 team";

  return errors;
}
