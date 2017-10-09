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
i18next.use(window.i18nextBrowserLanguageDetector).init({
    resources: {
        en: {
            "translation": {
                "tabs": {
                    "selectDevice": "Image on the device",
                    "selectInternet": "Image on Internet or other (absolute path)",
                    "update": "Update",
                    "lang": "Lang"
                },
                "selectDevice": {
                    "notCompatible": "Your browser is incompatible with this method of image choose because the File API is not supported. Update it or use the second method.",
                    "choice": "Image choice:",
                    "algo": "Algorithm:",
                    "coeff": "Magnification coefficient:",
                    "time": "times"
                },
                "selectPath": {
                    "choice": "Absolute path to the image:",
                    "algo": "Algorithm:",
                    "coeff": "Magnification coefficient:",
                    "time": "times"
                },
                "update": {
                    "descr": "Here, you can see what is the current version and search if an app update is available:",
                    "current": "Current version:",
                    "unknown": "Unknown",
                    "new": "New version:",
                    "changes": "Version changes:",
                    "links": "Download link(s):",
                    "source": "URL of the update infos source:",
                    "button": "Search an app update",
                    "newVersionAvailable": "A new version of the app is available!",
                    "noNewVersion": "No new version of the app is available. You have the latest version.",
                    "error": "An error when searching an update seems to have occurred. Check your internet connection and try again. If the problem persists, check also the availability of the update source.",
                    "searchDuration": "Duration of the update searching:",
                    "seconds": "second(s)"
                },
                "lang": {
                    "labelLanguage": "Select a language:",
                    "confirm": "Confirm",
                    "fr": "Français",
                    "en": "English",
                    "changed": "Language changed!"
                },
                "confirm": "Confirm",
                "original": "Original",
                "result": "Result",
                "reset": "Reset",
                "selectImage": "Please select an image…",
                "seconds": "second(s)",
                "yes": "Yes",
                "no": "No",
                "ok": "OK",
                "closeWindow": "Close the window",
                "close": "Close",
                "magicTitle": "Pac-Man! (home)",
                "appNotCompatible": "Javascript hqx isn't compatible with your web browser because it not support the Canvas API. Update it, then try again.",
                "descr1": "This program allow you to ",
                "descr2": "upscale images",
                "descr3": ", that is to say to",
                "descr4": "enlarge them by increasing the quality",
                "descr5": "(preferably video game sprites) directly on your web browser.",
                "descr6": "Choose the image on your device",
                "descr7": "OR",
                "descr8": "enter the absolute path to the image",
                "descr9": "AND",
                "descr10": "then choose the upscale algorithm",
                "descr11": "(the higher is the number after hq, the better is the quality but the longer is the processing). You can also",
                "descr12": "use an URL address to an image on a website",
                "descr13": ", but it is possible that the website forbid the access to the image.",
                "credits1": "Program based on",
                "credits2": "hqx.js",
                "credits3": "License here",
                "credits4": "Read the",
                "credits5": "README.txt",
                "credits6": "to get more informations about the compatibility and others things. Program created by Eliastik. Discover",
                "credits7": "Data URI Encoder",
                "credits8": ", another of my programs allowing to convert images and texts under the form of an URL encoded in Base64 directly on your favorite web browser.",
                "debugModeEnabled": "Debug mode enabled.",
                "infosPNG": "The image is savable under the PNG format, by right-clicking on it then by clicking on « Save image as… »",
                "easterEggFound": "Congratulations, you have found an easter egg!!",
                "processing": {
                    "processingTime": "Processing time:",
                    "tooHigh": "The magnification coefficient is too high and may slow down your web browser. Continue?",
                    "coeffInvalid": "The magnification coefficient is incorrect because it is either less than 0, it is a comma number, it contains letters, or it is empty. Please try again.",
                    "emptyPath": "You haven't entered any image paths. Please try again.",
                    "errorAlgo": "Error with the algorithm choice. Please try again.",
                    "newTab": "Open the image in a new tab",
                    "error": "It appears that an error occurred while processing the image. Maybe your browser is not compatible or it has disabled image loading as a security measure. Please try again on another browser.<br /><br />It is also possible that the image cannot be found (if it is not displayed in « Original »). In this case, make sure the path of the image is correct.",
                    "unknownFormat": "Incorrect file format. The file formats supported are the following:",
                    "noImgSelected": "You haven't selected any image. Please try again."
                    
                },
                "confirmReset": {
                    "title": "Confirmation",
                    "descr": "Are you sure that you want to reset Javascript hqx and to erase the original image and the result ?"
                },
                "debugMode": {
                    "infosTitle": "Debug informations about the Javascript error n°",
                    "errorCode": "Error code:",
                    "script": "Script:",
                    "line": "Line:",
                    "column": "Column:",
                    "stacktrace": "Stack trace:",
                    "title": "Javascript error detected (error number :",
                    "moreInfo": "For more informations about the error,",
                    "clickHere": "click here",
                    "console": "or take a look to the Javascript console",
                    "close": "Close",
                    "primaryTitle": "Javascript errors :"
                }
            }
        },
        fr: {
            "translation": {
                "tabs": {
                    "selectDevice": "Image sur l'appareil",
                    "selectInternet": "Image sur Internet ou autre (chemin absolu)",
                    "update": "Mise à jour",
                    "lang": "Langue"
                },
                "selectDevice": {
                    "notCompatible": "Votre navigateur est incompatible avec cette méthode de choix de fichier car l'API File n'est pas supportée. Mettez-le à jour ou utilisez la seconde méthode.",
                    "choice": "Choix de l'image :",
                    "algo": "Algorithme :",
                    "coeff": "Coefficient d'agrandissement :",
                    "time": "fois"
                },
                "selectPath": {
                    "choice": "Chemin absolu de l'image :",
                    "algo": "Algorithme :",
                    "coeff": "Coefficient d'agrandissement :",
                    "time": "fois"
                },
                "update": {
                    "descr": "Ici, vous pouvez voir quelle est la version actuelle et rechercher si une mise à jour de l'application est disponible :",
                    "current": "Version actuelle :",
                    "unknown": "Inconnue",
                    "new": "Nouvelle version :",
                    "changes": "Changements de cette version :",
                    "links": "Lien(s) de téléchargement :",
                    "source": "URL de la source de la mise à jour :",
                    "button": "Rechercher une mise à jour de l'application",
                    "newVersionAvailable": "Une nouvelle version de l\'application est disponible !",
                    "noNewVersion": "Aucune mise à jour disponible. Vous disposez de la dernière version en date.",
                    "error": "Une erreur lors de la recherche d'une mise à jour semble être survenue. Vérifiez votre connexion internet, puis réessayez. Si le problème persiste, vérifiez également la disponibilité de la source de la mise à jour.",
                    "searchDuration": "Durée de recherche de la mise à jour :",
                    "seconds": "seconde(s)"
                },
                "lang": {
                    "labelLanguage": "Sélectionnez une langue :",
                    "confirm": "Valider",
                    "fr": "Français",
                    "en": "English",
                    "changed": "Langue changée !"
                },
                "confirm": "Valider",
                "original": "Original",
                "result": "Résultat",
                "reset": "Réinitialiser",
                "selectImage": "Veuillez sélectionner une image…",
                "seconds": "seconde(s)",
                "yes": "Oui",
                "no": "Non",
                "ok": "OK",
                "closeWindow": "Fermer la fenêtre",
                "close": "Fermer",
                "magicTitle": "Pac-Man ! (accueil)",
                "appNotCompatible": "Javascript hqx est incompatible avec votre navigateur car celui-ci ne supporte pas l'API Canvas. Mettez-le à jour, puis réessayez.",
                "descr1": "Ce programme vous permet d'",
                "descr2": "upscaler des images",
                "descr3": ", c'est-à-dire de les",
                "descr4": "agrandir en augmentant la qualité",
                "descr5": "(de préférence des sprites de jeux vidéos) directement sur votre navigateur web.",
                "descr6": "Choississez l'image sur votre appareil",
                "descr7": "OU",
                "descr8": "entrez le chemin absolu de l'image",
                "descr9": "ET",
                "descr10": "choisissez ensuite l'algorithme d'agrandissement",
                "descr11": "(plus le chiffre après hq est grand, plus la qualité sera meilleure mais le traitement plus long). Vous pouvez aussi",
                "descr12": "utiliser une adresse URL vers une image sur un site web",
                "descr13": ", mais il se peut que le site en interdise l'accès.",
                "credits1": "Programme basé sur",
                "credits2": "hqx.js",
                "credits3": "Licence ici",
                "credits4": "Lisez le",
                "credits5": "README.txt",
                "credits6": "pour plus d'informations sur la compatibilité et autres. Programme créé par Eliastik. Découvrez",
                "credits7": "Data URI Encoder",
                "credits8": ", un autre de mes programmes permettant de convertir des images et des textes sous la forme d'une URI encodée en Base64 directement sur votre navigateur web préféré.",
                "debugModeEnabled": "Mode de débogage activé.",
                "infosPNG": "L'image est sauvegardable sous le type PNG, en cliquant droit dessus et en cliquant ensuite sur « Enregistrer l'image sous… »",
                "easterEggFound": "Bravo, vous avez trouvé un easter egg !!",
                "processing": {
                    "processingTime": "Durée du traitement :",
                    "tooHigh": "Le coefficient d'agrandissement est trop élevé et risque de ralentir votre navigateur web. Continuer ?",
                    "coeffInvalid": "Le coefficient d'agrandissement est incorrect car il est soit inférieur à 0, soit il s'agit d'un nombre à virgule, soit il contient des lettres ou soit il est vide. Veuillez réessayer.",
                    "emptyPath": "Vous n'avez entré aucun chemin d'image. Veuillez réessayer.",
                    "errorAlgo": "Erreur lors du choix de l'algorithme. Veuillez réessayer.",
                    "newTab": "Ouvrir l'image dans un nouvel onglet",
                    "error": "Il semble qu'une erreur soit survenue lors de l'agrandissement de l'image. Peut-être que votre navigateur n'est pas compatible ou qu'il ait désactivé le chargement de l'image par mesure de sécurité. Veuillez réessayer sur un autre navigateur.<br /><br />Il est également possible que l'image soit introuvable (si elle n'est pas affichée dans « Original »). Dans ce cas, assurez-vous que le chemin de l'image soit correct.",
                    "unknownFormat": "Format de fichier incorrect. Les formats de fichiers supportés sont les suivants :",
                    "noImgSelected": "Vous n'avez sélectionné aucune image. Veuillez réessayer."
                },
                "confirmReset": {
                    "title": "Confirmation",
                    "descr": "Êtes-vous sûr de vouloir réinitialiser Javascript hqx et d'effacer l'image originale et le résultat ?"
                },
                "debugMode": {
                    "infosTitle": "Informations de débogage sur l'erreur Javascript n°",
                    "errorCode": "Code de l'erreur :",
                    "script": "Script :",
                    "line": "Ligne :",
                    "column": "Colonne :",
                    "stacktrace": "Trace de la pile :",
                    "title": "Erreur Javascript détectée (n° de l'erreur :",
                    "moreInfo": "Pour plus d'informations sur l'erreur,",
                    "clickHere": "cliquez ici",
                    "console": "ou jetez un coup d'œil à la console Javascript.",
                    "close": "Fermer",
                    "primaryTitle": "Erreurs Javascript :"
                }
            }
        }
    },
    fallbackLng: ['en', 'fr'],
    load: 'languageOnly',
    detection: {
        order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage'],
    },
}, function(err, t) {
    $(document).ready(function(){
        translateContent();
    });
});

function listTranslations(languages) {
    $("#languageSelect").text("");
    $.each(languages, function(index, value) {
        $("#languageSelect").append('<option data-i18n="lang.'+ value +'" value="'+ value +'"></option>');
    });
    $("#languageSelect").val(i18next.language.substr(0, 2));
}

function translateContent() {
    jqueryI18next.init(i18next, $, {
        handleName: 'localize',
        selectorAttr: 'data-i18n'
    });
    listTranslations(i18next.languages);
    $("body").localize();
}

function changeLng(lng) {
    i18next.changeLanguage(lng);
    $("#languageChanged").html('<span class="icon icon-infos"></span> ' + i18next.t('lang.changed'));
}

i18next.on('languageChanged', function() {
    translateContent();
});
