/* Script Javascript HQX

Copyright (C) 2015 Eliastik (eliastiksofts.com)

Ce fichier fait partie de Javascript HQX.

Le code JavaScript de ce fichier est un logiciel libre : vous
pouvez le redistribuer et/ou le modifier selon les termes de la
licence GNU General Public License (GNU GPL) telle que
publiée par la Free  Software Foundation, en version 3 de
la licence, ou (à votre discrétion) toute version ultérieure. Le code
est distribué SANS AUCUNE GARANTIE ; sans même la garantie
tacite de QUALITÉ MARCHANDE ou d'ADÉQUATION À UN BUT PARTICULIER.
Consulter la GNU GPL pour plus de détails.

En tant que permission supplémentaire selon les termes de la GNU
GPL version 3 section 7, vous pouvez distribuer des formes
« non source » (par ex., minimisées ou compactées) de ce code
sans la copie de la GNU GPL normalement requise section 4, à
condition d'inclure cet avis de licence et une URL par
laquelle les destinataires peuvent accéder au code source
correspondant.

Vous devez avoir reçu une copie de la GNU General Public License en même
temps que Javascript HQX ; si ce n'est pas le cas,
consultez <http://www.gnu.org/licenses>. */
// Configuration de l'application :
var versionApplication = "1.1.4"; // Version de l'application
var debugMode = true; // Mettre à true pour activer le mode debug (affichage des erreurs), false pour le désactiver
var urlToUpdater = "http://www.eliastiksofts.com/javascript-hqx/update.php?jsoncallback=?"; // URL vers le module permettant de vérifier les mises à jour de l'application
// Fin configuration de l'application
nbErrorJavascript = 0; // Nb d'erreurs Javascript (ne pas changer cette valeur)
$("#noscript").hide();
$("#versionActuelle").text(versionApplication);
// émuler trim sur les anciens navigateurs
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
// permet aux anciens navigateurs de suporter la méthode "textContent"
if (Object.defineProperty &&
    Object.getOwnPropertyDescriptor &&
    Object.getOwnPropertyDescriptor(Element.prototype, "textContent") &&
    !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
    (function() {
        var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
        Object.defineProperty(Element.prototype, "textContent", {
            get: function() {
                return innerText.get.call(this);
            },
            set: function(s) {
                return innerText.set.call(this, s);
            }
        });
    })();
}
// Affichage mode debug
if(debugMode == true) {
    $("#infosDebug").show();
}
// Si l'élement CANVAS est indisponible, on bloque tout
if (window.HTMLCanvasElement == null) {
    // on affiche un message d'erreur et on désactive les formulaires
    $("#canvasError").show();
    $("#cheminFile").attr("disabled", "disabled");
    $("#algorithme1").attr("disabled", "disabled");
    $("#coeffPPV").attr("disabled", "disabled");
    $("#coeffPPV2").attr("disabled", "disabled");
    $("#btnValider1").attr("disabled", "disabled");
    $("#chemin").attr("disabled", "disabled");
    $("#algorithme").attr("disabled", "disabled");
    $("#btnValider").attr("disabled", "disabled");
    $("#contenu_onglet_dialogForm").css("color", "grey");
    $("#contenu_onglet_form").css("color", "grey");
} else {
    /* Lorsque le fichier est chargé
    img est l'objet image, type est le type de formulaire validé (le premier ou le deuxième) */
    var loaded = function(img, type) {
        if (algo == 5) {
            try {
                var scaledImage = resize(img, coeff);
            } catch (e) {
                var scaledImage = resize(img, 2);
            }
        } else {
            var scaledImage = hqx(img, algo);
        }
        var scaledImageHtml = scaledImage.toDataURL("image/png");
        var scaledImage = "";
        $("#resultat").html("<img src="+ scaledImageHtml +"></img>");
        var scaledImageHtml = "";
        elapsedTime = new Date().getTime() - startTime;
        if (type == 1) {
            $("#tmpTraitementOne").html("<span class=\"icon icon-duree\"></span> Durée du traitement : " + elapsedTime / 1000 + " seconde(s).");
        } else {
            $("#tmpTraitement").html("<span class=\"icon icon-duree\"></span> Durée du traitement : " + elapsedTime / 1000 + " seconde(s).");
        }
        elapsedTime = 0;
    };

    // si l'API file n'est pas compatible
    if (typeof window.FileReader === 'undefined') {
        // on affiche un message d'erreur et on désactive le formulaire
        $("#erreurFileApi").show();
        $("#cheminFile").attr("disabled", "disabled");
        $("#algorithme1").attr("disabled", "disabled");
        $("#btnValider1").attr("disabled", "disabled");
        $("#coeffPPV").attr("disabled", "disabled");
        $("#contenu_onglet_dialogForm").css("color", "grey");
    } else {
        // si on clique sur le bouton du premier formulaire
        $("#btnValider1").click(function() {
            $("#btnValider1").attr("disabled", "disabled");
            $("#overlayLoading").fadeToggle("linear", function() {
                hqxFirstForm();
                $("#overlayLoading").fadeToggle("linear");
            });
            $("#btnValider1").removeAttr("disabled");
        });
    }

    // appui bouton second formulaire
    $("#btnValider").click(function() {
        $("#btnValider").attr("disabled", "disabled");
        $("#overlayLoading").fadeToggle("linear", function() {
            hqxSecondForm();
            $("#overlayLoading").fadeToggle("linear");
        });
        $("#btnValider").removeAttr("disabled");
    });

    function hqxFirstForm() {
    var allowedTypes = ['png', 'jpe', 'jpg', 'jpeg', 'jif', 'jfif', 'jfi', 'gif', 'ico', 'mpo', 'tif', 'tiff', 'bmp', 'dib', 'svg', 'svgz', 'raw', 'pict', 'pct']; // extensions autorisées
            var fileInput = document.querySelector('#cheminFile'); // on donne le champ du choix de fichier
            var reader = new FileReader(); // on crée un nouvel objet pour lire le fichier
            if ($('#algorithme1 option:selected').val() == "5") {
                if (parseInt($("#coeffPPV").val()) > 0) {
                    coeff = parseInt($("#coeffPPV").val());
                    if (coeff >= 6 && !confirm("Le coefficient d'agrandissement est trop élevé et risque de ralentir votre navigateur web. Continuer ?")) {
                        $("#btnValider1").removeAttr("disabled");
                        return false;
                    }
                } else {
                    $("#erreurFormOne").show();
                    $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> Le coefficient d'agrandissement est incorrect car il est soit inférieur à 0, soit il s'agit d'un nombre à virgule, soit il contient des lettres ou soit il est vide. Veuillez réessayer.");
                    $("#btnValider1").removeAttr("disabled");
                    return false;
                }
            }
            reader.addEventListener('load', function() { // une fois le fichier chargé
                var imgType = fileInput.files[0].name.split('.'); // on récupère l'extension
                var imgType = imgType[imgType.length - 1].toLowerCase(); // On utilise toLowerCase() pour éviter les extensions en majuscules
                if (allowedTypes.indexOf(imgType) != -1) { // si l'extension de fichier est autorisée
                    algo = parseInt($("#algorithme1").val()); // on récupère l'algorithme
                    $("#tmpTraitementOne").text(""); // on vide le temps de traitement
                    var cheminImg2 = reader.result; // on lit le fichier
                    if (cheminImg2.trim() == "") { // non utilisé
                        $("#erreurFormOne").show();
                        $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> Vous n'avez entré aucun chemin d'image. Veuillez réessayer.");
                        return false;
                    } else if (algo > 5 || algo < 2) { // on vérifie l'algorithme
                        $("#erreurFormOne").show();
                        $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> Erreur lors du choix de l'algorithme. Veuillez réessayer.");
                        return false;
                    } else { // si tout va bien
                        $("#erreurFormOne").hide();
                        $("#erreurFormOne").html("");
                        $("#original").html('<img src="' + cheminImg2 + '" alt="Image" id="imgOriginal" onload="loaded(this, 1)" onclick="linkToImg(this.src);" title="Ouvrir l\'image dans un nouvel onglet"></img>');
                        $("#resultat").html('<div class="erreur" style="display: inline-block;"><span class="icon icon-erreur"></span> Il semble qu\'une erreur soit survenue lors de l\'agrandissement de l\'image. Peut-être que votre navigateur n\'est pas compatible ou qu\'il ait désactivé le chargement de l\'image par mesure de sécurité. Veuillez réessayer sur un autre navigateur.<br /><br />Il est également possible que l\'image soit introuvable (si elle n\'est pas affichée dans « Original »). Dans ce cas, assurez-vous que le chemin de l\'image soit correct.</div>');
                        startTime = new Date().getTime();
                        elapsedTime = 0;
                    }
                } else {
                    $("#erreurFormOne").show();
                    $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> Format de fichier incorrect. Les formats de fichiers supportés sont les suivants : jpe, jpg, jpeg, jif, jfif, jfi, png, gif, ico, mpo, tif, tiff, bmp, dib, svg, svgz, raw, pict, pct.");
                    return false;
                }
            }, false);
            // on vérifie si un fichier a bien été choisi, et on le lit. Sinon, message d'erreur
            if (fileInput.files[0] != null) {
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                $("#erreurFormOne").show();
                $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> Vous n'avez sélectionné aucune image. Veuillez réessayer.");
                return false;
            }
            return true;
    }
    function hqxSecondForm() {
        var allowedTypes2 = ['png', 'jpe', 'jpg', 'jpeg', 'jif', 'jfif', 'jfi', 'gif', 'ico', 'mpo', 'tif', 'tiff', 'bmp', 'dib', 'svg', 'svgz', 'raw', 'pict', 'pct']; // extensions autorisées
        algo = parseInt($("#algorithme").val()); // on récupère l'algorithme choisi
        if ($('#algorithme option:selected').val() == "5") {
            if (parseInt($("#coeffPPV2").val()) > 0) {
                coeff = parseInt($("#coeffPPV2").val());
                if (coeff >= 6 && !confirm("Le coefficient d'agrandissement est trop élevé et risque de ralentir votre navigateur web. Continuer ?")) {
                    $("#btnValider").removeAttr("disabled");
                    return false;
                }
            } else {
                $("#erreurForm").show();
                $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> Le coefficient d'agrandissement est incorrect car il est soit inférieur à 0, soit il s'agit d'un nombre à virgule, soit il contient des lettres ou soit il est vide. Veuillez réessayer.");
                $("#btnValider").removeAttr("disabled");
                return false;
            }
        }
        var cheminImg = $("#chemin").val(); // on récupère le chemin entré
        var imgType2 = cheminImg.split('.'); // on récupère l'extension
        var imgType2 = imgType2[imgType2.length - 1].toLowerCase(); // On utilise toLowerCase() pour éviter les extensions en majuscules
        $("#tmpTraitement").text(""); // on vide le texte du temps de traitement
        if (cheminImg.trim() == "") { // si rien n'est entré
            $("#erreurForm").show();
            $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> Vous n'avez entré aucun chemin d'image. Veuillez réessayer.");
            return false;
        } else if (allowedTypes2.indexOf(imgType2) != -1) { // si l'extension est autorisée
            if (algo > 5 || algo < 2) { // on vérifie la validité de l'algorithme
                $("#erreurForm").show();
                $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> Erreur lors du choix de l'algorithme. Veuillez réessayer.");
                return false;
            } else { // si tout va bien
                $("#erreurForm").hide();
                $("#erreurForm").html("");
                $("#original").html('<img src="' + cheminImg + '" alt="Image" id="imgOriginal" onload="loaded(this, 2)" onclick="linkToImg(this.src);" title="Ouvrir l\'image dans un nouvel onglet"></img>');
                $("#resultat").html('<div class="erreur" style="display: inline-block;"><span class="icon icon-erreur"></span> Il semble qu\'une erreur soit survenue lors de l\'agrandissement de l\'image. Peut-être que votre navigateur n\'est pas compatible ou qu\'il ait désactivé le chargement de l\'image par mesure de sécurité. Veuillez réessayer sur un autre navigateur.<br /><br />Il est également possible que l\'image soit introuvable (si elle n\'est pas affichée dans « Original »). Dans ce cas, assurez-vous que le chemin de l\'image soit correct.</div>');
                startTime = new Date().getTime();
                elapsedTime = 0;
            }
        } else {
            $("#erreurForm").show();
            $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> Format de fichier incorrect. Les formats de fichiers supportés sont les suivants : jpe, jpg, jpeg, jif, jfif, jfi, png, gif, ico, mpo, tif, tiff, bmp, dib, svg, svgz, raw, pict, pct.");
            return false;
        }
        return true;
    }

    function reset() {
        $("#original").text("Veuillez sélectionner une image…");
        $("#resultat").text("Veuillez sélectionner une image…");
        $.magnificPopup.close();
    }

    $("#resetImg").click(function() {
        openPopup("<h2>Confirmation</h2><span class=\"icon icon-question\"></span> Êtes-vous sûr de vouloir réinitialiser Javascript hqx et d'effacer l'image originale et le résultat ?<div style=\"margin-top: 15px;\"><button onclick=\"reset();\"><span class=\"icon icon-valider\"></span> Oui</button> <button class=\"closeMagnificPopup\"><span class=\"icon icon-close\"></span> Non</button></div>");
    });
}
/* autre */
// fermeture de l'information sur les fichiers PNG
$("#close").click(function() {
    $("#infosPng").fadeOut(250);
});
$("#closeMagic").click(function() {
    $("#infosMagic").fadeOut(250);
});

