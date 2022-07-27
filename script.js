// Variables globales - Elements de la mémoire et de l'écran

//une fois que le dom est chargé:
// window.addEventListener("DOMContentLoaded", (event) => {
//     const memoireElement = document.querySelector("#memoire")
// })
// window.addEventListener("DOMContentLoaded", (event) => {
//     const ecrantElement = document.querySelector("#ecran")
// })
const memoireElt = document.querySelector("#memoire");
const ecranElt = document.querySelector("#ecran");

//Stockage de la valeur de l'ecran précedent pour mémoriser les calculs precedents
let preced = 0

//Stockage de l'affichage
let affiche = ""

//Stockage de l'opération
let op = null

//Initialisation de la mémoire
let memoire

//window.onload se declanche a la fin du processus de chargement du document
window.onload = () => {
    //Ecoute l'evenement click sur les touches
    //On va chercher toutes les spans
    let touches = document.querySelectorAll("span")

    for (let touche of touches) {
        touche.addEventListener("click", gestionTouches)
    }
    //Récuperer la memoire depuis le localstorage, si j'ai klk chose dans la mémoire
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0
    if (memoire != 0) memoireElt.style.display = "initial"
}
//Fonction appelée au click sur les touches
function gestionTouches() {
    //Recuperer la valeur qu'il y a dans la touche cliquée
    let touche = this.innerText

    //Verifier si la touche est numérique ou la virgule

    if (parseFloat(touche) >= 0 || touche === ".") {
        //Verifier si pas pusieurs points dans la chaine!!!!!!
        if (touche === "." && affiche.indexOf(".") != -1) {
            affiche = affiche
        }
        else {

            //Mettre à jour le valeur d'affichage et afficher à l'écran
            //toString pour convertir en chaîne de caractère eviter qu'il fasse le calcul si nbr > 9
            affiche = (affiche === "") ? touche.toString() : affiche + touche.toString()
            ecranElt.innerText = affiche
        }

    }
    else {
        switch (touche) {
            // Si click touche C on réinitialise tout
            case "C":
                preced = 0
                affiche = ""
                op = null
                ecranElt.innerText = 0
                break
            //Tous les calculs
            case "+":
            case "-":
            case "*":
            case "/":
                //On calcule la valeur de l'etape précedente
                preced = (preced === 0) ? parseFloat(affiche) : calcul(preced, parseFloat(affiche), op)
                //On met à jour l'écran
                ecranElt.innerText = preced
                //On stock l'opération
                op = touche
                //On réinitialise la variable d'affichage
                affiche = ""
                break

            case "=":
                //On calcule la valeur de l'etape précedente
                preced = (preced === 0) ? parseFloat(affiche) : calcul(preced, parseFloat(affiche), op)
                //On met à jour l'écran
                ecranElt.innerText = preced
                //On stock le resultat dans  la variable d'affichage
                affiche = preced
                //On réinitialise preced
                preced = 0
                break

            //on rajoute à la memoire
            case "M+":
                //On stock en additionnant à la valeur qui est en mémoire
                //Si il y a quelque chose dans la memoire je l'ajoute a l'affichage
                localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affiche) : parseFloat(affiche)
                //On affiche le M
                memoireElt.style.display = "initial"
                affiche = ""
                break

            //Memoire clear, efface la mémoire    
            case "MC":
                //On efface la mémoire
                localStorage.memoire = 0
                //On efface le M
                memoireElt.style.display = "none"
                break
            //Memory return, recupere la memoire stockée
            case "MR":
                //On récupère la valeur stockée
                memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0
                //Mettre à jour l'affichage
                affiche = memoire
                ecranElt.innerText = memoire
                break

            default:
                break

        }

    }
}

/**
 * Faire le calcul
 * @param {number} nbr1 
 * @param {number} nbr2 
 * @param {string} op 
 * @returns float
 */
//ParseFloat : convertit une chaîne de caractère en un nombre flottant
function calcul(nbr1, nbr2, op) {
    nbr1 = parseFloat(nbr1)
    nbr2 = parseFloat(nbr2)
    if (op == "+") return nbr1 + nbr2
    if (op == "-") return nbr1 - nbr2
    if (op == "*") return nbr1 * nbr2
    if (op == "/") return nbr1 / nbr2

}
