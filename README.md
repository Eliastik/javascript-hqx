<!-- Javascript HQX README file -->
<img src="https://raw.githubusercontent.com/Eliastik/javascript-hqx/master/favicon.ico" width="306" alt="Javascript hqx" />
<img src="https://raw.githubusercontent.com/Eliastik/javascript-hqx/master/screenshot.png" width="640" alt="Screenshot" />

## A propos du programme/About the program

* Online version/version en ligne : [http://eliastiksofts.com/javascript-hqx/demo/](http://eliastiksofts.com/javascript-hqx/demo/)
* Available in english and in french
* Disponible en anglais et en français
* Basé sur la librairie [hqx.js](https://github.com/phoboslab/js-hqx).
* Programme créé par Eliastik (www.eliastiksofts.com)
* VERSION DU PROGRAMME : 1.2 (date de version : 9/10/2017)
* LICENCE : GNU GPLv3 (voir LICENCE.txt et gpl-3.0.txt)

This program allow you to upscale images directly on your web browser, with better quality, with the help of the HQX algorithm.
Ce programme vous permet d'agrandir des images directement sur votre navigateur internet, avec une meilleure qualité, grâce à l'algorithme HQX.

Avant de l'utiliser, dézippez l'archive.

Lancez le fichier « index.html » pour lancer le programme. Complétez ensuite l'un des formulaires pour pouvoir agrandir l'image.

Cette application ne fonctionne que sur les navigateurs récents. Si votre navigateur est incompatible, un message d'erreur s'affichera et l'application ne fonctionnera pas. Mettez à jour de préférence votre navigateur avant utilisation.

Il a été testé et fonctionne sur :
* Chrome/Chromium/Opera basé sur Chromium dernières versions (erreur de sécurité parfois) ;
* Internet Explorer 11 (fonctionne partiellement avec la version 9 et totalement à partir de la version 10) ;
* Opera 12.17 ;
* Firefox 34.0.5 et Firefox 45.0.2.

Les versions supérieures sont logiquement compatibles.

Ne supprimez/modifiez aucun autres fichiers sous peine de dysfonctionnement du programme. Vous pouvez modifier le programme pour y ajouter des fonctionnalités si vous savez le faire.

/!\ Pour des raisons de sécurité, certains navigateurs web bloquent l'exécution de l'application si l'application et l'image ne sont pas de la même origine. Pour éviter cela, il ne faut pas mettre par exemple l'application sur une clé USB et il ne faut pas que l'image soit sur le disque dur de l'ordinateur dans ce cas.

Ce problème ne se pose pas si l'on choisit l'image via la première option (Image sur l'ordinateur).

Mettez de préférence l'application et l'image dans le même répertoire si cela ne fonctionne pas. /!\

/!\ Seules les extensions suivantes sont autorisées pour les images : jpe, jpg, jpeg, jif, jfif, jfi, png, gif, ico, mpo, tif, tiff, bmp, dib, svg, svgz, raw, pict, pct. La compatibilité des extensions autorisées dépend de votre navigateur web.

/!\ Faites attention de ne pas choisir une image trop lourde, car le programme va planter (dans le meilleur des cas) voire faire planter votre navigateur web (dans le pire des cas)

L'interface graphique a été conçue par moi-même, en utilisant quelques éléments piochés sur le web, dont Icomoon-Free, un thème d'icônes, ainsi que Magnific-Popup pour les fenêtres. La police de caractère utilisée est l'Open Sans.

Découvrez également Data URI Encoder (à cette adresse : http://www.eliastiksofts.com/data-uri-encoder ), un autre de mes programmes permettant de convertir des images et des textes sous la forme d'une URI encodée en Base64 directement sur votre navigateur web préféré.

Découvrez également mes autres programmes ici : http://www.eliastiksofts.com

## Journal des changements

* Changements de la version 1.2 (9/10/2017) :
    
    - Traduction de l'application en anglais ;
    - Divers petits changements et corrections de bugs :
        - Module de mises à jour amélioré (meilleure détection des mises à jour, corrections de bugs) ;
        - Corrections du design ;
        - Icône corrigée (bordures propres) ;
        - Fichiers rangés correctement (dans le dossier assets) ;
        - Mise à jour de certaines bibliothèques logicielles (Jquery notamment) ;
        - Petites corrections du code et autres ajustements mineurs.

* Changements de la version 1.1.4 (4/02/2017) :

    - Ajout d'un écran de chargement lors du traitement des images ;
    - Possibilité de réinitialiser Javascript hqx (cela efface les images traitées) ;
    - Ajout d'un mode de débogage (désactivé par défaut, activable en modifiant le fichier « scripts.js ») - cela réactive la détection des erreurs Javascript (introduit dans la version 1.1) ;
    - L'algorithme « Plus proche voisin » a été renommé en « Pixel Perfect » ;
    - Petites corrections (bugs, textes, ajustements du code).

* Changements de la version 1.1.3 (15/08/2016) :

    - Amélioration de la mise en page pour les mobiles ;
    - Amélioration de l'interface ;
    - Corrections du code et corrections de bugs.

* Changements de la version 1.1.2 :

    - Ajout d'un module de mises à jour ;
    - Mise à jour des liens ;
    - Ajout d'une licence pour l'application (GNU GPL 3.0).

* Changements de la version 1.1.1 :

    - Optimisation du chargement des images ;
    - Ajout de l'algorithme « Plus proche voisin » ;
    - Support de plus d'extensions d'images (ajout du support des extensions suivantes : jpe, jif, jfif, jfi, tif, dib, svgz, raw, pict, pct) - la compatibilité dépend de votre navigateur web ;
    - Petits ajustements.

* Changements de la version 1.1 :

    - Ajout d'une détection des erreurs Javascript ;
    - Optimisations de la mise en page ;
    - Formatage du code source pour être plus lisible ;
    - Ajout des polices de caractère « Open Sans » directement dans l'archive (au lieu d'avoir à les télécharger sur les serveurs de Google) ;
    - Ajout d'un lien vers un autre de mes programmes.

* Changements de la version 1.0 :

    - Vous pouvez désormais choisir une image directement sur l'ordinateur plus simplement, via une boîte de dialogue ;
    - Limitation des formats de fichier pour éviter les bugs ou les plantages ;
    - Un message d'erreur s'affiche désormais si Javascript hqx est incompatible ;
    - Modification du texte d'introduction + du texte du README (ci-dessous).

* Changements de la version 0.4 :

    - Petits changements du design : barre de titre de l'application changé, mise en place d'un fond de page ;
    - Calcul du temps de traitement de l'image ;
    - Changement de la couleur du bouton pour qu'il se détache de la couleur du fond.

* Changements de la version 0.3 :

    - Mise en page du formulaire améliorée ;
    - Ajout d'une flèche à droite du titre « Original » ;
    - Petite mise à jour pour l'affichage du message d'erreur lors de l'upscaling de l'image ;
    - Ajout d'une icône.

* Changements de la version 0.2 :

    - Nouveau style des formulaires, des notifications et de la zone de résultat, plus clairs ;
    - Vous pouvez directement sauvegarder le résultat avec un clic droit ;
    - Ajout d'un message d'erreur si vous n'avez pas activé Javascript ;
    - Ajout d'un message d'erreur si le navigateur n'est pas compatible ou n'a pas effectué l'upscaling.
    
* Version 0.1 : version initiale (jamais publiée sur Internet)