function linkToImg(url) {
    window.open(url);
    return true;
}
// lors du scroll, l'header devient transparent
$(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
        $('#header').addClass("headerTransparent");
    } else {
        $('#header').removeClass("headerTransparent");
    }
});
// ...
var kona = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    nbk = 0;
$(document).keydown(function(e) {
    if (e.keyCode === kona[nbk++]) {
        if (nbk === kona.length) {
            $("#iconeApp").css("background-image", "url(assets/img/pacman.gif)");
            $("#iconeApp").attr("title", "Pac-man ! (accueil)");
            $("#infosMagic").show();
            nbk = 0;
            return true;
        }
    } else {
        nbk = 0;
    }
});
// les onglets et la fonction
function change_onglet(name) {
    document.getElementById('onglet_' + anc_onglet).className = 'onglet_0 onglet';
    document.getElementById('onglet_' + name).className = 'onglet_1 onglet';
    document.getElementById('contenu_onglet_' + anc_onglet).style.display = 'none';
    document.getElementById('contenu_onglet_' + name).style.display = 'block';
    anc_onglet = name;
}
var anc_onglet = 'dialogForm';
change_onglet(anc_onglet);

function openPopup(texte) {
    $.magnificPopup.open({
        items: {
            src: '<div class="white-popup">' + texte + '</div>',
            type: 'inline'
        }
    });
}
$(document).on('click', '.closeMagnificPopup', function(e) {
    $.magnificPopup.close();
});

