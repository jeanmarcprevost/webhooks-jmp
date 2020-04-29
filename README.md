# webhooks-jmp

[Doc Facebook](https://developers.facebook.com/docs/graph-api/webhooks/getting-started#create-endpoint)  
[Exemple de  code de webhook](https://github.com/fbsamples/graph-api-webhooks-samples/blob/master/heroku/index.js])

[Url serveur de test sur heroku](https://webhook-jmp.herokuapp.com/v2/webhooks)

## Configuration de l'application facebook

#### Ajouter un produit de type webhook

- Saisir l'URL de rappel : ```https://webhook-jmp.herokuapp.com/v2/webhooks```
- Entrer une pathphrase token : ```verifTokenForFacebookWebhooks```
- Souscrire aux événements souhaités  
  Pour notre cas, nous devons souscrire à ```feed```, nous serons donc informé à chaque nouveau post, suppression de post, ajout de photo, like, dislike, ...
  Feed ne fonctionne que pour des pages de moins de 10K fans

#### Ajouter la permission Contrôle app > Mes autorisations et fonctionnalités : 
```manage_pages```


## Route de vérification pour pouvoir configurer l'application

- Lors de l'appel ci-dessous :
```
GET https://www.your-clever-domain-name.com/webhooks?
  hub.mode=subscribe&
  hub.challenge=1158201444&
  hub.verify_token=meatyhamhock
```
- La route doit renvoyer le hub.challenge
```
1158201444
```

- Il faut vérifier que le hub.verify_token correspond au token configuré dans l'application 
... Mettre le token en variable d'environnement


## Création de la route callback d'api

- Requete POST
- Pour valider l'origine, checksum SHA1  
   - SHA1 du payload en utilisant l'App secret (variable d'environnement) 
   - Tout ce qu'il y a après "sha1=" du Header : ```X-Hub-Signature```
- Utilisation de la librairie : ```express-x-hub```
- Renvoyer un simple ```200 OK HTTPS```

Les infos à traiter sont dans ````changes````, un tableau regroupant plusieurs modifications (jusqu'à 1000)

## Particularité : Webhook pour les pages
[Docs Facebook Webhook Page](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-pages)

#### Installation de l'application sur la page
https://developers.facebook.com/tools/explorer
- Générer un token utilisateur, avec l'application voulue, avec les droits : ```manage_pages``` et choisir la page voulue (le user doit être administrateur de cette page)
- Cela va créér une nouvelle entrée dans la liste déroulante ```utilisateur ou Page```, le sélectionner et effectuer un appel sur le endpoint : ```157877130899047/subscribed_apps```
157877130899047 est l'id de la page (on le trouve sur la page en question, dans *À propos* en dessous de la section En savoir plus)
