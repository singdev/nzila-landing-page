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

const makeDonation = async () => {
  const loadingIcon = document.getElementById("donation-loading-icon");
  const newUserForm = document.getElementById("make-donation-form");
  const formData = new FormData();

  loadingIcon.style.display = "inline-block";
  loadingIcon.classList.add("icn-spinner");

  if (newUserForm.checkValidity()) {
    const lastName = document.getElementById("donator-lastName");
    const firstName = document.getElementById("donator-firstName");
    const telephone = document.getElementById("donator-telephone");

    const telAirtelMoney = document.getElementById("telephone-airtel-money");
    const descriptionPaiement = document.getElementById("description-paiement");

    formData.append("nom", lastName.value);
    formData.append("prenom", firstName.value);
    formData.append("telephone", telephone.value);

    formData.append("telAirtelMoney", telAirtelMoney.value);
    formData.append("descriptionPaiement", descriptionPaiement.value);

    const res = await fetch("http://51.222.142.71:8008/v1/api/util/mail", {
      method: "post",
      body: formData
    });
    console.log(res.statusText);
    if (res.status == 200) {
      const data = await res.json();
      console.log("SUCCESS");
      
      toggleModal("make-donation-modal");
      
      alert("Merci, votre don à été envoyé !")
      loadingIcon.style.display = "none";
      loadingIcon.classList.remove("icn-spinner");
    } else {
      loadingIcon.style.display = "none";
      loadingIcon.classList.remove("icn-spinner");
      alert("Erreur lors du paiement, veuillez essayer à nouveau!");
      console.log("ERROR");
    }
  } else {
    loadingIcon.style.display = "none";
    loadingIcon.classList.remove("icn-spinner");
    alert("Veuillez bien remplir le formulaire");
  }
};
