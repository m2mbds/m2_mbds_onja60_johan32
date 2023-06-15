# m2_mbds_onja60_johan32
Fonctionnalités existants :
- Authentification JWT
- *** Fichier du variable d'environnement https://www.itsolutionstuff.com/post/how-to-use-environment-variable-in-angularexample.html
- Page not found (default page (default route) si l'url donné n'existe pas)
- Utilisation de Shift + Alt + F pour ranger les codes
=====================================================================================================================================
Conception base de données
- User 
 id
 firstname
 lastname
 picture
 email
 password
 isAdmin (1, 0)
 role (teacher, student)

User(1, 'Teach', 'Johan', 'tjohan.png', 'tjohan@gmail.com', '1234', 1, 'teacher')
User(2, 'Teach', 'Onja', 'tonja.png', 'tonja@gmail.com', '1234', 1, 'teacher')

User(3, 'Student', 'Johan', 'sjohan.png', 'sjohan@gmail.com', '1234', 0, 'student')
User(4, 'Student', 'Onja', 'sonja.png', 'sonja@gmail.com', '1234', 0, 'student')

- Subject
 id
 designation
 picture

Subject(1, 'Angular', 'sub1.png')
Subject(2, 'Big Data', 'sub2.png')
Subject(3, 'Grails', 'sub3.png')
Subject(4, 'Jakarta', 'sub4.png')

- TeacherSubject
 idUser
 idSubject

TeacherSubject(1, 1)
TeacherSubject(1, 2)
TeacherSubject(1, 3)
TeacherSubject(2, 4)

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

 Onglet 1 : Etape 1
  Matière* (idSubject)
  Deadline* (limitDate)
 
 Onglet 2 : Etape 2
  Titre* (title)
  Description (description)
  Pièce(s) jointe(s) (PJ)

=====================================================================================================================================
Fonctionnalités :
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
 
=====================================================================================================================================
