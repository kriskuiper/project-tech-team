// async
function userInputCheckboxes(req, res, next) {
  // try {
    const { genders } = req.body;
    genders.forEach(gender => console.log(gender));
  // } catch (error) {
  //   next(error);
  // }
}
userInputCheckboxes();

module.exports = userInputCheckboxes;
