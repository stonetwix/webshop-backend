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

I gränssnittet kan du sedan logga in med några av de fördefinierade användarna, enligt följande (eller registrera en egen):

email: test@email.com \
lösenord: 123 \
(admin) 

email: test2@email.com \
lösenord: 123 \
(customer)


## Skapat av
[Malin Österberg](https://github.com/msmalinosterberg)\
[Amanda Samuelsson](https://github.com/amandasamuelsson)\
[Moa Stenqvist](https://github.com/stonetwix)

## Länkar
[GitHub-repot](https://github.com/stonetwix/webshop-backend)\
[Ant Design](https://ant.design/)


## Kravspecifikation på projektet: 
Alla krav är uppfyllda.

# G-krav 
- Alla sidor skall vara responsiva. (G)
  - Alla sidor är responsiva. Ladda om sidan i valda formatet.
- Arbetet ska implementeras med en React frontend och en Express backend. (G)
  - Create React App och Express har använts.
- Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
  - Se bifogade filer i inlämningen. 
- Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G) 
  - Presenterat vid idégodkännandet.
- All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G) 
  - MongoDB Atlas clouddatabas har använts för alla resurser. 
- Man ska kunna logga in som administratör i systemet (G)
  - Logga in med förinställd admin-användare (se ovan). 
- Inga Lösenord får sparas i klartext i databasen (G) 
  - Bcrypt används för att kryptera alla lösenord.
- En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) 
  - När en order är lagd uppdateras produktens inventory baserat på quantityn.
- Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) 
  - Detta görs under "Products" i admin-gränssnittet, klicka på produktens edit-knapp. 
- Administratörer ska kunna se en lista på alla gjorda beställningar (G)
  - Se alla ordrar i en tabell under "Orders" i admin-gränssnittet.
- Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
  - Ange produktens kategorier (en eller flera) när du lägger till eller uppdaterar en produkt.
- Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
  - Se alla produkter på startsidan och filtrera dem på valda kategorier via select-fältet. 
- Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G) 
  - Carten sparas i local storage.
- En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G) 
  - Du hänvisas till att logga in i utcheckningsflödet om du inte redan loggat in.
- Besökare ska kunna välja ett av flera fraktalternativ (G) 
  - Välj mellan tre olika fraktalternativ med olika leveranstider och priser. 
- Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G) 
  - Alla fält har validering.
- Tillgängliga fraktalternativ ska vara hämtade från databasen (G) 
  - Fraktalternativen är sparade och hämtas från databasen.

# VG -krav 
- Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG) 
  - Gör en request om att få bli admin via registrerings-formuläret under Log in. Nya användare sparas i databasen.
- En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG) 
  - En verifierad admin måste godkänna admin requests under "Admin Requests" i admin-gränssnittet.
- Administratörer ska kunna markera beställningar som skickade (VG) 
  - I orderlistan kan en admin klicka på "Mark as sent".
- När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
  - Customers kan logga in och se sina ordrar på en egen profilsida, listan visar om ordern är skickad eller inte.  
- Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG) 
  - Redigera produkternas kategorier under edit på adminsidan.
- Administratörer ska kunna lägga till och ta bort produkter (VG) 
  - Lägg till/ta bort produkter under "Products" i admin-gränssnittet. 
- Backendapplikationen måste ha en fungerande global felhantering (VG)
  - Servern har error-handlers för 500- och 404-koder.

