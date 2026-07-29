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
git clone https://github.com/floesca/Eco-Bliss-Bath.git
cd Eco-Bliss-Bath-V2
npm install
```
L'application fonctionne avec Docker.

Ouvrir Docker Desktop.

Démarrer les conteneurs.

Le front-end de l'application est ensuite accesible à l'adresse :
```
http://localhost:8080
```

## Pour installer et lancer Cypress

```
npm install cypress --save-dev
```
Puis pour ouvrir Cypress en mode interactif :
```
npx cypress open
```
Puis sélectionner E2E Testting et le navigateur souhaité.

Pour lancer tous les tests automatiquement en ligne de commande :
```
npx cypress run
```

## Tests réalisés

- API
- Faille XSS
- Tests fonctionnels sur la connexion et le panier
- Smoke tests

## Organisation du projet

├── cypress\
│   ├── e2e\
│   ├── fixtures\
│   └── support\
├── cypress.config.js\
├── package.json\
└── README.md

## Auteur

Florence ESCANYE