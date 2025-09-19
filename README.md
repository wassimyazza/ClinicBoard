Cabinet de Santé - Application Web Monopage (SPA)
Description

Cabinet de Santé est une application web monopage (SPA) conçue pour simplifier la gestion des patients, des rendez-vous et des finances dans un cabinet médical. Elle remplace l’utilisation d’Excel, offrant une interface fluide, sécurisée et locale. Toutes les données sont stockées en LocalStorage, garantissant une persistance hors ligne et un accès protégé par mot de passe hashé.

Fonctionnalités

Sécurisation de l'accès : Mot de passe hashé, gestion des tentatives échouées et verrouillage temporaire.

Gestion des patients : Ajout, modification, suppression et recherche des informations des patients.

Gestion des rendez-vous : Création, modification, annulation et filtrage des rendez-vous.

Suivi financier : Enregistrement des recettes et des dépenses, suivi du budget.

Tableau de bord : KPIs pour suivre la santé financière et opérationnelle du cabinet.

Technologies

Frontend : JavaScript natif, HTML, CSS

Stockage : LocalStorage

Sécurité : Hachage des mots de passe (bcrypt.js)

Architecture : SPA (Single Page Application)

Installation
Prérequis

Un navigateur moderne (Chrome, Firefox, etc.)

Pas d'installation serveur requise (application 100% locale)

Étapes

Clonez le dépôt :

git clone https://github.com/votre-utilisateur/cabinet-sante.git


Ouvrez le fichier index.html dans votre navigateur pour lancer l'application.

Configuration

Lors de la première utilisation, vous serez invité à définir un mot de passe. Ce mot de passe sera utilisé pour l'authentification future. Si vous oubliez votre mot de passe, il suffit de réinitialiser les données du navigateur.

Fonctionnalités détaillées
Authentification

Lors du premier lancement, créez un mot de passe. Il est stocké sous forme de hash dans le LocalStorage.

En cas de tentative de connexion échouée à plusieurs reprises, l'accès sera temporairement verrouillé.

Bonus : Le JSON des données peut être chiffré pour plus de sécurité.

Gestion des patients

CRUD (Créer, Lire, Mettre à jour, Supprimer) pour gérer les patients.

Recherche rapide par nom ou numéro de téléphone.

Suivi des rendez-vous passés pour chaque patient.

Gestion des rendez-vous

Planification des rendez-vous avec options de modification et d'annulation.

Filtrage par praticien et statut des rendez-vous.

Vue Agenda simplifiée par jour.

Gestion des finances

Recettes : Enregistrement des paiements reçus.

Dépenses : Suivi des dépenses par catégorie.

Vue des objectifs financiers mensuels comparés aux résultats réalisés.

Tableau de bord

Affiche les KPIs : chiffre d’affaires, dépenses, marge, nombre de patients et consultations.

Navigation rapide vers les différents modules (patients, rendez-vous, finances).

Structure du projet
/index.html           # Point d'entrée de l'application
/assets/              # Fichiers CSS et images
/components/          # Composants réutilisables (ex: formulaire, tableau)
/router/              # Gestion des routes SPA
/security/            # Logique d'authentification et de sécurité
/storage/             # Gestion du LocalStorage
/styles/              # Fichiers CSS pour le design

Bonnes pratiques

Sécurité : Le mot de passe est haché pour éviter de stocker des données sensibles en clair.

Modularité : Le code est divisé en modules pour une meilleure lisibilité et maintenance.

Respect des bonnes pratiques DOM : Utilisation de createElement, innerHTML et gestion manuelle des événements.

Contribution

Fork le projet.

Créez une nouvelle branche pour vos modifications.

Soumettez une Pull Request.

Auteurs

Développé par Votre Nom.

License

Ce projet est sous MIT License. Voir le fichier LICENSE pour plus de détails.