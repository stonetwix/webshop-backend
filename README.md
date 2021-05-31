# webshop-backend

# FashionStore 


## Bygg och kör projektet

I server-projektet kör du:

### `npm i`
### `npm start`

I client-projektet kör du:

### `npm i`
### `npm start`

Kör appen i utvecklingsläge.\
Öppna [http://localhost:3000](http://localhost:3000) för att se den i din browser.


## Skapat av
[Malin Österberg](https://github.com/msmalinosterberg)\
[Amanda Samuelsson](https://github.com/amandasamuelsson)\
[Moa Stenqvist](https://github.com/stonetwix)

## Länkar
[GitHub-repot](https://github.com/stonetwix/webshop-backend)
[Ant Design] (https://ant.design/)


## Kravspecifikation på projektet: 

# G-krav 
• Alla sidor skall vara responsiva. (G)
• Arbetet ska implementeras med en React frontend och en Express backend. (G)
• Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)
• Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G) 
• All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G) 
• Man ska kunna logga in som administratör i systemet (G)
• Inga Lösenord får sparas i klartext i databasen (G) 
• En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) 
• Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) 
• Administratörer ska kunna se en lista på alla gjorda beställningar (G)
• Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
• Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G) 
• Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G) 
• En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G) 
• Besökare ska kunna välja ett av flera fraktalternativ (G) 
• Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G) 
• Tillgängliga fraktalternativ ska vara hämtade från databasen (G) 

# VG -krav 
• Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG) 
• En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG) 
• Administratörer ska kunna markera beställningar som skickade (VG) 
• När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG) 
• Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG) 
• Administratörer ska kunna lägga till och ta bort produkter (VG) 
• Backendapplikationen måste ha en fungerande global felhantering (VG)

