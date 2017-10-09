/* Javascript HQX
 * 
 * Copyright (C) 2015-2017 Eliastik (eliastiksofts.com)
 * 
 * This file is part of Javascript hqx.
 * 
 * Javascript hqx is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Javascript hqx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Javascript hqx.  If not, see <http://www.gnu.org/licenses/>. */
// Configuration de l'application :
var versionApplication = "1.2"; // Version de l'application
var debugMode = false; // Mettre à true pour activer le mode debug (affichage des erreurs), false pour le désactiver
var urlToUpdater = "http://www.eliastiksofts.com/javascript-hqx/update.php?jsoncallback=?"; // URL vers le module permettant de vérifier les mises à jour de l'application
// Fin configuration de l'application
var nbErrorJavascript = 0; // Nb d'erreurs Javascript (ne pas changer cette valeur)
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
// function pour comparer deux chaînes de version - https://stackoverflow.com/questions/1179366/is-there-a-javascript-strcmp
String.prototype.strcmp = function(str) {
    return ( ( this == str ) ? 0 : ( ( this > str ) ? 1 : -1 ) );
};
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
            $("#tmpTraitementOne").html("<span class=\"icon icon-duree\"></span> " + i18next.t("processing.processingTime") + " " + elapsedTime / 1000 + " " + i18next.t("seconds"));
        } else {
            $("#tmpTraitement").html("<span class=\"icon icon-duree\"></span> " + i18next.t("processing.processingTime") + " " + elapsedTime / 1000 + " " + i18next.t("seconds"));
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
                    if (coeff >= 6 && !confirm(i18next.t("processing.tooHigh"))) {
                        $("#btnValider1").removeAttr("disabled");
                        return false;
                    }
                } else {
                    $("#erreurFormOne").show();
                    $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.coeffInvalid"));
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
                        $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.emptyPath"));
                        return false;
                    } else if (algo > 5 || algo < 2) { // on vérifie l'algorithme
                        $("#erreurFormOne").show();
                        $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.errorAlgo"));
                        return false;
                    } else { // si tout va bien
                        $("#erreurFormOne").hide();
                        $("#erreurFormOne").html("");
                        $("#original").html('<img src="' + cheminImg2 + '" alt="Image" id="imgOriginal" onload="loaded(this, 1)" onclick="linkToImg(this.src);" title="'+ i18next.t("processing.newTab") +'"></img>');
                        $("#resultat").html('<div class="erreur" style="display: inline-block;"><span class="icon icon-erreur"></span> ' + i18next.t("processing.error") + '</div>');
                        startTime = new Date().getTime();
                        elapsedTime = 0;
                    }
                } else {
                    $("#erreurFormOne").show();
                    var allowedTypeFormatted = allowedTypes.join(", ");
                    $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.unknownFormat") + " " + allowedTypeFormatted + ".");
                    return false;
                }
            }, false);
            // on vérifie si un fichier a bien été choisi, et on le lit. Sinon, message d'erreur
            if (fileInput.files[0] != null) {
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                $("#erreurFormOne").show();
                $("#erreurFormOne").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.noImgSelected"));
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
                if (coeff >= 6 && !confirm(i18next.t("processing.tooHigh"))) {
                    $("#btnValider").removeAttr("disabled");
                    return false;
                }
            } else {
                $("#erreurForm").show();
                $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.coeffInvalid"));
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
            $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.emptyPath"));
            return false;
        } else if (allowedTypes2.indexOf(imgType2) != -1) { // si l'extension est autorisée
            if (algo > 5 || algo < 2) { // on vérifie la validité de l'algorithme
                $("#erreurForm").show();
                $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.errorAlgo"));
                return false;
            } else { // si tout va bien
                $("#erreurForm").hide();
                $("#erreurForm").html("");
                $("#original").html('<img src="' + cheminImg + '" alt="Image" id="imgOriginal" onload="loaded(this, 2)" onclick="linkToImg(this.src);" title="'+ i18next.t("processing.newTab") +'"></img>');
                $("#resultat").html('<div class="erreur" style="display: inline-block;"><span class="icon icon-erreur"></span> ' + i18next.t("processing.error") + '</div>');
                startTime = new Date().getTime();
                elapsedTime = 0;
            }
        } else {
            $("#erreurForm").show();
            var allowedTypeFormatted = allowedTypes.join(", ");
            $("#erreurForm").html("<span class=\"icon icon-erreur\"></span> " + i18next.t("processing.unknownFormat") + " " + allowedTypeFormatted + ".");
            return false;
        }
        return true;
    }

    $("#resetImg").click(function() {
        openPopup("<h2>" + i18next.t("confirmReset.title") + "</h2><span class=\"icon icon-question\"></span> " + i18next.t("confirmReset.descr") + "<div style=\"margin-top: 15px;\"><button onclick=\"reset();\"><span class=\"icon icon-valider\"></span> " + i18next.t("yes") + "</button> <button class=\"closeMagnificPopup\"><span class=\"icon icon-close\"></span> " + i18next.t("no") + "</button></div>");
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

function reset() {
    $("#original").text(i18next.t("selectImage"));
    $("#resultat").text(i18next.t("selectImage"));
    $.magnificPopup.close();
}

function linkToImg(url) {
    return window.open(url);
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
            $("#iconeApp").attr("title", i18next.t("magicTitle"));
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
    var newVersionTest = versionApplication.strcmp(data.version);
    if(newVersionTest < 0) {
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
        var valueFormatted = '<a href="' + addslashes(value) + '" target="_blank">' + addslashes(value) + '</a>';
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

    reset();
}
window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    if(debugMode) {
        $("#infosDebug").show();
        nbErrorJavascript++;
        var errorAlertText = '<h2>' + i18next.t("debugMode.infosTitle") + nbErrorJavascript + '</h2><ul><li><strong>' + i18next.t("debugMode.errorCode") + '</strong> ' + errorMsg + '</li><li><strong>' + i18next.t("debugMode.script") + '</strong> ' + url + '</li><li><strong>' + i18next.t("debugMode.line") + '</strong> ' + lineNumber + '</li><li><strong>' + i18next.t("debugMode.column") + '</strong> ' + column + '</li><li><strong>' + i18next.t("debugMode.stacktrace") + '</strong> ' + errorObj + '</li></ul><button class=\'closeMagnificPopup\'><span class=\'icon icon-close\'></span> ' + i18next.t("closeWindow") + '</button>';
        var elError = document.createElement("li");
        var texteFormatted = addslashes(errorAlertText);
        elError.id = 'errorJavascriptNum' + nbErrorJavascript;
        elError.innerHTML = '<span class="icon icon-erreur"></span> ' + i18next.t("debugMode.title") + ' ' + nbErrorJavascript + '). ' + i18next.t("debugMode.moreInfo") + ' <a href="#" onclick="openPopup(\'' + texteFormatted + '\');">' + i18next.t("debugMode.clickHere") + '</a> ' + i18next.t("debugMode.console") + ' &nbsp;&nbsp;<span class="icon icon-close" style="color: black; cursor: pointer; font-size: 10pt;" title="' + i18next.t("debugMode.close") + '" onclick="$(\'#errorJavascriptNum' + nbErrorJavascript + '\').fadeOut(250,function(){$(\'#errorJavascriptNum' + nbErrorJavascript + '\').html(\'\')});"></span>';
        document.getElementById("javascriptErrorsList").appendChild(elError);
        $("#javascriptErrors").fadeIn(250);
    }
}
window.onbeforeunload = function() {
    return "Si vous fermez cette page, vous perdrez définitivement les images agrandies. Êtes-vous sûr de vouloir quitter cette page ?";
};
