# medical-appointment-scheduling-system
API for managing medical appointments

---

# **Requisitos**

## **Requisitos funcional**

### **Cadastrar usuário**
- [ ] Deve ser possível o usuário realizar um cadastro.
  - [ ] O usuário não precisa estar autenticado no sistema para se cadastrar.
  - [ ] Não deve ser possível realizar o cadastro de um usuário sem username e senha.
  - [ ] Não deve ser possível realizar um cadastro de username já existente.
  - [ ] O atributo isAdmin por padrão dever ser false.
  - [ ] Não deve ser possível o usuário cadastrar a permissão de administrador.

---

### **Cadastrar especialidade**
- [ ] Deve ser possível o usuário cadastrar uma especialidade.
  - [ ] O usuário deve estar autenticado para cadastrar uma especialidade.
  - [ ] Não deve ser possível cadastrar uma especialidade com o nome já existente.
  - [ ] Não deve ser possível cadastrar uma especialidade com o campo nome vazio.
  - [ ] O usuário precisa ter permissão de administrador.
  - [ ] Deve ser possível cadastrar uma especialidade sem passar a descrição da mesma.

---

### **Cadastrar médico**
- [ ] Deve ser possível cadastrar um médico.
  - [ ] O médico deve possuir um CRM com 6 dígitos.
  - [ ] O médico deve estar atrelado a um usuário.
  - [ ] O médico deve ter uma e somente uma especialidade.
  - [ ] Não deve ser possível cadastrar um médico sem CRM.
  - [ ] Não deve ser possível cadastrar um médico com um CRM já existente. 
  
---

### **Cadastrar informações do médico**
- [ ] Deve ser possível cadastrar as informações do médico.
  - [ ] O médico deve estar cadastrado.
  - [ ] O médico deve estar autenticado na aplicação.
  - [ ] Não deve ser possível ter mais de um registro de informação por médico.
  - [ ] O horário de termino não deve ser menor que o de início do atendimento.
  - [ ] A duração da consulta não pode ser menor ou igual a zero.

---

### **Cadastrar agendamento**
- [ ] Deve ser possível cadastrar o agendamento.
  - [ ] O paciente precisa estar cadastrado no sistema.
  - [ ] O paciente deve estar autenticado na aplicação.
  - [ ] O médico selecionado deve estar cadastrado no sistema.
  - [ ] O médico escolhido deve ter disponibilidade para o horário selecionado.
    - [ ] O médico deve ter disponibilidade para o dia da semana escolhido.
    - [ ] O horário escolhido deve estar entre o horário de atendimento do médico.
    - [ ] O horário escolhido não deve estar preenchido por nenhum outro atendimento.
    - [ ] Não deve ser possível cadastrar um agendamento se já existir outro agendamento para o médico na mesma data e horário.
    - [ ] O paciente não deve ter algum agendamento cadastrado para o mesmo dia e horário escolhido.

---