function nacitajKnihy() {
    fetch("/api/zadania")
        .then(odpoved => odpoved.json())
        .then(knihy => {
            const zoznam = document.getElementById("zoznam");
            zoznam.innerHTML = "";

            knihy.forEach(kniha => {
                const riadok = document.createElement("tr");

                [kniha.id, kniha.nazov, kniha.autor, kniha.rok, kniha.cena].forEach(hodnota => {
                    const bunka = document.createElement("td");
                    bunka.textContent = hodnota;
                    riadok.appendChild(bunka);
                });

                const bunkaAkcia = document.createElement("td");
                const tlacidko = document.createElement("button");
                tlacidko.textContent = "Odstrániť";
                tlacidko.onclick = () => {
                    fetch("/api/zadania/" + kniha.id, { method: "DELETE" })
                        .then(() => nacitajKnihy());
                };
                bunkaAkcia.appendChild(tlacidko);
                
                const zmenaBtn = document.createElement("button");
                zmenaBtn.textContent = "Upraviť";
                zmenaBtn.onclick  = () => {
                    
                   const nazov = prompt("uved nazov:", kniha.nazov);
    if (nazov === null) return;
    const autor = prompt("uved autor:", kniha.autor);
    if (autor === null) return;
    const rokText = prompt("uved rok:", kniha.rok);
    if (rokText === null) return;

                    fetch("/api/zadania/" + kniha.id, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nazov: nazov, autor: autor, rok: Number(rokText) })
                    })
                    .then(() => nacitajKnihy());
                }

                  const cenaBtn = document.createElement("button");
                cenaBtn.textContent = "Zmeniť cenu";
                cenaBtn.onclick = () => {
                    const vstup = prompt("O kolko € zmenit cenu:", "5");
                    if (vstup === null || vstup.trim() === "") return;
                    const zmena = Number(vstup.replace(",", "."));
                    if (!Number.isFinite(zmena)) return alert("Zadajte platne cislo");
                    fetch("/api/zadania/" + kniha.id + "/cena", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ zmena: zmena })
                    })
                        .then(() => nacitajKnihy());
                };


                bunkaAkcia.appendChild(cenaBtn);
                bunkaAkcia.appendChild(zmenaBtn);
                riadok.appendChild(bunkaAkcia);

                zoznam.appendChild(riadok);
            });
        });
}


const formular = document.getElementById("knihyForm");
formular.addEventListener("submit", (event) => {
    event.preventDefault();
    const kniha = {
        nazov: document.getElementById("nazov").value,
        autor: document.getElementById("autor").value,
        rok: document.getElementById("rok").value,
        cena: document.getElementById("cena").value
    };
    fetch("/api/zadania", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kniha)
    })
    .then(() => {
        formular.reset();
        nacitajKnihy();
    });
});

nacitajKnihy();