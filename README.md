# App

GymPass style app.

## RFs (Requisitos funcionais)

- [X] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possivel o usuario obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias próximas;
- [ ] Deve ser possivel o usuário buscar academias pelo nome;
- [x] Deve ser possivel o usuário realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [x] Deve ser possivel  cadastrar uma academia;

## RGn (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos apos criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página 
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)
