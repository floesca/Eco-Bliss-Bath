<div align="center">

# Eco-Bliss-Bath
Projet 10 du parcours testeur logiciel d'OpenClassrooms
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

## Description du projet

Ce projet a pour objectif de mettre en place des tests automatisés end-to-end (E2E) avec Cypress afin de vérifier le bon fonctionnement d’une application web.

Les tests réalisés permettent de simuler des parcours utilisateurs, de contrôler les comportements de l’application et de détecter d’éventuelles régressions.

## Prérequis

Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

## Installation et démarrage

Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec sa base de données
```
docker compose up -d
```

## Pour démarrer le frontend de l'applicatif

Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```

## Pour installer et lancer Cypress

````
npm install cypress --save-dev
```
Puis
```
npx cypress open
````

## Tests réalisés

- API
- Faille XSS
- Tests fonctionnels sur la connexion et le panier
- Smoke tests

## Organisation du projet

├── cypress 
│ ├── e2e         # Scénarios de tests 
│ ├── fixtures    # Données utilisées dans les tests 
│ └── support     # Commandes et configurations Cypress 
│ 
├── cypress.config.js 
├── package.json 
└── README.md