function fermerJsError() {
    $("#javascriptErrors").fadeOut(250, function() {
        $("#javascriptErrorsList").html("");
    });
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}
// credits : http://phoboslab.org/log/2012/09/drawing-pixels-is-hard
function resize(img, scale) {
    // Takes an image and a scaling factor and returns the scaled image

    // The original image is drawn into an offscreen canvas of the same size
    // and copied, pixel by pixel into another offscreen canvas with the
    // new size.

    var widthScaled = img.width * scale;
    var heightScaled = img.height * scale;

    var orig = document.createElement('canvas');
    orig.width = img.width;
    orig.height = img.height;
    var origCtx = orig.getContext('2d');
    origCtx.drawImage(img, 0, 0);
    var origPixels = origCtx.getImageData(0, 0, img.width, img.height);

    var scaled = document.createElement('canvas');
    scaled.width = widthScaled;
    scaled.height = heightScaled;
    var scaledCtx = scaled.getContext('2d');
    var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);

    for (var y = 0; y < heightScaled; y++) {
        for (var x = 0; x < widthScaled; x++) {
            var index = (Math.floor(y / scale) * img.width + Math.floor(x / scale)) * 4;
            var indexScaled = (y * widthScaled + x) * 4;
            scaledPixels.data[indexScaled] = origPixels.data[index];
            scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
            scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
            scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
        }
    }
    scaledCtx.putImageData(scaledPixels, 0, 0);
    return scaled;
}
function jsoncallbackUpdate(data) {
    $("#erreurUpdate").html("");
    $("#erreurUpdate").hide();
    $("#infoUpdateSuccess").hide();
    $("#infoUpdateDispo").hide();
    if(data.version != versionApplication) {
        $("#infoUpdateDispo").html('<span class="icon icon-infos"></span> ' + i18next.t("update.newVersionAvailable"));
        $("#infoUpdateDispo").show();
    } else {
        $("#infoUpdateSuccess").html('<span class="icon icon-valider"></span> ' + i18next.t("update.noNewVersion"));
        $("#infoUpdateSuccess").show();
    }
    $("#nouvelleVerison").text(data.version);
    $("#changementsVersion").text(data.changements);
    var linksList = "";
    $.each(data.liensTelechargementNew, function(index, value) {
        var valueFormatted = '<a href="' + value + '" target="_blank">' + value + '</a>';
        if(linksList == "") {
            linksList = valueFormatted + ", ";
        } else if(typeof(data.liensTelechargementNew[index + 1]) !== "undefined") {
            linksList = linksList + valueFormatted + ", ";
        } else {
            linksList = linksList + valueFormatted;
        }
    });
    $("#lienNouvelleVersion").html(linksList);
    elapsedTimeSearchUpdate = new Date().getTime() - startTimeSearchUpdate;
    $("#tmpTraitementUpdate").html("<span class=\"icon icon-duree\"></span>  " + i18next.t("update.searchDuration") + " " + elapsedTimeSearchUpdate / 1000 + " " + i18next.t("update.seconds") + ".");
    clearTimeout(timeOutErrorUpdate);
    $("#btnUpdate").removeAttr("disabled");
}
function checkUpdate() {
    startTimeSearchUpdate = new Date().getTime();
    $("#tmpTraitementUpdate").html("");
    elapsedTimeSearchUpdate = 0;
    $("#btnUpdate").attr("disabled", "disabled");
    $("#sourceMiseAJour").html('<a href="'+ urlToUpdater +'" target="_blank">'+ urlToUpdater +'</a>');
    $("#erreurUpdate").hide();
    timeOutErrorUpdate = setTimeout(function(){ errorUpdate(); }, 3000);
    $.getJSON(urlToUpdater);
}
function errorUpdate() {
    $("#erreurUpdate").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("update.error"));
    $("#erreurUpdate").show();
    $("#btnUpdate").removeAttr("disabled");
    clearTimeout(timeOutErrorUpdate);
}
$("#btnUpdate").click(function() {
    checkUpdate();
});
$("#btnValiderLang").click(function() {
    changeLng($("#languageSelect").val());
});
$("#algorithme1").change(function() {
    if ($('#algorithme1 option:selected').val() == "5") {
        $("#scale").show();
    } else {
        $("#scale").hide();
    }
});
$("#algorithme").change(function() {
    if ($('#algorithme option:selected').val() == "5") {
        $("#scale2").show();
    } else {
        $("#scale2").hide();
    }
});
window.onload = function() {
    if ($('#algorithme1 option:selected').val() == "5") {
        $("#scale").show();
    } else {
        $("#scale").hide();
    }

    if ($('#algorithme option:selected').val() == "5") {
        $("#scale2").show();
    } else {
        $("#scale2").hide();
    }
}
window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    if(debugMode == true) {
        $("#infosDebug").show();
        nbErrorJavascript++;
        var errorAlertText = '<h2>Informations de débogage sur l\'erreur Javascript n°' + nbErrorJavascript + '</h2><ul><li><strong>Code de l\'erreur :</strong> ' + errorMsg + '</li><li><strong>Script :</strong> ' + url + '</li><li><strong>Ligne :</strong> ' + lineNumber + '</li><li><strong>Colonne :</strong> ' + column + '</li><li><strong>StackTrace :</strong> ' + errorObj + '</li></ul><button class=\'closeMagnificPopup\'><span class=\'icon icon-close\'></span> Fermer la fenêtre</button>';
        var elError = document.createElement("li");
        var texteFormatted = addslashes(errorAlertText);
        elError.id = 'errorJavascriptNum' + nbErrorJavascript;
        elError.innerHTML = '<span class="icon icon-erreur"></span> Erreur Javascript détectée (n° de l\'erreur : ' + nbErrorJavascript + '). Pour plus d\'informations sur l\'erreur, <a href="#" onclick="openPopup(\'' + texteFormatted + '\');">cliquez ici</a> ou jetez un coup d\'œil à la console Javascript. &nbsp;&nbsp;<span class="icon icon-close" style="color: black; cursor: pointer; font-size: 10pt;" title="Fermer" onclick="$(\'#errorJavascriptNum' + nbErrorJavascript + '\').fadeOut(250,function(){$(\'#errorJavascriptNum' + nbErrorJavascript + '\').html(\'\')});"></span>';
        document.getElementById("javascriptErrorsList").appendChild(elError);
        $("#javascriptErrors").fadeIn(250);
    }
}
window.onbeforeunload = function() {
    return "Si vous fermez cette page, vous perdrez définitivement les images agrandies. Êtes-vous sûr de vouloir quitter cette page ?";
};
