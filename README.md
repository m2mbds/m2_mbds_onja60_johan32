# PROJET Angular sur l'Assignment

RAKOTOVAO Mihary Johan Christian n° 32
TSIORINANAHARY Onjampandresena n° 60

# Fonctionnalités existantes :
- Si pas d'utilisateur connecté :
  - Accès à un menu "Les profs" : pour voir les listes des profs existants et les matières qu'il enseigne
- Authentification
- Si l'utilisateur est un enseignant (admin), après connexion :
  - Possibilité de voir les devoirs qui concernent ses matières, avec 2 colonnes "Devoir à rendre" et "Devoir déjà rendu" qui est un drag and drop
  - Voir détail du devoir
  - Modifier le devoir
  - Supprimer le devoir
  - Modifier le statut d'un assignment (rendu ou pas)

- Si l'utilisateur est un étudiant (n'est pas admin), après connexion :
  - Possibilité de voir une liste de ses devoirs avec leur statut
  - Voir détail du devoir
  - Créer un devoir (assignment)

- Nous avons mis en place un système d'upload fichier dans Google drive et pour la documentation à ce propos, on a suivi ce lien https://webninjadeveloper.com/nodejs/node-js-express-google-drive-api-example-to-upload-multiple-files-to-folder-using-service-account-in-javascript/

Notre site est bien hébergé dans render.com avec l'url :
  - Back end : https://m2-mbds-onja60-johan32-backend-qtb0.onrender.com/api/
  - Front end : https://m2-mbds-onja60-johan32-front-end.onrender.com/ 
# Autres :
  - Vous trouverez dans le fichier "BackAssignment.postman_collection.json" les listes des collections API que nous avons testé
  - Et aussi un fichier "view.txt" qui contient le script de création d'un view
  - Page not found : si l'url données n'existe pas
  - On a utilisé un Formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments
    Onglet 1 : Etape 1
      Matière*
      Deadline*
    
    Onglet 2 : Etape 2
      Titre*
      Description
      Pièce(s) jointe(s) (PJ)

  - Nous avons utilisé : Material Card, SnackBar Material, ... pour rendre notre site plus jolie et attractive
  - Utilisation de Shift + Alt + F pour ranger les codes

# Pour installer et faire tourner le projet du code source dans votre poste, il suffit de :
- Cloner le projet :
  - Back-end : https://github.com/m2mbds/m2_mbds_onja60_johan32 branche "back_end"
  - Front-end : https://github.com/m2mbds/m2_mbds_onja60_johan32 branche "front_end"
  - Dans le branch main se trouve le fichier README.md

- Une fois terminer, lancer "npm install" dans les racines de chaque projet
- Puis, pour les lancer, dans back_end : npm run start
- Dans front_end : ng serve

# Si vous voulez tester le site déjà déployé dans le render.com, suivez le lien : https://m2-mbds-onja60-johan32-front-end.onrender.com/

# Pour le test :
  - Si Enseignant (admin) : (Email / Mdp)
    - tjohan@gmail.com / 1234
    - tonja@gmail.com / 1234

  - Si Etudiant (n'est pas admin) : (Email / Mdp)
    - sjohan@gmail.com / 1234
    - sonja@gmail.com / 1234

=================================================
# Autres :
# => Conception base de données
- User 
 id
 firstname
 lastname
 picture
 email
 password
 isAdmin (1, 0)
 role (teacher, student)

- Subject
 id
 designation
 picture

- TeacherSubject
 idUser
 idSubject

- Assignment
 id
 title
 description
 PJ
 idSubject
 idAuthor
 note
 remark
 isRender (1, 0)
 limitDate
 createdAt
 renderedAt

# => Données de test :

User(1, 'Teach', 'Johan', 'tjohan.png', 'tjohan@gmail.com', '1234', 1, 'teacher')
User(2, 'Teach', 'Onja', 'tonja.png', 'tonja@gmail.com', '1234', 1, 'teacher')
User(3, 'Student', 'Johan', 'sjohan.png', 'sjohan@gmail.com', '1234', 0, 'student')
User(4, 'Student', 'Onja', 'sonja.png', 'sonja@gmail.com', '1234', 0, 'student')

Subject(1, 'Angular', 'sub1.png')
Subject(2, 'Big Data', 'sub2.png')
Subject(3, 'Grails', 'sub3.png')
Subject(4, 'Jakarta', 'sub4.png')

TeacherSubject(1, 1)
TeacherSubject(1, 2)
TeacherSubject(1, 3)
TeacherSubject(2, 4)

# => Fonctions :
 - Login
  1) login(email, pwd)
 - Role teacher (isAdmin)
  - List assignment concerné
    2) getAssignmentByUser(idUser(user connecté))*
  - EDIT attributs assignment concerné
    - Noté assignment concerné
    - Rendu assignment concerné
        3) editAssignment()
          - note
          - remark
          - isRender
          - limitDate
  - DELETE assignment concerné
    4) deleteAssignment()
  - Details assignment concerné
    5) getAssignmentById(idAssignment)*

 - Role student (!isAdmin)
  - Create son assignment
    6) createAssignment()
  - List de son assignment
    2) getAssignmentByUser(idUser(user connecté))*
  - Details de son assignment
    5) getAssignmentById(idAssignment)*
 - Logout
    7) logout()
    
# Merci

