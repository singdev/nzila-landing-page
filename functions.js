function switchHomeTab(event, i) {
  for (let i = 1; i < 4; i++) {
    const el = document.getElementById(`home-tab-${i}`);
    el.style.display = "none";
    document.querySelectorAll("#home-tab-nav button").forEach((el) => {
      el.classList.remove("active");
    });
  }
  const el = document.getElementById(`home-tab-${i}`);
  el.style.display = "block";
  event.target.classList.add("active");
}

function toggleModal(modalID) {
  document.getElementById(modalID).classList.toggle("hidden");
  document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
  document.getElementById(modalID).classList.toggle("flex");
  document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}

const makeDonation = () => {
    const loadingIcon = document.getElementById("donation-loading-icon");
  
    const newUserForm = document.getElementById("make-donation-form");
    if (newUserForm.checkValidity()) {
      const formData = new FormData(newUserForm);
      loadingIcon.style.display = "inline-block";
      loadingIcon.classList.add("icn-spinner");
  
      fetch("http://51.222.142.71:8008/v1/api/util/mail", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response)
        .then((res) => {
          loadingIcon.style.display = "none";
          loadingIcon.classList.remove("icn-spinner");
          if (res.status === 200 || res.status === 201) {
              toggleModal('make-donation-modal');
              alert("Merci pour votre cotisation !");
          } else {
            alert("Erreur lors de la cotisation, veuillez essayer à nouveau !");
          }
        })
        .catch((error) => {
          loadingIcon.style.display = "none";
          loadingIcon.classList.remove("icn-spinner");
          toggleModal('make-donation-modal');
          alert("Erreur lors de la cotisation, veuillez essayer à nouveau !");
        });
    } else {
      alert("Veuillez bien remplir le formulaire");
    }
  };