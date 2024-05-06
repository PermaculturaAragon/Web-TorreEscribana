document.addEventListener("DOMContentLoaded", () => {
  $(".card").each((_, element) => {
    const el = $(element);
    const endDate = el.data("end");
    if (!endDate) {
      return;
    }
    let diff = new Date().getTime() - new Date(endDate).getTime();
    console.log(diff);
    if (diff > 0) {
      el.addClass("past-event");
    }
  });
});
